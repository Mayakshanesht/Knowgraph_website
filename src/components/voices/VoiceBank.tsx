/**
 * The narrator voice bank, as an operator sees it.
 *
 * Chatterbox has ONE built-in voice and takes no speaker argument — it clones
 * whatever reference clip it is given. So the bank is not a setting, it is the
 * feature: every voice a reel can speak in is a wav sitting in it.
 *
 * On Admin rather than anywhere a learner can reach, deliberately. A voice is
 * biometric data, and /privacy promises we never record a learner nor accept
 * one from them. An operator uploading a clip they have the right to use is a
 * different act, and it belongs behind the operator token.
 */
import { useCallback, useEffect, useRef, useState } from "react";

const API = "https://knowgraph-api.greenlifeai.workers.dev";

type Voice = {
  name: string;
  bytes: number;
  gender?: string | null;
  accent?: string | null;
  label?: string | null;
};

/** The same rule the Worker enforces, so the error arrives before the upload. */
const NAME_OK = /^[a-z][a-z0-9_]{1,40}(\.[a-z]{2})?$/;

/** Kept in localStorage, like the app's admin screen. It is an operator
 *  secret, so it is typed once per browser and never put in a URL where it
 *  would land in history and server logs. */
const TOKEN_KEY = "kg.operator.token";

export function VoiceBank() {
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) ?? "",
  );
  const [voices, setVoices] = useState<Voice[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("female");
  const [accent, setAccent] = useState("en-IN");
  const [label, setLabel] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(() => {
    if (!token) return;
    fetch(`${API}/v1/admin/voices`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`)))
      .then((d) => setVoices(d.voices ?? []))
      .catch((e) => setErr(String(e)));
  }, [token]);

  useEffect(load, [load]);

  async function upload() {
    setErr(null);
    const file = fileRef.current?.files?.[0];
    if (!file) return setErr("Choose an audio clip first.");
    if (!NAME_OK.test(name)) {
      return setErr(
        "Name: lowercase letters, digits and underscores — e.g. narrator_indian_f",
      );
    }
    // 10-20 seconds is what the model wants: much less and the clone is thin,
    // much more and nothing improves.
    if (file.size < 8 * 1024) return setErr("That clip is too short — aim for 15 seconds.");
    if (file.size > 8 * 1024 * 1024) return setErr("Keep it under 8MB.");

    setBusy(true);
    try {
      const q = new URLSearchParams({ gender, accent, label: label || name });
      const r = await fetch(`${API}/v1/admin/voices/${name}?${q}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": file.type || "audio/wav",
        },
        body: file,
      });
      const body = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(body.error ?? `HTTP ${r.status}`);
      setName("");
      setLabel("");
      if (fileRef.current) fileRef.current.value = "";
      load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function remove(v: string) {
    if (!confirm(`Delete the voice "${v}"? Reels already made keep their audio.`)) return;
    await fetch(`${API}/v1/admin/voices/${v}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  }

  if (!token) {
    return (
      <section className="p-6 rounded-2xl bg-card border border-border">
        <h2 className="text-xl font-heading font-semibold mb-1">Narrator voices</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Paste the operator token to manage the voice bank. It stays in this
          browser.
        </p>
        <input
          type="password"
          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm"
          placeholder="operator token"
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            const v = (e.target as HTMLInputElement).value.trim();
            if (!v) return;
            localStorage.setItem(TOKEN_KEY, v);
            setToken(v);
          }}
        />
      </section>
    );
  }

  return (
    <section className="p-6 rounded-2xl bg-card border border-border">
      <h2 className="text-xl font-heading font-semibold mb-1">Narrator voices</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Upload 10–20 seconds of clean speech. Reels clone it, so the accent and
        character of the clip is what learners hear. Only upload a voice you
        have the right to use.
      </p>

      <div className="grid gap-3 md:grid-cols-2 mb-3">
        <label className="text-sm">
          <span className="block mb-1 text-muted-foreground">Name</span>
          <input
            className="w-full px-3 py-2 rounded-lg bg-background border border-border"
            placeholder="narrator_indian_f"
            value={name}
            onChange={(e) => setName(e.target.value.trim().toLowerCase())}
          />
        </label>
        <label className="text-sm">
          <span className="block mb-1 text-muted-foreground">Shown as</span>
          <input
            className="w-full px-3 py-2 rounded-lg bg-background border border-border"
            placeholder="Indian English, warm"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </label>
        <label className="text-sm">
          <span className="block mb-1 text-muted-foreground">Voice</span>
          <select
            className="w-full px-3 py-2 rounded-lg bg-background border border-border"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="neutral">Neutral</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="block mb-1 text-muted-foreground">Accent</span>
          <input
            className="w-full px-3 py-2 rounded-lg bg-background border border-border"
            placeholder="en-IN"
            value={accent}
            onChange={(e) => setAccent(e.target.value.trim())}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input ref={fileRef} type="file" accept="audio/*" className="text-sm" />
        <button
          onClick={upload}
          disabled={busy}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-50"
        >
          {busy ? "Uploading…" : "Add voice"}
        </button>
      </div>
      {err && <p className="text-sm text-destructive mt-3">{err}</p>}

      <ul className="mt-5 space-y-2">
        {voices.map((v) => (
          <li
            key={v.name}
            className="flex items-center justify-between gap-3 text-sm border-t border-border pt-2"
          >
            <span>
              <b>{v.label || v.name}</b>{" "}
              <span className="text-muted-foreground">
                {v.name} · {v.gender ?? "unknown"}
                {v.accent ? ` · ${v.accent}` : ""} · {Math.round(v.bytes / 1024)} KB
              </span>
            </span>
            <button onClick={() => remove(v.name)} className="text-destructive text-xs">
              Delete
            </button>
          </li>
        ))}
        {voices.length === 0 && (
          <li className="text-sm text-muted-foreground">
            Nothing uploaded here yet — reels use the bank shipped with the renderer.
          </li>
        )}
      </ul>
    </section>
  );
}
