/**
 * Every generated course, each with its Distribute panel.
 *
 * This lives on Admin rather than the public course pages for a reason that
 * took a wrong turn to find: /courses/:slug is driven by a hardcoded list of
 * LMS marketing courses (vehicle-control, autonomous-driving-adas...), while
 * the courses that HAVE SCORM packages are the generated ones
 * (cicd-foundations, computer-vision-generative-ai, physical-ai-robotics).
 * Putting the panel on the public page meant it rendered for courses that
 * cannot be exported and never for the ones that can.
 *
 * Handing a course to an institution is an operator action anyway — it comes
 * with a conversation about LTI registration — so Admin is where the person
 * doing it already is.
 */
import { useEffect, useState } from "react";
import { Distribute } from "./Distribute";

const API = "https://knowgraph-api.greenlifeai.workers.dev";

type Course = { id: string; title?: string };

export function DistributeSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/v1/courses`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        const list = Array.isArray(d) ? d : (d.courses ?? []);
        setCourses(list.map((c: Record<string, unknown>) => ({
          id: String(c.id ?? ""),
          title: c.title as string | undefined,
        })).filter((c: Course) => c.id));
      })
      .catch((e) => setErr(`Could not load courses (${e}).`));
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-heading font-semibold text-foreground mb-1">
        Distribute to an LMS
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        SCORM packages and LTI launch details for each published course.
      </p>
      {err && <p className="text-sm text-destructive">{err}</p>}
      {!err && courses.length === 0 && (
        <p className="text-sm text-muted-foreground">Loading courses…</p>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {courses.map((c) => (
          <Distribute key={c.id} courseId={c.id} courseTitle={c.title} />
        ))}
      </div>
    </div>
  );
}
