#!/usr/bin/env node
/**
 * XELIME Preset Backend (local development)
 *
 * Serves the panel and speaks the control-message protocol the panel already parses.
 *
 * Protocol messages used (exact strings the panel accepts):
 *   STATUS step=N line=XXXX note=...
 *   NEED step=N item=...
 *   STOP step=N digit=1|3|4 reason=...
 *   COMPLETE line=555...
 *   ERROR ...
 *
 * Content is sent as { kind: 'output', step, text }.
 *
 * Run: node server.js
 * Then open http://localhost:8787/
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 8787;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';
const ROOT = __dirname;

const runs = new Map();

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendEvent(res, event) {
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

function serveStatic(req, res) {
  let file = req.url === '/' ? '/preset-panel.html' : req.url.split('?')[0];
  const safe = path.normalize(file).replace(/^(\.\.[/\\])+/, '');
  const full = path.join(ROOT, safe);
  if (!full.startsWith(ROOT)) {
    res.writeHead(403);
    res.end();
    return;
  }
  fs.readFile(full, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(full);
    const types = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.md': 'text/markdown',
      '.css': 'text/css'
    };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

async function callOllama(prompt, system) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: prompt }
        ],
        stream: false
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`Ollama HTTP ${res.status}`);
    const data = await res.json();
    return data.message?.content || '';
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

function mockText(preset, step, reason) {
  const lines = [
    'MOCK OUTPUT — NOT AI-GENERATED',
    `Preset: ${preset.number} ${preset.name} · step ${step}`,
    `Reason: ${reason}`,
    'Replace this backend with a real model call before using any output.',
    'MOCK OUTPUT — NOT AI-GENERATED'
  ];
  return lines.join('\n');
}

async function generate(preferLocal, prompt, system, preset, step) {
  if (preferLocal) {
    try {
      const text = await callOllama(prompt, system);
      return { text, model: `ollama:${OLLAMA_MODEL}`, mock: false };
    } catch (e) {
      console.warn('Ollama unreachable:', e.message);
      return { text: mockText(preset, step, e.message), model: 'mock', mock: true };
    }
  }
  return { text: mockText(preset, step, 'preferLocal=false'), model: 'mock', mock: true };
}

function buildSystem(preset, input) {
  const tuning = input.tuning || {};
  const tuningText = Object.entries(tuning)
    .map(([area, value]) => `${area}: ${value}`)
    .join('\n');

  return [
    'You are assisting with career materials.',
    'Instruction (not guaranteed): use only facts present in the supplied profile and job posting. Do not invent credentials, numbers, titles, or experience.',
    'Persona is a writing style setting only.',
    '',
    `Preset ${preset.number}: ${preset.name} (level ${preset.level}, ${preset.steps} step(s))`,
    tuningText ? `Active tuning:\n${tuningText}` : 'No tuning active.',
    '',
    'Reply with the useful content for this step. Do not emit STATUS/NEED/STOP/COMPLETE lines yourself; the orchestrator owns those.'
  ].join('\n');
}

function handleStart(body, res) {
  const { preset, input = {}, messages = [], preferLocal = true } = body;
  if (!preset || typeof preset.number !== 'number') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    cors(res);
    res.end(JSON.stringify({ error: 'Missing preset' }));
    return;
  }

  const runId = randomUUID();
  const steps = preset.steps || 0;
  const run = {
    id: runId,
    preset,
    input,
    statusLine: '0'.repeat(steps),
    outputs: {},
    preferLocal,
    currentStep: 0
  };
  runs.set(runId, run);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  cors(res);

  sendEvent(res, { runId });

  if (steps === 0) {
    // Level 1 Solo — single shot, no numbered steps
    const system = buildSystem(preset, input);
    const prompt = [
      ...(messages || []),
      'Job posting:\n' + (input.job || ''),
      'Profile:\n' + (input.profile || ''),
      'Drafts:\n' + (input.drafts || '')
    ].join('\n\n');

    generate(preferLocal, prompt, system, preset, 1)
      .then(({ text, model, mock }) => {
        // Level 1: panel treats a single output event as completion
        // (see solo branch added to the panel event handler).
        sendEvent(res, { kind: 'output', text });
        res.end();
      })
      .catch(err => {
        sendEvent(res, { kind: 'control', message: `STOP step=1 digit=3 reason=${String(err.message).slice(0, 200)}` });
        res.end();
      });
    return;
  }

  runStep(run, 1, messages, res);
}

function runStep(run, step, extraMessages, res) {
  const { preset, input } = run;
  const system = buildSystem(preset, input);
  const prompt = [
    ...(extraMessages || []),
    `Step ${step} of ${preset.steps} for preset ${preset.number} (${preset.name}).`,
    'Job posting:\n' + (input.job || ''),
    'Profile:\n' + (input.profile || ''),
    'Drafts:\n' + (input.drafts || '')
  ].join('\n\n');

  generate(run.preferLocal, prompt, system, preset, step)
    .then(({ text, model, mock }) => {
      sendEvent(res, { kind: 'output', step, text });
      run.outputs[step] = text;

      const digits = run.statusLine.split('');
      digits[step - 1] = '5';
      run.statusLine = digits.join('');
      run.currentStep = step;

      const reviewStops = Array.isArray(preset.reviewStops) ? preset.reviewStops : [];
      const needsReview = reviewStops.includes(step);
      const note = mock ? 'MOCK — not AI-generated' : `Step ${step} (${model})`;

      if (needsReview) {
        sendEvent(res, {
          kind: 'control',
          message: `STOP step=${step} digit=4 reason=Review required before continuing`
        });
        sendEvent(res, {
          kind: 'control',
          message: `STATUS step=${step} line=${run.statusLine} note=${note}`
        });
        res.end();
        return;
      }

      if (step >= preset.steps) {
        const line = '5'.repeat(preset.steps);
        sendEvent(res, { kind: 'control', message: `COMPLETE line=${line}` });
        sendEvent(res, { kind: 'control', message: `STATUS step=${step} line=${line} note=${note}` });
        res.end();
      } else {
        sendEvent(res, {
          kind: 'control',
          message: `STATUS step=${step} line=${run.statusLine} note=${note}`
        });
        runStep(run, step + 1, [], res);
      }
    })
    .catch(err => {
      sendEvent(res, {
        kind: 'control',
        message: `STOP step=${step} digit=3 reason=${String(err.message).slice(0, 200)}`
      });
      res.end();
    });
}

function handleResume(body, res) {
  const { runId, messages = [] } = body;
  const run = runs.get(runId);
  if (!run) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    cors(res);
    res.end(JSON.stringify({ error: 'Run not found' }));
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  cors(res);

  const digits = run.statusLine.split('');
  let next = digits.findIndex(d => !['5', '6'].includes(d)) + 1;
  if (next < 1) next = digits.length || 1;

  runStep(run, next, messages, res);
}

const server = http.createServer((req, res) => {
  cors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET') {
    serveStatic(req, res);
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end();
    return;
  }

  let raw = '';
  req.on('data', c => { raw += c; });
  req.on('end', () => {
    let body;
    try { body = JSON.parse(raw || '{}'); }
    catch { res.writeHead(400); res.end(JSON.stringify({ error: 'Bad JSON' })); return; }

    if (req.url === '/api/preset/start') handleStart(body, res);
    else if (req.url === '/api/preset/resume') handleResume(body, res);
    else { res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' })); }
  });
});

server.listen(PORT, () => {
  console.log(`Preset backend + panel at http://localhost:${PORT}/`);
  console.log(`Ollama (optional): ${OLLAMA_URL} model=${OLLAMA_MODEL}`);
  console.log('Mock outputs are labeled "MOCK OUTPUT — NOT AI-GENERATED" on every block.');
});
