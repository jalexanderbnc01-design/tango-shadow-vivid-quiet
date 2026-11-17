import type { Preset, TuningArea } from "@/data/presets";

export type PanelInput = {
  job: string;
  profile: string;
  drafts: string;
  tuning: Partial<Record<TuningArea, string>>;
};

export type PanelEvent =
  | { kind: "output"; step?: number; text: string }
  | { kind: "control"; message: string };

export type PendingStop = {
  step: number;
  digit: string;
  item: string | null;
  reason?: string;
};

export type RunState = {
  digits: string[];
  outputs: Record<number, string>;
  pending: PendingStop | null;
  finished: boolean;
  status: string;
  outputText: string;
  outputTitle: string;
};

export type Adapter = {
  capabilities: {
    soloResolved: boolean;
    level2Resolved: boolean;
    fullLoopConfigured: boolean;
  };
  start(args: {
    preset: Preset;
    messages: string[];
    onEvent: (event: PanelEvent) => void;
  }): Promise<void>;
  resume(args: {
    messages: string[];
    onEvent: (event: PanelEvent) => void;
  }): Promise<void>;
};

const DIGIT_LABEL: Record<string, string> = {
  "0": "Not started",
  "1": "Waiting for data",
  "3": "Blocked",
  "4": "Needs review",
  "5": "Done",
  "6": "Skipped",
};

export function digitLabel(digit: string): string {
  return DIGIT_LABEL[digit] ?? "Unknown";
}

export function freshRun(steps: number): RunState {
  return {
    digits: Array.from({ length: steps }, () => "0"),
    outputs: {},
    pending: null,
    finished: false,
    status: "Idle",
    outputText: "",
    outputTitle: "Your output",
  };
}

function checkStep(steps: number, raw: string): number {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1 || n > steps) {
    throw new Error("Backend supplied an invalid step number.");
  }
  return n;
}

/** Applies one backend event. Throws on a protocol violation. */
export function applyEvent(state: RunState, preset: Preset, event: PanelEvent): RunState {
  if (state.finished) throw new Error("Received data after COMPLETE.");

  if (event.kind === "output") {
    if (typeof event.text !== "string") throw new Error("Invalid output.");
    if (preset.steps === 0) {
      return {
        ...state,
        outputText: event.text,
        outputTitle: "Your output",
        finished: true,
        status: "COMPLETE",
      };
    }
    const outputs = { ...state.outputs };
    if (event.step !== undefined) outputs[checkStep(preset.steps, String(event.step))] = event.text;
    return {
      ...state,
      outputs,
      outputText: event.text,
      outputTitle: event.step ? `Step ${event.step} output` : "Your output",
    };
  }

  if (event.kind !== "control" || typeof event.message !== "string") {
    throw new Error("Invalid backend event.");
  }

  const s = event.message;
  let m: RegExpMatchArray | null;

  if ((m = s.match(/^STATUS step=(\d+) line=([013456]+) note=([^\r\n]*)$/))) {
    const step = checkStep(preset.steps, m[1]);
    if (m[2].length !== preset.steps) throw new Error("Invalid status-line length.");
    const next = m[2].split("");
    for (let i = 0; i < next.length; i++) {
      if (next[i] !== "0" && next.slice(0, i).some((d) => d !== "5" && d !== "6")) {
        throw new Error("Out-of-order status update.");
      }
    }
    void step;
    return { ...state, digits: next };
  }

  if ((m = s.match(/^NEED step=(\d+) item=([^\r\n]+)$/))) {
    const step = checkStep(preset.steps, m[1]);
    const digits = state.digits.slice();
    digits[step - 1] = "1";
    return {
      ...state,
      digits,
      pending: { step, digit: "1", item: m[2] },
      status: "Waiting for you",
    };
  }

  if ((m = s.match(/^STOP step=(\d+) digit=([134]) reason=([^\r\n]+)$/))) {
    const step = checkStep(preset.steps, m[1]);
    const digits = state.digits.slice();
    digits[step - 1] = m[2];
    const item = state.pending?.step === step ? state.pending.item : null;
    return {
      ...state,
      digits,
      pending: { step, digit: m[2], item, reason: m[3] },
      status: m[2] === "3" ? "Blocked" : "Waiting for you",
    };
  }

  if ((m = s.match(/^COMPLETE line=([56]+)$/))) {
    if (m[1].length !== preset.steps || state.pending) throw new Error("Invalid completion.");
    return { ...state, digits: m[1].split(""), finished: true, status: "COMPLETE", pending: null };
  }

  if (preset.steps === 0 && s === "COMPLETE") {
    return { ...state, finished: true, status: "COMPLETE" };
  }

  if (
    /^ERROR (Can't open the config doc\.|Preset \d+ not found\.|Missing prompt text for preset \d+\.|Tuning setting .+ must be a number from 1 to 5\.|Missing section .+\.)$/.test(
      s,
    )
  ) {
    throw new Error(s.slice(6));
  }

  throw new Error("Unsupported or unresolved protocol message.");
}

export function stopReason(pending: PendingStop | null): string {
  if (!pending) return "";
  if (pending.digit === "1") return `Please provide: ${pending.item ?? "more information"}`;
  return pending.reason ?? "Stopped.";
}

function mockBlock(preset: Preset, step: number | null, input: PanelInput, note: string): string {
  const tuning = Object.entries(input.tuning);
  const tuningLine = tuning.length
    ? tuning.map(([k, v]) => `${k}: ${v}`).join(" · ")
    : "Tuning off for this preset";
  return [
    "MOCK OUTPUT — NOT AI-GENERATED",
    `${String(preset.number).padStart(2, "0")} · ${preset.name}`,
    step == null ? "Solo — no numbered steps" : `Step ${step} of ${preset.steps}`,
    note,
    `Job posting on this page: ${input.job.length} characters`,
    input.profile.trim()
      ? `Profile on this device: ${input.profile.trim().length} characters`
      : "Profile: none",
    tuningLine,
    "MOCK OUTPUT — NOT AI-GENERATED",
  ].join("\n");
}

type Session = { preset: Preset; input: PanelInput; nextStep: number };

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Local stand-in so the panel can be walked.
 * It never calls a model. Every block is labeled mock.
 * Level 4 stays unconfigured — the seven step definitions are not in the source.
 */
export function createDemoAdapter(readInput: () => PanelInput): Adapter {
  let session: Session | null = null;

  async function runFrom(
    current: Session,
    onEvent: (event: PanelEvent) => void,
    resumed: boolean,
  ) {
    const { preset, input } = current;
    const stops = Array.isArray(preset.reviewStops) ? preset.reviewStops : [];
    const resumeStep = current.nextStep;

    for (let step = current.nextStep; step <= preset.steps; step++) {
      await sleep(240);
      const continued = resumed && step === resumeStep;
      onEvent({
        kind: "output",
        step,
        text: mockBlock(
          preset,
          step,
          input,
          continued
            ? "Continued after your note. No model was called."
            : "Protocol sample only. No model was called.",
        ),
      });

      const reviewing = stops.includes(step) && !(continued && step === resumeStep);
      if (reviewing) {
        onEvent({
          kind: "control",
          message: `STOP step=${step} digit=4 reason=Review required before continuing`,
        });
        current.nextStep = step;
        return;
      }

      if (step < preset.steps) {
        const line = Array.from({ length: preset.steps }, (_, i) => (i < step ? "5" : "0")).join("");
        onEvent({
          kind: "control",
          message: `STATUS step=${step} line=${line} note=Sample step ${step} marked done`,
        });
      }
    }

    const line = "5".repeat(preset.steps);
    onEvent({ kind: "control", message: `COMPLETE line=${line}` });
    current.nextStep = preset.steps + 1;
  }

  return {
    capabilities: {
      soloResolved: true,
      level2Resolved: true,
      fullLoopConfigured: false,
    },
    async start({ preset, onEvent }) {
      const input = readInput();
      const current: Session = { preset, input, nextStep: 1 };
      session = current;
      if (preset.steps === 0) {
        await sleep(200);
        onEvent({
          kind: "output",
          text: mockBlock(
            preset,
            null,
            input,
            "Solo completion is one output event. No model was called.",
          ),
        });
        return;
      }
      await runFrom(current, onEvent, false);
    },
    async resume({ onEvent }) {
      if (!session) throw new Error("No active run");
      await runFrom(session, onEvent, true);
    },
  };
}
