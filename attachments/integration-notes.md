# Preset Panel — integration notes

## Implemented
52 source-defined names and numbers; correct level names and counts (Solo has zero numbered steps); tuning words and defaults; tuning-mode availability; local optional profile persistence; supporting-draft input; no synthetic generation, timers, or sample output; output copy; adapter-driven status, NEED and STOP rendering.

## Not a deployed AI integration
Run is disabled until a developer calls window.PresetPanel.installAdapter(adapter). No backend endpoint, provider credentials, deployment, or profile service was supplied. Profile saving is browser-local only. The original document was not modified.

## Adapter contract (proposed application interface, NOT a change to the AI protocol)
- start({preset, messages, onEvent}) => Promise
- resume({messages, onEvent}) => Promise
- Read current input using window.PresetPanel.getInput(). Snapshot inputs at start.
- start receives RUN first and nothing else. The adapter must implement the agreed TUNING/DATA exchange against its backend, preserving protocol message order.
- Control event: {kind:'control', message:'STATUS step=1 line=500 note=Step 1 done'}
- Content event: {kind:'output', step:1, text:'actual AI output'}
The content event is a proposed transport envelope. The source has no defined output channel; agree this explicitly before deploying. Never feed output text to the control-message parser.
- Promises resolve only on a pause, error, or completion. Adapter owns run/session identity, cancellation, network retries and stream assembly.
- Never store AI keys in the HTML. No automatic network request is included.

## Source issues requiring agreement
1. TUNING direction contradicts the flow paragraph. Choose one before integration.
2. Level 1 forbids step fields but gives no completion/status format. Solo handling must be supplied by adapter, not invented here.
3. Level 2 allows step=1 but gives no status-line length. UI parser provisionally accepts one digit; enable only after confirming this interpretation.
4. Level 4 lists seven steps but omits step definitions and exact review stops. Fetch the referenced preset files or supply their contents; do not use the example's step-3 stop as config.
5. Only the preset names, levels, tuning modes and prose prompts are present in the document, not actual contents of the named markdown files. The panel does not invent multi-step prompts. Backend must load those files and source prompts.
6. NEED and STOP ordering, multiline DATA escaping, feedback item names and output transport need an agreed framing contract. The review control currently proposes DATA item=changes; confirm that item name.
7. No running status digit exists. Do not add one to protocol lines. Blue can be a transport-local activity indicator only.

## Safety and release
Backend must enforce the rule: use only facts from the profile and job posting; never invent credentials, numbers or experience. Persona is a writing setting, not evidence of seniority. Treat profile/job content as untrusted data, not system instructions. Validate control messages and run identity server-side; do not rely on browser checks. Restrict endpoints, authenticate users and obtain approval for transmitting profile data. Implement durable profile storage only with explicit product requirements.

## Testing
Generated files were checked for data consistency in Python. Browser interactions, adapter streaming and AI integration have not been end-to-end tested. Do not label this production-ready.

Source: Career system, https://docs.google.com/document/d/1-EfZClo_yg4Gw6m_B5j85gStRQArYXmWZHHg2R7UA30/edit
