/**
 * Everything an institution needs to run a course on their own LMS.
 *
 * Two shapes, because LMSs accept two shapes and neither replaces the other:
 *
 *   SCORM  a file they upload. Works everywhere, needs nobody's help, and
 *          reports completion back into their gradebook. This is what most
 *          corporate buyers actually mean when they say "can we host it".
 *   LTI    a live launch from inside their LMS. Better — the student never
 *          leaves, identity travels with the launch — but it requires a
 *          mutual registration, so it is a conversation, not a download.
 *
 * The registration values below are the ones an LMS admin pastes into their
 * side. Showing them here rather than mailing them is deliberate: every
 * support thread about LTI starts with someone having the wrong URL.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Link2, Check, Copy } from "lucide-react";

const API = "https://knowgraph-api.greenlifeai.workers.dev";

function CopyRow({ label, value }: { label: string; value: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="flex items-center gap-2 py-1.5">
      <span className="text-xs text-muted-foreground w-40 shrink-0">{label}</span>
      <code className="text-xs bg-muted px-2 py-1 rounded flex-1 overflow-x-auto whitespace-nowrap">
        {value}
      </code>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        }}
        aria-label={`Copy ${label}`}
      >
        {done ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );
}

export function Distribute({
  courseId,
  courseTitle,
  sessionToken,
}: {
  courseId: string;
  courseTitle?: string;
  sessionToken?: string | null;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // The download is authorised, so it cannot be a plain <a href>: the browser
  // would send no Authorization header and the endpoint would answer 401.
  async function downloadScorm() {
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch(`${API}/v1/courses/${encodeURIComponent(courseId)}/scorm`, {
        headers: sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {},
      });
      if (!r.ok) {
        setErr(
          r.status === 404
            ? "No package yet — it is built the next time this course syncs."
            : r.status === 403
              ? "Enrol in this course to export it."
              : `Export failed (${r.status}).`,
        );
        return;
      }
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${courseId}-scorm12.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setErr("Export failed — check your connection.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5">
      <div>
        <h3 className="font-semibold text-foreground">Distribute</h3>
        <p className="text-sm text-muted-foreground">
          Run {courseTitle ? `“${courseTitle}”` : "this course"} on your own LMS.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Download className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">SCORM 1.2 package</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Upload to Moodle, Canvas, Blackboard, Cornerstone, Docebo or
          SuccessFactors. Chapters report completion and quiz scores to your
          gradebook. Video streams from our CDN, so the file stays small.
        </p>
        <Button onClick={downloadScorm} disabled={busy} size="sm">
          {busy ? "Preparing…" : "Download SCORM"}
        </Button>
        {err && <p className="text-xs text-destructive">{err}</p>}
      </div>

      <div className="space-y-2 pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">LTI 1.3 launch</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Give these to your LMS administrator. LTI needs a registration on
          both sides, so send us your platform’s issuer and keyset URL and we
          will enable the launch.
        </p>
        <div className="rounded-lg bg-muted/40 p-2">
          <CopyRow label="Login / initiation URL" value={`${API}/lti/login`} />
          <CopyRow label="Redirect / launch URL" value={`${API}/lti/launch`} />
          <CopyRow label="Public keyset (JWKS)" value={`${API}/lti/jwks`} />
          <CopyRow label="Custom parameter" value={`course_id=${courseId}`} />
        </div>
      </div>
    </div>
  );
}
