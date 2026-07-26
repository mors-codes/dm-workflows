import Link from "next/link";
import { HeroTerminal } from "./HeroTerminal";

export function Hero() {
  return (
    <section className="border-b border-line px-8 pb-24 pt-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p
            className="dm-rise font-mono text-[11px] uppercase tracking-[0.2em] text-mute-soft"
            style={{ animationDelay: "0.05s" }}
          >
            Operational automation
          </p>

          <h1
            className="dm-rise mt-8 text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl"
            style={{ animationDelay: "0.12s" }}
          >
            The manual work behind your business,
            <span className="text-accent"> handled.</span>
          </h1>

          <p
            className="dm-rise mt-8 max-w-xl text-[17px] leading-relaxed text-mute"
            style={{ animationDelay: "0.3s" }}
          >
            We build the backend systems that handle lead follow-up, CRM
            syncing, document processing, and the repetitive operational work
            eating your team&apos;s week. Not another chatbot pitch.
          </p>

          <div
            className="dm-rise mt-12 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              href="#contact"
              className="rounded-sm bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-accent"
            >
              Start a conversation
            </Link>

            <Link
              href="#services"
              className="group inline-flex items-center gap-2 rounded-sm border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:border-ink"
            >
              See what we build
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <HeroTerminal />
      </div>
    </section>
  );
}