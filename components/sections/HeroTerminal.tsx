const steps = [
  { label: "capture the input", tag: "trigger" },
  { label: "read & extract", tag: "AI" },
  { label: "check against rules", tag: "validation" },
  { label: "route the outcome", tag: "auto / review" },
  { label: "update your systems", tag: "action" },
];

export function HeroTerminal() {
  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-ink shadow-[0_28px_70px_-30px_rgba(23,22,26,0.5)]">
      <div className="flex items-center gap-3 border-b border-paper/10 bg-ink-soft px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ed6a5e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#61c554]" />
        </span>

        <span className="font-mono text-[11px] tracking-wide text-paper/40">
          workflow.run
        </span>
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <p
          className="dm-slide font-mono text-[11px] text-paper/35"
          style={{ animationDelay: "0.25s" }}
        >
          <span className="text-accent">$</span> something happens in your
          business
        </p>

        {steps.map((step, index) => (
          <div
            key={step.label}
            className="dm-slide flex items-baseline justify-between gap-4 font-mono text-[12px]"
            style={{ animationDelay: `${0.45 + index * 0.13}s` }}
          >
            <span className="flex items-baseline gap-3">
              <span className="tabular-nums text-accent/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-paper/85">{step.label}</span>
            </span>

            <span className="shrink-0 text-[10px] uppercase tracking-[0.12em] text-paper/30">
              {step.tag}
            </span>
          </div>
        ))}

        <p
          className="dm-slide flex items-center gap-2 border-t border-paper/10 pt-3 font-mono text-[11px] text-paper/50"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="text-accent">✓</span>
          done — logged, nothing retyped
          <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-accent" />
        </p>
      </div>
    </div>
  );
}