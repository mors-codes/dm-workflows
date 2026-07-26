"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HeroTerminal } from "./HeroTerminal";

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="border-b border-line px-8 pb-24 pt-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.18, delayChildren: 0.15 },
            },
          }}
        >
          <motion.p
            variants={item}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute-soft"
          >
            Operational automation
          </motion.p>

          <motion.h1
            variants={item}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl"
          >
            The manual work behind your business,
            <span className="text-accent"> handled.</span>
          </motion.h1>

          <motion.p
            variants={item}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-mute"
          >
            We build the backend systems that handle lead follow-up, CRM
            syncing, document processing, and the repetitive operational work
            eating your team&apos;s week. Not another chatbot pitch.
          </motion.p>

          <motion.div
            variants={item}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center gap-4"
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
          </motion.div>
        </motion.div>

        <HeroTerminal />
      </div>
    </section>
  );
}