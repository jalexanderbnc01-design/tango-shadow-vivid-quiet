/**
 * XELIME Preset Adapter
 *
 * Implements window.PresetPanel.installAdapter.
 * The panel already parses these control messages:
 *   STATUS step=N line=XXXX note=...
 *   NEED step=N item=...
 *   STOP step=N digit=1|3|4 reason=...
 *   COMPLETE line=555...
 *
 * Transport endpoints (local development server):
 *   POST /api/preset/start
 *   POST /api/preset/resume
 *
 * When the panel is served from the same origin as the backend,
 * the default endpoint is empty (relative URLs).
 */

(function (global) {
  'use strict';

  function createXelimeAdapter(options = {}) {
    // Empty string = same origin (recommended when panel is served by server.js)
    const endpoint = (options.endpoint !== undefined ? options.endpoint : '').replace(/\/$/, '');
    const preferLocal = options.preferLocal !== false;
    let currentRunId = null;

    async function post(path, body) {
      const url = endpoint + path;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
      }
      return res;
    }

    async function consumeEvents(response, onEvent) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(':')) continue;
          let payload = trimmed.startsWith('data:') ? trimmed.slice(5).trim() : trimmed;
          if (!payload) continue;

          try {
            const event = JSON.parse(payload);
            if (event.runId) currentRunId = event.runId;
            if (event.kind === 'control' || event.kind === 'output') {
              onEvent(event);
            } else if (event.error) {
              throw new Error(event.error);
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }
    }

    return {
      capabilities: {
        soloResolved: true,
        level2Resolved: true,
        fullLoopConfigured: true
      },

      async start({ preset, messages, onEvent }) {
        const input = (global.PresetPanel && global.PresetPanel.getInput)
          ? global.PresetPanel.getInput()
          : {};
        currentRunId = null;

        const response = await post('/api/preset/start', {
          preset,
          input,
          messages,
          preferLocal
        });
        await consumeEvents(response, onEvent);
      },

      async resume({ messages, onEvent }) {
        if (!currentRunId) throw new Error('No active run');
        const response = await post('/api/preset/resume', {
          runId: currentRunId,
          messages,
          preferLocal
        });
        await consumeEvents(response, onEvent);
      }
    };
  }

  // Auto-install when panel is present
  if (global.PresetPanel && typeof global.PresetPanel.installAdapter === 'function') {
    try {
      global.PresetPanel.installAdapter(createXelimeAdapter());
      console.log('[adapter] installed (same-origin endpoints)');
    } catch (e) {
      console.warn('[adapter] install failed:', e.message);
    }
  }

  global.createXelimeAdapter = createXelimeAdapter;
})(typeof window !== 'undefined' ? window : globalThis);
