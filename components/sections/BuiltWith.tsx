import {
  siAirtable,
  siCalendly,
  siClaude,
  siClickup,
  siGmail,
  siGooglegemini,
  siGooglesheets,
  siHubspot,
  siMake,
  siN8n,
  siNotion,
  siZapier,
} from "simple-icons";

type Tool = {
  name: string;
  icon?: { path: string; hex: string };
};

const tools: Tool[] = [
  { name: "n8n", icon: siN8n },
  { name: "Make", icon: siMake },
  { name: "Zapier", icon: siZapier },
  { name: "Gemini", icon: siGooglegemini },
  { name: "Claude", icon: siClaude },
  { name: "OpenAI" },
  { name: "HubSpot", icon: siHubspot },
  { name: "Airtable", icon: siAirtable },
  { name: "Google Sheets", icon: siGooglesheets },
  { name: "Gmail", icon: siGmail },
  { name: "Slack" },
  { name: "Notion", icon: siNotion },
  { name: "ClickUp", icon: siClickup },
  { name: "Calendly", icon: siCalendly },
  { name: "HighLevel" },
];

export function BuiltWith() {
  return (
    <section className="border-b border-line px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-soft">
          Platforms
        </p>

        <h2 className="mt-6 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
          We build on the tools your business already runs on.
        </h2>

        <ul className="mt-12 grid grid-cols-3 gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-5">
          {tools.map((tool) => (
            <li
              key={tool.name}
              style={
                tool.icon
                  ? ({ "--brand": `#${tool.icon.hex}` } as React.CSSProperties)
                  : undefined
              }
              className="flex h-28 flex-col items-center justify-center gap-3 bg-paper px-3 text-mute transition-colors hover:text-[var(--brand,var(--color-ink))]"
            >
              {tool.icon ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7"
                  role="img"
                  aria-label={tool.name}
                >
                  <path d={tool.icon.path} />
                </svg>
              ) : (
                <span className="text-lg font-medium tracking-tight text-ink">
                  {tool.name}
                </span>
              )}

              <span className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-mute-soft">
                {tool.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}