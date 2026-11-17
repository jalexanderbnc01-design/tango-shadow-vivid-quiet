# Preset Panel + local backend

## What this is

A local development setup that connects the Preset Panel to a small backend.

The panel file (`preset-panel.html`) already contains:
- the control-message parser (`STATUS`, `NEED`, `STOP`, `COMPLETE`)
- `window.PresetPanel.installAdapter` and `getInput`

The backend (`server.js`) serves the panel and implements the adapter contract.

## Run

```bash
node server.js
```

Open **http://localhost:8787/** in a browser.

Do not open the HTML as a `file://` URL. Same-origin serving avoids browser security blocks on localhost requests.

## Panel change (solo / level 1)

The original panel parser required a status line whose length equalled `preset.steps`.  
Level 1 presets have `steps: 0`, so they could not complete.

A small branch was added to the panel’s `event` function:

- When `chosen().steps === 0`, an `{ kind: 'output', text }` event marks the run COMPLETE.
- A bare `COMPLETE` control message is also accepted for solo.

This is the only modification to the panel logic. Multi-step presets are unchanged.

## Protocol

Control messages the panel parses (exact format):

- `STATUS step=N line=XXXX note=...`
- `NEED step=N item=...`
- `STOP step=N digit=1|3|4 reason=...`
- `COMPLETE line=555...`

Content travels as `{ kind: "output", step, text }`.

Transport endpoints used by this adapter:

- `POST /api/preset/start`
- `POST /api/preset/resume`

These are local transport names. The messages inside still use the protocol vocabulary above.

## Model and mock

- Tries local Ollama at `http://localhost:11434` (model `llama3.2` by default) when `preferLocal` is true.
- If Ollama is unreachable, every mock block is labeled on the first and last line:

  ```
  MOCK OUTPUT — NOT AI-GENERATED
  ```

- Environment overrides: `OLLAMA_URL`, `OLLAMA_MODEL`, `PORT`.

## Tuning

The panel sends the active tuning map via `getInput().tuning`.  
The backend inserts those values into the system prompt before the model call.

## Review stops

`reviewStops` is read from the preset object the panel sends (which comes from the embedded config).  
Level-2 presets in the supplied config stop after step 1.

## Safety

The system prompt instructs the model to use only facts from the profile and job posting.  
A prompt does not enforce this. Real enforcement would require a separate check that compares claims against the supplied profile; that check is not implemented here.

## Config

`preset-config.json` is a copy of the embedded data in the panel.  
The Google Doc remains the intended source of truth. This JSON is for local convenience only.

## Pointing at a remote host

```js
window.PresetPanel.installAdapter(createXelimeAdapter({
  endpoint: 'https://trusted-host.example.com',
  preferLocal: true
}));
```

Profile and job text will leave the machine. Use only a host you trust and HTTPS.
