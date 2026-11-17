import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Minus } from "lucide-react";
import {
  AXES,
  DEFAULTS,
  GROUPS,
  LEVELS,
  PRESETS,
  type Preset,
  type TuningArea,
} from "@/data/presets";
import {
  applyEvent,
  createDemoAdapter,
  digitLabel,
  freshRun,
  stopReason,
  type Adapter,
  type PanelEvent,
  type PanelInput,
  type RunState,
} from "@/lib/preset-protocol";

const AREAS = Object.keys(AXES) as TuningArea[];
const PROFILE_KEY = "career-profile-v1";

function enabled(preset: Preset, area: TuningArea) {
  return preset.tuning === "all" || (preset.tuning === "spec-persona" && (area === "Specificity" || area === "Persona"));
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function PresetPanel() {
  const [presetNo, setPresetNo] = useState(1);
  const preset = PRESETS[presetNo - 1] ?? PRESETS[0];
  const [values, setValues] = useState<Record<TuningArea, number>>({ ...DEFAULTS });
  const [job, setJob] = useState("");
  const [profile, setProfile] = useState("");
  const [drafts, setDrafts] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [run, setRun] = useState<RunState>(() => freshRun(0));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [adapter] = useState<Adapter>(() => createDemoAdapter(() => inputRef.current));
  const inputRef = useRef<PanelInput>({ job: "", profile: "", drafts: "", tuning: {} });

  const tuning = useMemo(() => {
    const active: PanelInput["tuning"] = {};
    for (const area of AREAS) {
      if (enabled(preset, area)) active[area] = AXES[area][values[area] - 1];
    }
    return active;
  }, [preset, values]);

  inputRef.current = { job, profile, drafts, tuning };

  useEffect(() => {
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

  function resetFor(next: Preset) {
    setRun(freshRun(next.steps));
    setResponse("");
    setMessage("");
    setBusy(false);
  }

  function pushLog(line: string) {
    setLog((prev) => [...prev.slice(-24), line]);
  }

  function onEvent(event: PanelEvent) {
    pushLog(event.kind === "control" ? event.message : `OUTPUT step=${event.step ?? "solo"}`);
    setRun((current) => applyEvent(current, preset, event));
  }

  async function submit(messages: string[], start: boolean) {
    setBusy(true);
    setMessage("");
    setRun((current) => ({ ...current, status: "Running" }));
    try {
      if (start) await adapter.start({ preset, messages, onEvent });
      else await adapter.resume({ messages, onEvent });
      setRun((current) => {
        if (!current.pending && !current.finished) {
          return { ...current, status: "Blocked" };
        }
        return current;
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : "Connection failed.";
      setRun((current) => ({ ...current, status: "Blocked" }));
      setMessage(text);
    } finally {
      setBusy(false);
    }
  }

  async function continueRun(changes: boolean) {
    if (!run.pending) return;
    const text = response.trim();
    if ((changes || run.pending.digit !== "4") && !text) {
      setMessage("Provide the requested information or changes first.");
      return;
    }
    const messages: string[] = [];
    if (text) {
      const item = run.pending.item || (changes ? "changes" : "review");
      messages.push(`DATA item=${item}: ${text}`);
    }
    messages.push(`CONTINUE step=${run.pending.step}`);
    messages.forEach(pushLog);
    setRun((current) => ({ ...current, pending: null }));
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
  const tuningNote =
    preset.tuning === "none"
      ? "This preset does not use tuning."
      : preset.tuning === "all"
        ? "All five tuning areas are active."
        : "Only Specificity and Persona are active.";
  const stepNote =
    preset.level === 4
      ? "Seven-step configuration and review positions must be supplied by the backend."
      : preset.level === 2
        ? "This preset requires review of step 1."
        : preset.level === 1
          ? "Solo presets have no numbered steps."
          : "Three-step chain, without a configured review stop.";

  const runLabel = run.pending ? "Continue" : busy ? "Running" : run.finished ? "Run again" : "Run preset";
  const resolved = run.digits.filter((d) => d === "5" || d === "6").length;

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-forest text-sm font-semibold text-on-forest">
              P
            </span>
            <div>
              <p className="font-display text-xl leading-none tracking-tight text-ink">Preset Panel</p>
              <p className="mt-1 text-xs text-muted">Career system · spec v1.0</p>
            </div>
          </div>
          <p className="rounded-full bg-paper px-3 py-2 text-xs font-medium text-forest-deep" role="status">
            {run.status}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="font-display text-4xl tracking-tight text-ink">Your experience. The right words.</h1>
        <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
          Choose a preset, set the tuning, and stay in control of every stop.
        </p>

        <div className="mt-6 rounded-xl border border-amber/30 bg-amber-bg px-4 py-3 text-sm leading-relaxed text-amber">
          Live model is not connected. Runs below walk the protocol with labeled mock output.
          Nothing here is a finished letter, resume, or score.
        </div>

        {run.pending && (
          <section className="mt-4 rounded-xl border border-amber/40 bg-card p-5">
            <h2 className="font-display text-2xl text-ink">
              {run.pending.digit === "4"
                ? `Step ${run.pending.step} needs your review`
                : run.pending.digit === "3"
                  ? "Run blocked"
                  : "More information needed"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stopReason(run.pending)}</p>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              aria-label="Review changes or requested data"
              placeholder="Add requested information or describe your changes…"
              className="mt-4 min-h-24 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm leading-relaxed text-ink outline-none focus-visible:ring-2 focus-visible:ring-forest"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {run.pending.digit === "4" && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void continueRun(false)}
                  className="rounded-lg bg-forest px-4 py-3 text-sm font-medium text-on-forest disabled:opacity-45"
                >
                  Approve and continue
                </button>
              )}
              <button
                type="button"
                disabled={busy}
                onClick={() => void continueRun(true)}
                className="rounded-lg border border-line bg-card px-4 py-3 text-sm font-medium text-forest-deep disabled:opacity-45"
              >
                Send changes
              </button>
            </div>
          </section>
        )}

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <section className="rounded-2xl border border-line bg-card p-5">
              <h2 className="text-xs font-semibold tracking-wide text-muted">01 · Choose a preset</h2>
              <label className="mt-3 block text-sm font-medium" htmlFor="preset">
                Preset
              </label>
              <select
                id="preset"
                value={preset.number}
                disabled={locked}
                onChange={(e) => {
                  const next = PRESETS[Number(e.target.value) - 1];
                  setPresetNo(next.number);
                  resetFor(next);
                  setLog([]);
                }}
                className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                {GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {PRESETS.filter((p) => p.number >= group.start && p.number <= group.end).map((p) => (
                      <option key={p.number} value={p.number}>
                        {pad(p.number)} · {p.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Level {preset.level} · {LEVELS[preset.level]} ·{" "}
                {preset.steps === 0 ? "No numbered steps" : `${preset.steps} step${preset.steps === 1 ? "" : "s"}`}
              </p>

              <div className="my-5 h-px bg-line" />

              <h2 className="text-xs font-semibold tracking-wide text-muted">02 · Tune your approach</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {AREAS.map((area) => {
                  const on = enabled(preset, area);
                  const word = AXES[area][values[area] - 1];
                  return (
                    <div key={area} className={on ? "" : "opacity-35"}>
                      <label htmlFor={`range-${area}`} className="block text-center text-xs font-medium">
                        {area}
                      </label>
                      <div className="mx-auto mt-2 grid size-12 place-items-center rounded-full border-4 border-moss-bg bg-card">
                        <span
                          className="block h-3 w-0.5 origin-bottom rounded-full bg-forest"
                          style={{ transform: `rotate(${(values[area] - 3) * 56}deg) translateY(-4px)` }}
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id={`range-${area}`}
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={values[area]}
                        disabled={locked || !on}
                        aria-valuetext={word}
                        onChange={(e) =>
                          setValues((current) => ({ ...current, [area]: Number(e.target.value) }))
                        }
                        className="mt-2 w-full accent-forest"
                      />
                      <p className="mt-1 min-h-10 text-center text-xs leading-snug text-muted">{word}</p>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs leading-relaxed text-muted">{tuningNote}</p>

              <div className="my-5 h-px bg-line" />

              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xs font-semibold tracking-wide text-muted">03 · Add the job posting</h2>
                <span className="text-xs text-muted">{profileLabel}</span>
              </div>
              <textarea
                value={job}
                disabled={locked}
                onChange={(e) => setJob(e.target.value)}
                aria-label="Job posting"
                placeholder="Paste the job posting here…"
                className="mt-3 min-h-40 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm leading-relaxed text-ink outline-none focus-visible:ring-2 focus-visible:ring-forest"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-muted">
                <span>Only verified facts. No invented experience.</span>
                <span>{job.length} characters</span>
              </div>
              <button
                type="button"
                onClick={() => void handleRun()}
                disabled={busy}
                className="mt-4 w-full rounded-lg bg-forest px-4 py-3.5 text-sm font-medium text-on-forest disabled:opacity-45"
              >
                {runLabel}
              </button>
              {message && (
                <p className="mt-3 text-sm leading-relaxed text-rose" role="alert">
                  {message}
                </p>
              )}
            </section>

            <details className="rounded-2xl border border-line bg-card p-5">
              <summary className="cursor-pointer text-sm font-semibold">Your profile and supporting drafts</summary>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Optional saving stores your profile in this browser only. Saving does not send it to a model.
              </p>
              <label htmlFor="profile" className="mt-4 block text-sm font-medium">
                Profile facts
              </label>
              <textarea
                id="profile"
                value={profile}
                onChange={(e) => {
                  setProfile(e.target.value);
                  setProfileSaved(false);
                }}
                placeholder="Your verified experience, education, skills, and results…"
                className="mt-2 min-h-28 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-forest"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveProfile}
                  className="rounded-lg border border-line px-3 py-2.5 text-sm font-medium"
                >
                  Save in this browser
                </button>
                <button
                  type="button"
                  onClick={clearProfile}
                  className="rounded-lg border border-line px-3 py-2.5 text-sm font-medium"
                >
                  Clear saved profile
                </button>
              </div>
              <label htmlFor="drafts" className="mt-4 block text-sm font-medium">
                Resume, cover letter, or other input
              </label>
              <textarea
                id="drafts"
                value={drafts}
                onChange={(e) => setDrafts(e.target.value)}
                placeholder="Add drafts needed by review or trimming presets…"
                className="mt-2 min-h-24 w-full rounded-lg border border-line bg-paper px-3 py-3 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-forest"
              />
            </details>
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-line bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold">Progress</h2>
                <span className="text-xs text-muted">
                  {run.digits.length
                    ? `${resolved} of ${run.digits.length} resolved`
                    : run.finished
                      ? "Complete"
                      : "Single action"}
                </span>
              </div>
              {run.digits.length === 0 ? (
                <p className="mt-4 rounded-lg bg-paper px-3 py-6 text-center text-sm text-muted">
                  Solo presets have no step track.
                </p>
              ) : (
                <div className="mt-4 flex gap-2">
                  {run.digits.map((digit, index) => {
                    const tone =
                      digit === "5"
                        ? "bg-moss-bg text-forest"
                        : digit === "3"
                          ? "bg-rose-bg text-rose"
                          : digit === "1" || digit === "4"
                            ? "bg-amber-bg text-amber"
                            : "bg-paper text-muted";
                    return (
                      <button
                        key={index}
                        type="button"
                        title={`Step ${index + 1}: ${digitLabel(digit)}`}
                        onClick={() => {
                          const text = run.outputs[index + 1] ?? "";
                          setRun((current) => ({
                            ...current,
                            outputText: text,
                            outputTitle: `Step ${index + 1} output`,
                          }));
                        }}
                        className={`grid h-12 min-w-0 flex-1 place-items-center rounded-lg text-sm font-semibold ${tone}`}
                      >
                        {digit === "5" ? <Check className="size-4" /> : digit === "6" ? <Minus className="size-4" /> : index + 1}
                      </button>
                    );
                  })}
                </div>
              )}
              <p className="mt-3 text-xs leading-relaxed text-muted">{stepNote}</p>
            </section>

            <section className="rounded-2xl border border-line bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold">{run.outputTitle}</h2>
                <button
                  type="button"
                  disabled={!run.outputText}
                  onClick={() => void copyOutput()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium disabled:opacity-45"
                >
                  <Copy className="size-3.5" />
                  Copy
                </button>
              </div>
              {run.outputText ? (
                <pre className="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-xl bg-paper p-4 font-sans text-sm leading-relaxed text-ink">
                  {run.outputText}
                </pre>
              ) : (
                <div className="mt-4 grid min-h-64 place-items-center rounded-xl bg-paper px-6 text-center text-sm text-muted">
                  Output appears here after a run. Mock lines are labeled so they cannot be mistaken for a model result.
                </div>
              )}
            </section>

            <details className="rounded-2xl border border-line bg-card p-5">
              <summary className="cursor-pointer text-sm font-semibold">Protocol log</summary>
              <ul className="mt-3 space-y-1 font-mono text-xs leading-relaxed text-muted">
                {log.length === 0 && <li>No messages yet.</li>}
                {log.map((line, i) => (
                  <li key={`${i}-${line}`}>{line}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Control lines this panel accepts: STATUS, NEED, STOP, COMPLETE. Content is a separate output event,
                never mixed into a control line. Package Plan stays blocked until the seven step files and review
                positions are supplied. A prompt cannot guarantee facts stay inside the profile — that check is not
                built here.
              </p>
            </details>
          </div>
        </div>
      </main>
    </div>
  );
}
