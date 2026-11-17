import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Check, n as Minus, r as Copy } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DH7gukoZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEVELS = {
	"1": "Solo",
	"2": "Single step with review",
	"3": "Short chain",
	"4": "Full loop"
};
var AXES = {
	"Intensity": [
		"very brief",
		"brief",
		"standard",
		"detailed",
		"very detailed"
	],
	"Tone": [
		"casual",
		"friendly",
		"neutral",
		"professional",
		"formal"
	],
	"Specificity": [
		"general",
		"some detail",
		"specific",
		"highly specific",
		"exact figures from profile"
	],
	"Boldness": [
		"modest",
		"measured",
		"confident",
		"assertive",
		"strongly assertive"
	],
	"Persona": [
		"early-career",
		"developing",
		"established",
		"senior",
		"expert"
	]
};
var DEFAULTS = {
	"Intensity": 3,
	"Tone": 3,
	"Specificity": 3,
	"Boldness": 2,
	"Persona": 3
};
var PRESETS = [
	{
		"number": 1,
		"name": "Match Check",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 2,
		"name": "Keyword Pull",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 3,
		"name": "Job Fit Score",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 4,
		"name": "Salary Check",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 5,
		"name": "Competency Map",
		"level": 3,
		"tuning": "none",
		"steps": 3,
		"reviewStops": []
	},
	{
		"number": 6,
		"name": "Knockout Check",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 7,
		"name": "Level Check",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 8,
		"name": "Strategy Picker",
		"level": 3,
		"tuning": "none",
		"steps": 3,
		"reviewStops": []
	},
	{
		"number": 9,
		"name": "Language Mirror",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 10,
		"name": "Proof Map",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 11,
		"name": "Quantify Me",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 12,
		"name": "Portfolio Picks",
		"level": 3,
		"tuning": "none",
		"steps": 3,
		"reviewStops": []
	},
	{
		"number": 13,
		"name": "Gap Note",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 14,
		"name": "Adjacent Bridge",
		"level": 3,
		"tuning": "none",
		"steps": 3,
		"reviewStops": []
	},
	{
		"number": 15,
		"name": "Gap Phrases",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 16,
		"name": "Coverage Report",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 17,
		"name": "Self-Rubric",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 18,
		"name": "STAR Builder",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 19,
		"name": "STAR Bank",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 20,
		"name": "Interview Prep",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 21,
		"name": "Likely Question Bank",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 22,
		"name": "Answer Evidence Map",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 23,
		"name": "Follow-Up Drill",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 24,
		"name": "Strong-Answer Signals",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 25,
		"name": "Red Flag Check",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 26,
		"name": "Interview Walkthrough",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 27,
		"name": "Sample Task Plan",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 28,
		"name": "Question Quality Check",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 29,
		"name": "Tailor Resume",
		"level": 2,
		"tuning": "all",
		"steps": 1,
		"reviewStops": [1]
	},
	{
		"number": 30,
		"name": "Resume Trim",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 31,
		"name": "Cover Letter (Confident)",
		"level": 2,
		"tuning": "all",
		"steps": 1,
		"reviewStops": [1]
	},
	{
		"number": 32,
		"name": "Cover Letter (Short)",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 33,
		"name": "Opening Line",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 34,
		"name": "Motivation Line",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 35,
		"name": "Relevant Experience Pick",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 36,
		"name": "Value Statement",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 37,
		"name": "Closing Options",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 38,
		"name": "Four-Paragraph Build",
		"level": 2,
		"tuning": "all",
		"steps": 1,
		"reviewStops": [1]
	},
	{
		"number": 39,
		"name": "Length Trim",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 40,
		"name": "Strategy Letter: Technical",
		"level": 2,
		"tuning": "all",
		"steps": 1,
		"reviewStops": [1]
	},
	{
		"number": 41,
		"name": "Strategy Letter: Architecture",
		"level": 2,
		"tuning": "all",
		"steps": 1,
		"reviewStops": [1]
	},
	{
		"number": 42,
		"name": "Strategy Letter: Remote",
		"level": 2,
		"tuning": "all",
		"steps": 1,
		"reviewStops": [1]
	},
	{
		"number": 43,
		"name": "Strategy Letter: Growth",
		"level": 2,
		"tuning": "all",
		"steps": 1,
		"reviewStops": [1]
	},
	{
		"number": 44,
		"name": "Strategy Letter: Direct",
		"level": 2,
		"tuning": "all",
		"steps": 1,
		"reviewStops": [1]
	},
	{
		"number": 45,
		"name": "Recruiter Message",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 46,
		"name": "Follow-Up Email",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 47,
		"name": "Reference Prep",
		"level": 1,
		"tuning": "none",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 48,
		"name": "Honesty Check",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 49,
		"name": "Eight-Point Review",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 50,
		"name": "Resume Overlap Check",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 51,
		"name": "Natural Voice Check",
		"level": 1,
		"tuning": "spec-persona",
		"steps": 0,
		"reviewStops": []
	},
	{
		"number": 52,
		"name": "Package Plan",
		"level": 4,
		"tuning": "none",
		"steps": 7,
		"reviewStops": null
	}
];
var GROUPS = [
	{
		label: "A · Analyze the Job",
		start: 1,
		end: 9
	},
	{
		label: "B · Prove Your Fit",
		start: 10,
		end: 17
	},
	{
		label: "C · Stories and Interview Prep",
		start: 18,
		end: 28
	},
	{
		label: "D · Write",
		start: 29,
		end: 47
	},
	{
		label: "E · Review",
		start: 48,
		end: 51
	},
	{
		label: "F · Package",
		start: 52,
		end: 52
	}
];
var DIGIT_LABEL = {
	"0": "Not started",
	"1": "Waiting for data",
	"3": "Blocked",
	"4": "Needs review",
	"5": "Done",
	"6": "Skipped"
};
function digitLabel(digit) {
	return DIGIT_LABEL[digit] ?? "Unknown";
}
function freshRun(steps) {
	return {
		digits: Array.from({ length: steps }, () => "0"),
		outputs: {},
		pending: null,
		finished: false,
		status: "Idle",
		outputText: "",
		outputTitle: "Your output"
	};
}
function checkStep(steps, raw) {
	const n = Number(raw);
	if (!Number.isInteger(n) || n < 1 || n > steps) throw new Error("Backend supplied an invalid step number.");
	return n;
}
/** Applies one backend event. Throws on a protocol violation. */
function applyEvent(state, preset, event) {
	if (state.finished) throw new Error("Received data after COMPLETE.");
	if (event.kind === "output") {
		if (typeof event.text !== "string") throw new Error("Invalid output.");
		if (preset.steps === 0) return {
			...state,
			outputText: event.text,
			outputTitle: "Your output",
			finished: true,
			status: "COMPLETE"
		};
		const outputs = { ...state.outputs };
		if (event.step !== void 0) outputs[checkStep(preset.steps, String(event.step))] = event.text;
		return {
			...state,
			outputs,
			outputText: event.text,
			outputTitle: event.step ? `Step ${event.step} output` : "Your output"
		};
	}
	if (event.kind !== "control" || typeof event.message !== "string") throw new Error("Invalid backend event.");
	const s = event.message;
	let m;
	if (m = s.match(/^STATUS step=(\d+) line=([013456]+) note=([^\r\n]*)$/)) {
		checkStep(preset.steps, m[1]);
		if (m[2].length !== preset.steps) throw new Error("Invalid status-line length.");
		const next = m[2].split("");
		for (let i = 0; i < next.length; i++) if (next[i] !== "0" && next.slice(0, i).some((d) => d !== "5" && d !== "6")) throw new Error("Out-of-order status update.");
		return {
			...state,
			digits: next
		};
	}
	if (m = s.match(/^NEED step=(\d+) item=([^\r\n]+)$/)) {
		const step = checkStep(preset.steps, m[1]);
		const digits = state.digits.slice();
		digits[step - 1] = "1";
		return {
			...state,
			digits,
			pending: {
				step,
				digit: "1",
				item: m[2]
			},
			status: "Waiting for you"
		};
	}
	if (m = s.match(/^STOP step=(\d+) digit=([134]) reason=([^\r\n]+)$/)) {
		const step = checkStep(preset.steps, m[1]);
		const digits = state.digits.slice();
		digits[step - 1] = m[2];
		const item = state.pending?.step === step ? state.pending.item : null;
		return {
			...state,
			digits,
			pending: {
				step,
				digit: m[2],
				item,
				reason: m[3]
			},
			status: m[2] === "3" ? "Blocked" : "Waiting for you"
		};
	}
	if (m = s.match(/^COMPLETE line=([56]+)$/)) {
		if (m[1].length !== preset.steps || state.pending) throw new Error("Invalid completion.");
		return {
			...state,
			digits: m[1].split(""),
			finished: true,
			status: "COMPLETE",
			pending: null
		};
	}
	if (preset.steps === 0 && s === "COMPLETE") return {
		...state,
		finished: true,
		status: "COMPLETE"
	};
	if (/^ERROR (Can't open the config doc\.|Preset \d+ not found\.|Missing prompt text for preset \d+\.|Tuning setting .+ must be a number from 1 to 5\.|Missing section .+\.)$/.test(s)) throw new Error(s.slice(6));
	throw new Error("Unsupported or unresolved protocol message.");
}
function stopReason(pending) {
	if (!pending) return "";
	if (pending.digit === "1") return `Please provide: ${pending.item ?? "more information"}`;
	return pending.reason ?? "Stopped.";
}
function mockBlock(preset, step, input, note) {
	const tuning = Object.entries(input.tuning);
	const tuningLine = tuning.length ? tuning.map(([k, v]) => `${k}: ${v}`).join(" · ") : "Tuning off for this preset";
	return [
		"MOCK OUTPUT — NOT AI-GENERATED",
		`${String(preset.number).padStart(2, "0")} · ${preset.name}`,
		step == null ? "Solo — no numbered steps" : `Step ${step} of ${preset.steps}`,
		note,
		`Job posting on this page: ${input.job.length} characters`,
		input.profile.trim() ? `Profile on this device: ${input.profile.trim().length} characters` : "Profile: none",
		tuningLine,
		"MOCK OUTPUT — NOT AI-GENERATED"
	].join("\n");
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
* Local stand-in so the panel can be walked.
* It never calls a model. Every block is labeled mock.
* Level 4 stays unconfigured — the seven step definitions are not in the source.
*/
function createDemoAdapter(readInput) {
	let session = null;
	async function runFrom(current, onEvent, resumed) {
		const { preset, input } = current;
		const stops = Array.isArray(preset.reviewStops) ? preset.reviewStops : [];
		const resumeStep = current.nextStep;
		for (let step = current.nextStep; step <= preset.steps; step++) {
			await sleep(240);
			const continued = resumed && step === resumeStep;
			onEvent({
				kind: "output",
				step,
				text: mockBlock(preset, step, input, continued ? "Continued after your note. No model was called." : "Protocol sample only. No model was called.")
			});
			if (stops.includes(step) && !(continued && step === resumeStep)) {
				onEvent({
					kind: "control",
					message: `STOP step=${step} digit=4 reason=Review required before continuing`
				});
				current.nextStep = step;
				return;
			}
			if (step < preset.steps) {
				const line = Array.from({ length: preset.steps }, (_, i) => i < step ? "5" : "0").join("");
				onEvent({
					kind: "control",
					message: `STATUS step=${step} line=${line} note=Sample step ${step} marked done`
				});
			}
		}
		onEvent({
			kind: "control",
			message: `COMPLETE line=${"5".repeat(preset.steps)}`
		});
		current.nextStep = preset.steps + 1;
	}
	return {
		capabilities: {
			soloResolved: true,
			level2Resolved: true,
			fullLoopConfigured: false
		},
		async start({ preset, onEvent }) {
			const input = readInput();
			const current = {
				preset,
				input,
				nextStep: 1
			};
			session = current;
			if (preset.steps === 0) {
				await sleep(200);
				onEvent({
					kind: "output",
					text: mockBlock(preset, null, input, "Solo completion is one output event. No model was called.")
				});
				return;
			}
			await runFrom(current, onEvent, false);
		},
		async resume({ onEvent }) {
			if (!session) throw new Error("No active run");
			await runFrom(session, onEvent, true);
		}
	};
}
var AREAS = Object.keys(AXES);
var PROFILE_KEY = "career-profile-v1";
function enabled(preset, area) {
	return preset.tuning === "all" || preset.tuning === "spec-persona" && (area === "Specificity" || area === "Persona");
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function PresetPanel() {
	const [presetNo, setPresetNo] = (0, import_react.useState)(1);
	const preset = PRESETS[presetNo - 1] ?? PRESETS[0];
	const [values, setValues] = (0, import_react.useState)({ ...DEFAULTS });
	const [job, setJob] = (0, import_react.useState)("");
	const [profile, setProfile] = (0, import_react.useState)("");
	const [drafts, setDrafts] = (0, import_react.useState)("");
	const [profileSaved, setProfileSaved] = (0, import_react.useState)(false);
	const [run, setRun] = (0, import_react.useState)(() => freshRun(0));
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [response, setResponse] = (0, import_react.useState)("");
	const [log, setLog] = (0, import_react.useState)([]);
	const [adapter] = (0, import_react.useState)(() => createDemoAdapter(() => inputRef.current));
	const inputRef = (0, import_react.useRef)({
		job: "",
		profile: "",
		drafts: "",
		tuning: {}
	});
	inputRef.current = {
		job,
		profile,
		drafts,
		tuning: (0, import_react.useMemo)(() => {
			const active = {};
			for (const area of AREAS) if (enabled(preset, area)) active[area] = AXES[area][values[area] - 1];
			return active;
		}, [preset, values])
	};
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem(PROFILE_KEY) ?? "";
			if (saved) {
				setProfile(saved);
				setProfileSaved(true);
			}
		} catch {
			setMessage("Browser storage is unavailable.");
		}
	}, []);
	function resetFor(next) {
		setRun(freshRun(next.steps));
		setResponse("");
		setMessage("");
		setBusy(false);
	}
	function pushLog(line) {
		setLog((prev) => [...prev.slice(-24), line]);
	}
	function onEvent(event) {
		pushLog(event.kind === "control" ? event.message : `OUTPUT step=${event.step ?? "solo"}`);
		setRun((current) => applyEvent(current, preset, event));
	}
	async function submit(messages, start) {
		setBusy(true);
		setMessage("");
		setRun((current) => ({
			...current,
			status: "Running"
		}));
		try {
			if (start) await adapter.start({
				preset,
				messages,
				onEvent
			});
			else await adapter.resume({
				messages,
				onEvent
			});
			setRun((current) => {
				if (!current.pending && !current.finished) return {
					...current,
					status: "Blocked"
				};
				return current;
			});
		} catch (error) {
			const text = error instanceof Error ? error.message : "Connection failed.";
			setRun((current) => ({
				...current,
				status: "Blocked"
			}));
			setMessage(text);
		} finally {
			setBusy(false);
		}
	}
	async function continueRun(changes) {
		if (!run.pending) return;
		const text = response.trim();
		if ((changes || run.pending.digit !== "4") && !text) {
			setMessage("Provide the requested information or changes first.");
			return;
		}
		const messages = [];
		if (text) {
			const item = run.pending.item || (changes ? "changes" : "review");
			messages.push(`DATA item=${item}: ${text}`);
		}
		messages.push(`CONTINUE step=${run.pending.step}`);
		messages.forEach(pushLog);
		setRun((current) => ({
			...current,
			pending: null
		}));
		setResponse("");
		await submit(messages, false);
	}
	async function handleRun() {
		if (run.pending) {
			await continueRun(false);
			return;
		}
		if (!job.trim()) {
			setMessage("Paste a job posting first.");
			return;
		}
		resetFor(preset);
		setLog([`RUN preset=${preset.number}`]);
		if (preset.level === 1 && !adapter.capabilities.soloResolved) {
			setMessage("The backend must resolve the Solo-level completion format before running.");
			return;
		}
		if (preset.level === 2 && !adapter.capabilities.level2Resolved) {
			setMessage("The backend must resolve the level-2 status-line format before running.");
			return;
		}
		if (preset.level === 4 && !adapter.capabilities.fullLoopConfigured) {
			setMessage("The seven-step preset file and review positions are required. They are not in the source document.");
			return;
		}
		await submit([`RUN preset=${preset.number}`], true);
	}
	function saveProfile() {
		try {
			if (!profile.trim()) throw new Error("Add profile facts before saving.");
			localStorage.setItem(PROFILE_KEY, profile.trim());
			setProfileSaved(true);
			setMessage("Profile saved in this browser.");
		} catch (error) {
			setMessage(error instanceof Error ? error.message : "Could not save.");
		}
	}
	function clearProfile() {
		try {
			localStorage.removeItem(PROFILE_KEY);
			setProfile("");
			setProfileSaved(false);
		} catch {
			setMessage("Could not clear browser storage.");
		}
	}
	async function copyOutput() {
		if (!run.outputText) return;
		try {
			await navigator.clipboard.writeText(run.outputText);
			setMessage("Output copied.");
		} catch {
			setMessage("Clipboard unavailable. Select the output and copy manually.");
		}
	}
	const locked = busy || !!run.pending;
	const profileLabel = profileSaved ? "Profile saved locally" : profile.trim() ? "Unsaved profile" : "No saved profile";
	const tuningNote = preset.tuning === "none" ? "This preset does not use tuning." : preset.tuning === "all" ? "All five tuning areas are active." : "Only Specificity and Persona are active.";
	const stepNote = preset.level === 4 ? "Seven-step configuration and review positions must be supplied by the backend." : preset.level === 2 ? "This preset requires review of step 1." : preset.level === 1 ? "Solo presets have no numbered steps." : "Three-step chain, without a configured review stop.";
	const runLabel = run.pending ? "Continue" : busy ? "Running" : run.finished ? "Run again" : "Run preset";
	const resolved = run.digits.filter((d) => d === "5" || d === "6").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-forest text-sm font-semibold text-on-forest",
						children: "P"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl leading-none tracking-tight text-ink",
						children: "Preset Panel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Career system · spec v1.0"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-full bg-paper px-3 py-2 text-xs font-medium text-forest-deep",
					role: "status",
					children: run.status
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-5 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight text-ink",
					children: "Your experience. The right words."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-base leading-relaxed text-muted",
					children: "Choose a preset, set the tuning, and stay in control of every stop."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 rounded-xl border border-amber/30 bg-amber-bg px-4 py-3 text-sm leading-relaxed text-amber",
					children: "Live model is not connected. Runs below walk the protocol with labeled mock output. Nothing here is a finished letter, resume, or score."
				}),
				run.pending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4 rounded-xl border border-amber/40 bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-ink",
							children: run.pending.digit === "4" ? `Step ${run.pending.step} needs your review` : run.pending.digit === "3" ? "Run blocked" : "More information needed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: stopReason(run.pending)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: response,
							onChange: (e) => setResponse(e.target.value),
							"aria-label": "Review changes or requested data",
							placeholder: "Add requested information or describe your changes…",
							className: "mt-4 min-h-24 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm leading-relaxed text-ink outline-none focus-visible:ring-2 focus-visible:ring-forest"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [run.pending.digit === "4" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: () => void continueRun(false),
								className: "rounded-lg bg-forest px-4 py-3 text-sm font-medium text-on-forest disabled:opacity-45",
								children: "Approve and continue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: () => void continueRun(true),
								className: "rounded-lg border border-line bg-card px-4 py-3 text-sm font-medium text-forest-deep disabled:opacity-45",
								children: "Send changes"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-5 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-2xl border border-line bg-card p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xs font-semibold tracking-wide text-muted",
									children: "01 · Choose a preset"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mt-3 block text-sm font-medium",
									htmlFor: "preset",
									children: "Preset"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: "preset",
									value: preset.number,
									disabled: locked,
									onChange: (e) => {
										const next = PRESETS[Number(e.target.value) - 1];
										setPresetNo(next.number);
										resetFor(next);
										setLog([]);
									},
									className: "mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-forest",
									children: GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
										label: group.label,
										children: PRESETS.filter((p) => p.number >= group.start && p.number <= group.end).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: p.number,
											children: [
												pad(p.number),
												" · ",
												p.name
											]
										}, p.number))
									}, group.label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-xs leading-relaxed text-muted",
									children: [
										"Level ",
										preset.level,
										" · ",
										LEVELS[preset.level],
										" ·",
										" ",
										preset.steps === 0 ? "No numbered steps" : `${preset.steps} step${preset.steps === 1 ? "" : "s"}`
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-5 h-px bg-line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xs font-semibold tracking-wide text-muted",
									children: "02 · Tune your approach"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5",
									children: AREAS.map((area) => {
										const on = enabled(preset, area);
										const word = AXES[area][values[area] - 1];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: on ? "" : "opacity-35",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: `range-${area}`,
													className: "block text-center text-xs font-medium",
													children: area
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mx-auto mt-2 grid size-12 place-items-center rounded-full border-4 border-moss-bg bg-card",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block h-3 w-0.5 origin-bottom rounded-full bg-forest",
														style: { transform: `rotate(${(values[area] - 3) * 56}deg) translateY(-4px)` },
														"aria-hidden": "true"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: `range-${area}`,
													type: "range",
													min: 1,
													max: 5,
													step: 1,
													value: values[area],
													disabled: locked || !on,
													"aria-valuetext": word,
													onChange: (e) => setValues((current) => ({
														...current,
														[area]: Number(e.target.value)
													})),
													className: "mt-2 w-full accent-forest"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 min-h-10 text-center text-xs leading-snug text-muted",
													children: word
												})
											]
										}, area);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs leading-relaxed text-muted",
									children: tuningNote
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-5 h-px bg-line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xs font-semibold tracking-wide text-muted",
										children: "03 · Add the job posting"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted",
										children: profileLabel
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: job,
									disabled: locked,
									onChange: (e) => setJob(e.target.value),
									"aria-label": "Job posting",
									placeholder: "Paste the job posting here…",
									className: "mt-3 min-h-40 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm leading-relaxed text-ink outline-none focus-visible:ring-2 focus-visible:ring-forest"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between text-xs text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Only verified facts. No invented experience." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [job.length, " characters"] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void handleRun(),
									disabled: busy,
									className: "mt-4 w-full rounded-lg bg-forest px-4 py-3.5 text-sm font-medium text-on-forest disabled:opacity-45",
									children: runLabel
								}),
								message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-rose",
									role: "alert",
									children: message
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "rounded-2xl border border-line bg-card p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
									className: "cursor-pointer text-sm font-semibold",
									children: "Your profile and supporting drafts"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs leading-relaxed text-muted",
									children: "Optional saving stores your profile in this browser only. Saving does not send it to a model."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "profile",
									className: "mt-4 block text-sm font-medium",
									children: "Profile facts"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "profile",
									value: profile,
									onChange: (e) => {
										setProfile(e.target.value);
										setProfileSaved(false);
									},
									placeholder: "Your verified experience, education, skills, and results…",
									className: "mt-2 min-h-28 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-forest"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: saveProfile,
										className: "rounded-lg border border-line px-3 py-2.5 text-sm font-medium",
										children: "Save in this browser"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: clearProfile,
										className: "rounded-lg border border-line px-3 py-2.5 text-sm font-medium",
										children: "Clear saved profile"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "drafts",
									className: "mt-4 block text-sm font-medium",
									children: "Resume, cover letter, or other input"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "drafts",
									value: drafts,
									onChange: (e) => setDrafts(e.target.value),
									placeholder: "Add drafts needed by review or trimming presets…",
									className: "mt-2 min-h-24 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-forest"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-2xl border border-line bg-card p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-sm font-semibold",
											children: "Progress"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted",
											children: run.digits.length ? `${resolved} of ${run.digits.length} resolved` : run.finished ? "Complete" : "Single action"
										})]
									}),
									run.digits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 rounded-lg bg-paper px-3 py-6 text-center text-sm text-muted",
										children: "Solo presets have no step track."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 flex gap-2",
										children: run.digits.map((digit, index) => {
											const tone = digit === "5" ? "bg-moss-bg text-forest" : digit === "3" ? "bg-rose-bg text-rose" : digit === "1" || digit === "4" ? "bg-amber-bg text-amber" : "bg-paper text-muted";
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												title: `Step ${index + 1}: ${digitLabel(digit)}`,
												onClick: () => {
													const text = run.outputs[index + 1] ?? "";
													setRun((current) => ({
														...current,
														outputText: text,
														outputTitle: `Step ${index + 1} output`
													}));
												},
												className: `grid h-12 min-w-0 flex-1 place-items-center rounded-lg text-sm font-semibold ${tone}`,
												children: digit === "5" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : digit === "6" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" }) : index + 1
											}, index);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-xs leading-relaxed text-muted",
										children: stepNote
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-2xl border border-line bg-card p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-semibold",
										children: run.outputTitle
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: !run.outputText,
										onClick: () => void copyOutput(),
										className: "inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium disabled:opacity-45",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Copy"]
									})]
								}), run.outputText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
									className: "mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-xl bg-paper p-4 font-sans text-sm leading-relaxed text-ink",
									children: run.outputText
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 grid min-h-64 place-items-center rounded-xl bg-paper px-6 text-center text-sm text-muted",
									children: "Output appears here after a run. Mock lines are labeled so they cannot be mistaken for a model result."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "rounded-2xl border border-line bg-card p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
										className: "cursor-pointer text-sm font-semibold",
										children: "Protocol log"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-3 space-y-1 font-mono text-xs leading-relaxed text-muted",
										children: [log.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No messages yet." }), log.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, `${i}-${line}`))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-xs leading-relaxed text-muted",
										children: "Control lines this panel accepts: STATUS, NEED, STOP, COMPLETE. Content is a separate output event, never mixed into a control line. Package Plan stays blocked until the seven step files and review positions are supplied. A prompt cannot guarantee facts stay inside the profile — that check is not built here."
									})
								]
							})
						]
					})]
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetPanel, {});
}
//#endregion
export { Home as component };
