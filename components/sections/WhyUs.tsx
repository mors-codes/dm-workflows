const points = [
  {
    stat: "Direct",
    label: "No account managers, no handoffs. You talk to whoever the question is for.",
  },
  {
    stat: "1–2 weeks",
    label: "From first call to a working system running against your real cases.",
  },
  {
    stat: "Ongoing",
    label: "We host and monitor what we build, rather than handing over a repo and leaving.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="border-b border-line bg-paper-dim px-8 py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-soft">
            Why us
          </p>

          <h2 className="mt-6 max-w-lg text-3xl font-medium tracking-tight sm:text-4xl">
            The same build quality, without the agency overhead.
          </h2>

          <div className="mt-6 max-w-lg space-y-4 text-mute">
            <p>
              We run lean out of the Philippines. No office to fill, no bench to
              keep busy, and no account management layer between you and the
              people building your system.
            </p>
            <p>
              That structure is the whole difference. What an agency spends on
              overhead, we spend on the build — and you deal directly with the
              people doing it, for as long as the system runs.
            </p>
          </div>
        </div>

        <dl className="border-t border-line">
          {points.map((point) => (
            <div key={point.stat} className="border-b border-line py-7">
              <dt className="text-2xl font-medium tracking-tight">
                {point.stat}
              </dt>
              <dd className="mt-2 max-w-sm text-[15px] leading-relaxed text-mute">
                {point.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}