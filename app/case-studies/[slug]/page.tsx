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
    alternates: {
      canonical: `/case-studies/${study.slug}`,
    },
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
      <section className="bg-ink px-8 pb-16 pt-40 text-paper">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <div>
              <span className="inline-block rounded-sm border border-paper/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60">
                {study.industry}
              </span>

              <h1 className="mt-7 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
                {study.title}
              </h1>
            </div>

            <p className="text-[15px] leading-relaxed text-paper/60">
              {study.premise}
            </p>
          </div>

          <dl className="mt-20 grid grid-cols-1 border-t border-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { term: "Trigger", value: study.glance.trigger },
              { term: "Run mode", value: study.glance.runMode },
              { term: "Built with", value: study.glance.stack.join(" · ") },
              { term: "Connected to", value: study.glance.integrations.join(" · ") },
            ].map((entry) => (
              <div
                key={entry.term}
                className="border-b border-paper/15 py-6 pr-6 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {entry.term}
                </dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-paper/75">
                  {entry.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-line px-8 py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-soft">
              01 / Problem
            </p>

            <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">
              What the manual version cost
            </h2>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mute">
              Before the system existed, this all ran on someone&apos;s
              attention.
            </p>
          </div>

          <ul className="space-y-px bg-line">
            {study.problem.map((item, index) => (
              <li
                key={item}
                className="flex gap-6 bg-paper py-7 pl-1 pr-2 first:pt-0"
              >
                <span className="mt-1 shrink-0 font-mono text-2xl tabular-nums text-ink/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[16px] leading-relaxed text-mute">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink-soft py-28 text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
              02 / Solution
            </p>

            <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">
              What we built instead
            </h2>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-paper/50">
              Each decision below is a deliberate one — the interesting part is
              usually where the system refuses to guess.
            </p>
          </div>

          <ul className="space-y-px">
            {study.solution.map((item, index) => (
              <li key={item} className="flex gap-6 py-7 first:pt-0">
                <span className="mt-1 shrink-0 font-mono text-2xl tabular-nums text-paper/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[16px] leading-relaxed text-paper/70">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-24 max-w-6xl space-y-20 px-8">
          {study.diagrams.map((diagram) => (
            <div key={diagram.title ?? diagram.nodes[0].id}>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                {diagram.title && (
                  <h3 className="text-xl font-medium tracking-tight">
                    {diagram.title}
                  </h3>
                )}

                {diagram.caption && (
                  <p className="max-w-md text-sm leading-relaxed text-paper/50 md:text-right">
                    {diagram.caption}
                  </p>
                )}
              </div>

              <div className="mt-8">
                <WorkflowCanvas diagram={diagram} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-accent px-8 py-28 text-ink">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
                03 / Result
              </p>

              <h2 className="mt-5 max-w-xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
                What the system guarantees
              </h2>
            </div>

            <p className="max-w-xs text-[15px] leading-relaxed text-paper md:text-right">
              Not projections. These hold because of how the system is built.
            </p>
          </div>

          <ul className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
            {study.result.map((item, index) => (
              <li
                key={item}
                className="relative overflow-hidden rounded-xl bg-paper p-7"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-3 right-4 font-mono text-[64px] leading-none tabular-nums text-ink/5"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="relative text-[15px] leading-relaxed text-ink/80">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {showNext && (
        <section className="bg-ink text-paper">
          <Link
            href={`/case-studies/${next.slug}`}
            className="group block px-8 py-20 transition-colors hover:bg-ink-soft"
          >
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                Next case study
              </p>

              <div>
                <h2 className="max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
                  {next.title}
                </h2>

                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">
                  {next.service}
                </p>
              </div>

              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-paper/25 text-lg transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                →
              </span>
            </div>
          </Link>
        </section>
      )}
    </main>
  );
}