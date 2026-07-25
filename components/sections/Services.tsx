import Link from "next/link";
import { caseStudies } from "@/content/case-studies";

export function Services() {
  return (
    <section id="services" className="border-b border-line px-8 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-soft">
          What we build
        </p>

        <h2 className="mt-6 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
          Systems for the work that doesn&apos;t stop.
        </h2>

        <p className="mt-5 max-w-xl text-mute">
          Every one of these started as a repetitive task someone was doing by
          hand. Each links to the system we built for it.
        </p>

        <ul className="mt-16 border-t border-line">
          {caseStudies.map((study, index) => (
            <li key={study.slug}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group grid grid-cols-1 items-start gap-6 border-b border-line py-8 transition-colors hover:bg-paper-dim md:grid-cols-12 md:gap-8"
              >
                <span className="font-mono text-[11px] tabular-nums text-accent md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="md:col-span-4">
                  <h3 className="text-xl font-medium tracking-tight">
                    {study.service}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mute-soft">
                    {study.industry}
                  </p>
                </div>

                <p className="text-[15px] leading-relaxed text-mute md:col-span-6">
                  {study.serviceSummary}
                </p>

                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent transition-transform group-hover:translate-x-1 md:col-span-1 md:justify-self-end">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}