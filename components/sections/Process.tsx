const steps = [
  {
    tag: "Find",
    title: "Discover",
    body: "We map what's actually eating your team's time this week, and which of it is worth automating.",
  },
  {
    tag: "Design",
    title: "Design",
    body: "A system built around the tools you already use, not a rebuild of how you work.",
  },
  {
    tag: "Build",
    title: "Build & test",
    body: "We build it, run it against real cases, and refine before it touches live operations.",
  },
  {
    tag: "Run",
    title: "Run & maintain",
    body: "We host and monitor it. You get the output, not the upkeep.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-b border-line px-8 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-soft">
          How we work
        </p>

        <h2 className="mt-6 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
          From manual task to running system.
        </h2>

        <p className="mt-5 max-w-xl text-mute">
          Short and direct, built for businesses that want the result without
          managing a build.
        </p>

        <ol className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-paper p-7">
              <span className="font-mono text-4xl tabular-nums text-accent/25">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-mute-soft">
                {step.tag}
              </p>

              <h3 className="mt-2 text-lg font-medium tracking-tight">
                {step.title}
              </h3>

              <p className="mt-3 text-[15px] leading-relaxed text-mute">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}