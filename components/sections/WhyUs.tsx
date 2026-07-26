import { Reveal, RevealList, RevealItem } from "@/components/ui/Reveal";

const rows = [
  {
    label: "Who you talk to",
    agency: "An account manager, relaying questions to the build team.",
    us: "The people building it. No relay, no translation loss.",
  },
  {
    label: "What the fee covers",
    agency: "Office space, a bench to keep busy, layers of management.",
    us: "The build. That's the whole cost structure.",
  },
  {
    label: "Time to a working system",
    agency: "Discovery phases and sign-offs before a start date.",
    us: "1–2 weeks to something running against your real cases.",
  },
  {
    label: "After launch",
    agency: "Handover, then a separate support agreement.",
    us: "We host it, monitor it, and stay reachable.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="bg-ink px-8 py-28 text-paper">
      <div className="mx-auto max-w-6xl">
        <Reveal
          variant="blur"
          duration={0.7}
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Why us
            </p>

            <h2 className="mt-6 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              The same build quality, without the agency overhead.
            </h2>
          </div>

          <div className="max-w-sm space-y-4 text-[15px] leading-relaxed text-paper/55">
            <p>
              Operating from the Philippines allows us to keep our overhead
              lower than agencies in the US, UK, or Australia. Those savings are
              reflected in our pricing, never in the quality of our work.
            </p>
            <p>
              We work across your business hours, communicate clearly, and
              provide ongoing support long after your system goes live.
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-16 overflow-hidden rounded-xl border border-paper/10 bg-ink-soft"
        >
          <div className="hidden md:grid md:grid-cols-[0.85fr_1fr_1fr]">
            <div className="border-b border-paper/10 px-7 py-5" />

            <div className="border-b border-l border-paper/10 px-7 py-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
                Typical agency
              </span>
            </div>

            <div className="border-b border-l border-paper/10 bg-accent/10 px-7 py-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                DM Workflows
              </span>
            </div>
          </div>

          <RevealList stagger={0.1} delay={0.2}>
            {rows.map((row) => (
              <RevealItem
                key={row.label}
                variant="right"
                duration={0.55}
                className="border-b border-paper/10 last:border-b-0 md:grid md:grid-cols-[0.85fr_1fr_1fr]"
              >
                <div className="px-7 pt-6 md:py-7">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
                    {row.label}
                  </span>
                </div>

                <div className="px-7 pt-4 md:border-l md:border-paper/10 md:py-7 md:pt-7">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-paper/30 md:hidden">
                    Typical agency
                  </span>
                  <p className="text-[15px] leading-relaxed text-paper/35 line-through decoration-paper/25 decoration-1">
                    {row.agency}
                  </p>
                </div>

                <div className="mt-4 bg-accent/10 px-7 py-6 md:mt-0 md:border-l md:border-paper/10 md:py-7">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-accent md:hidden">
                    DM Workflows
                  </span>
                  <p className="text-[15px] leading-relaxed text-paper">
                    {row.us}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealList>
        </Reveal>
      </div>
    </section>
  );
}