import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";
import {
  caseStudies,
  getCaseStudy,
  getNextCaseStudy,
} from "@/content/case-studies";

import { WorkflowCanvas } from "@/components/diagram/WorkflowCanvas";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return {};

  return {
    title: `${study.title} — DM Workflows`,
    description: study.premise,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const next = getNextCaseStudy(slug);
  const showNext = next && next.slug !== study.slug;

  return (
    <main>
      <div className="mx-auto max-w-3xl px-8 py-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
          {study.industry}
        </p>
        <h1 className="mt-6 text-4xl font-medium tracking-tight">
          {study.title}
        </h1>
        <p className="mt-4 text-mute">{study.premise}</p>
        <dl className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          <div className="bg-paper px-5 py-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-soft">
              Trigger
            </dt>
            <dd className="mt-1.5 text-sm">{study.glance.trigger}</dd>
          </div>

          <div className="bg-paper px-5 py-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-soft">
              Run mode
            </dt>
            <dd className="mt-1.5 text-sm">{study.glance.runMode}</dd>
          </div>

          <div className="bg-paper px-5 py-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-soft">
              Built with
            </dt>
            <dd className="mt-1.5 text-sm">{study.glance.stack.join(" · ")}</dd>
          </div>

          <div className="bg-paper px-5 py-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-soft">
              Connected to
            </dt>
            <dd className="mt-1.5 text-sm">
              {study.glance.integrations.join(" · ")}
            </dd>
          </div>
        </dl>
      </div>

      <section className="mx-auto max-w-3xl px-8 pb-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute-soft">
          01 / Problem
        </p>

        <h2 className="mt-5 text-2xl font-medium tracking-tight">
          What the manual version cost
        </h2>

        <ul className="mt-8 border-t border-line">
          {study.problem.map((item, index) => (
            <li
              key={item}
              className="flex gap-5 border-b border-line py-5"
            >
              <span className="mt-0.5 shrink-0 font-mono text-[11px] tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[15px] leading-relaxed text-mute">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink-soft py-28 text-paper">
        <div className="mx-auto max-w-3xl px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
            02 / Solution
          </p>

          <h2 className="mt-5 text-2xl font-medium tracking-tight">
            What we built instead
          </h2>

          <ul className="mt-8 border-t border-paper/12">
            {study.solution.map((item, index) => (
              <li
                key={item}
                className="flex gap-5 border-b border-paper/12 py-5"
              >
                <span className="mt-0.5 shrink-0 font-mono text-[11px] tabular-nums text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed text-paper/70">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-20 max-w-6xl space-y-16 px-8">
          {study.diagrams.map((diagram) => (
            <div key={diagram.title ?? diagram.nodes[0].id}>
              {diagram.title && (
                <h3 className="text-lg font-medium tracking-tight">
                  {diagram.title}
                </h3>
              )}

              {diagram.caption && (
                <p className="mt-2 max-w-xl text-sm text-paper/50">
                  {diagram.caption}
                </p>
              )}

              <div className="mt-8">
                <WorkflowCanvas diagram={diagram} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-8 py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute-soft">
          03 / Result
        </p>

        <h2 className="mt-5 text-2xl font-medium tracking-tight">
          What the system guarantees
        </h2>

        <ul className="mt-8 border-t border-line">
          {study.result.map((item, index) => (
            <li key={item} className="flex gap-5 border-b border-line py-5">
              <span className="mt-0.5 shrink-0 font-mono text-[11px] tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[15px] leading-relaxed text-mute">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      {showNext && (
        <section className="border-t border-line">
          <Link
            href={`/case-studies/${next.slug}`}
            className="group block px-8 py-16 transition-colors hover:bg-paper-dim"
          >
            <div className="mx-auto max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-soft">
                Next case study
              </p>

              <h2 className="mt-4 max-w-2xl text-2xl font-medium tracking-tight">
                {next.title}
              </h2>

              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {next.service}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        </section>
      )}
    </main>
  );
}