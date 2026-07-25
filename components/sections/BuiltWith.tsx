"use client";

import { motion } from "motion/react";

type Platform = { name: string; src: string };

const platforms: Platform[] = [
  { name: "n8n", src: "/logos/n8n.svg" },
  { name: "Make", src: "/logos/make.svg" },
  { name: "Zapier", src: "/logos/zapier.svg" },
  { name: "Gemini", src: "/logos/gemini.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "OpenAI", src: "/logos/openai.svg" },
  { name: "HubSpot", src: "/logos/hubspot.svg" },
  { name: "Airtable", src: "/logos/airtable.svg" },
  { name: "Google Sheets", src: "/logos/google-sheets.svg" },
  { name: "Gmail", src: "/logos/gmail.svg" },
  { name: "Slack", src: "/logos/slack.svg" },
  { name: "Notion", src: "/logos/notion.svg" },
  { name: "ClickUp", src: "/logos/clickup.svg" },
  { name: "Calendly", src: "/logos/calendly.svg" },
  { name: "HighLevel", src: "/logos/gohighlevel.svg" },
];

export function BuiltWith() {
  return (
    <section className="bg-ink px-8 py-28 text-paper">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Platforms
            </p>

            <h2 className="mt-6 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
              We build on the tools your business already runs on.
            </h2>
          </div>

          <p className="max-w-xs text-[15px] leading-relaxed text-paper/55 md:text-right">
            No rebuild, no migration. Your systems stay where they are — we
            connect them.
          </p>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
          }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-paper/10 sm:grid-cols-3 lg:grid-cols-5"
        >
          {platforms.map((platform) => (
            <motion.li
              key={platform.name}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group relative flex h-32 flex-col items-center justify-center gap-4 bg-ink px-4 transition-colors duration-300 hover:bg-ink-soft"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={platform.src}
                alt={platform.name}
                className="h-8 w-auto max-w-[120px] object-contain opacity-85 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
              />

              <span className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40 transition-colors duration-300 group-hover:text-paper/70">
                {platform.name}
              </span>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}