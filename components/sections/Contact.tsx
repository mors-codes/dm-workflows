"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-sm border border-paper/15 bg-paper/5 px-4 py-3 text-[15px] text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-accent focus:bg-paper/10";

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-8 py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-soft">
            Let&apos;s talk
          </p>

          <h2 className="mt-6 max-w-lg text-3xl font-medium tracking-tight sm:text-4xl">
            Tell us what&apos;s eating your team&apos;s week.
          </h2>

          <p className="mt-5 max-w-md text-mute">
            A short call is usually enough to know whether there&apos;s a fit.
            If there isn&apos;t, we&apos;ll say so.
          </p>

          <p className="mt-8 max-w-md border-l-2 border-accent pl-4 text-sm text-mute">
            This form runs on one of our own automations — it scores what you
            send, files it, and notifies us the moment it lands.
          </p>
        </div>

        <div className="rounded-xl bg-ink-soft p-8 text-paper shadow-[0_24px_60px_-24px_rgba(23,22,26,0.45)] sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
            Start here
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute left-[-9999px] opacity-0"
            />

            <div className="space-y-2">
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className={labelClass}>
                What&apos;s the manual work?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="The task someone on your team repeats every week."
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-sm bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-accent-deep disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send it over"}
            </button>

            {status === "sent" && (
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                Got it. We&apos;ll be in touch.
              </p>
            )}

            {status === "error" && (
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                Didn&apos;t send. Try WhatsApp instead.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}