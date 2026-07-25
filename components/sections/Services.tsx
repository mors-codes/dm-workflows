import Link from "next/link";
import { caseStudies } from "@/content/case-studies";

const spans = [
  "sm:col-span-2 lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function Services() {
  return (
    <section id="services" className="bg-accent px-8 py-28 text-ink">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
              What we build
            </p>

            <h2 className="mt-6 max-w-xl text-3xl font-medium tracking-tight text-paper sm:text-4xl lg:text-5xl">
              Systems for the work that doesn&apos;t stop.
            </h2>
          </div>

          <p className="max-w-xs text-[15px] leading-relaxed text-paper md:text-right">
            Every one of these started as a repetitive task someone was doing by
            hand. Each links to the system we built for it.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {caseStudies.map((study, index) => {
            const feature = index === 0;

            return (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-7 transition-colors ${spans[index]} ${
                  feature
                    ? "min-h-[280px] border-transparent bg-ink text-paper hover:bg-ink-soft"
                    : "min-h-[240px] border-transparent bg-paper hover:bg-paper-dim"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -top-3 right-4 font-mono text-[80px] leading-none tabular-nums ${
                    feature ? "text-paper/8" : "text-ink/6"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <span
                    className={`inline-block rounded-sm border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] ${
                      feature
                        ? "border-paper/25 text-paper/55"
                        : "border-line text-mute-soft"
                    }`}
                  >
                    {study.industry}
                  </span>

                  <h3
                    className={`mt-6 font-medium tracking-tight ${
                      feature ? "text-3xl sm:text-4xl" : "text-xl"
                    }`}
                  >
                    {study.service}
                  </h3>

                  <p
                    className={`mt-3 text-[15px] leading-relaxed ${
                      feature ? "max-w-md text-paper/65" : "text-mute"
                    }`}
                  >
                    {study.serviceSummary}
                  </p>
                </div>

                <span
                  className={`relative mt-8 inline-flex w-fit items-center gap-2 rounded-sm px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition-colors ${
                    feature
                      ? "bg-paper text-ink group-hover:bg-accent group-hover:text-paper"
                      : "bg-ink text-paper group-hover:bg-accent-deep"
                  }`}
                >
                  View the build
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}