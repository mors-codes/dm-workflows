import type { CaseStudy } from "@/lib/types";

export const leadQualification: CaseStudy = {
  slug: "lead-qualification",

  service: "Lead capture & follow-up",
  serviceSummary:
    "Every enquiry gets scored and answered within minutes, not days. No lead sits in an inbox waiting.",

  industry: "Home services & trades",
  title: "Every enquiry scored, filed, and answered before it goes cold",
  premise:
    "Enquiries come in through the website at all hours. This system reads each one, decides how serious it is, files it in the CRM, and replies — while pulling a human in immediately when the lead is worth interrupting someone for.",

  glance: {
    trigger: "Someone submits the enquiry form",
    runMode: "Fully automatic, with hot leads escalated to a person on arrival",
    stack: ["n8n", "Gemini", "HubSpot", "Gmail"],
    integrations: ["HubSpot", "Gmail"],
  },

  problem: [
    "Enquiries land in a shared inbox overnight and on weekends, then wait until someone gets to them.",
    "Every lead gets the same response speed, so the serious buyer and the tyre-kicker are treated identically.",
    "Judging which enquiries matter depends on whoever happens to read them, and that judgement changes person to person.",
    "Leads get copied into the CRM by hand later, if at all, so the pipeline never reflects what actually came in.",
  ],

  solution: [
    "The website form is the trigger. Nothing else needs to be checked or forwarded.",
    "Gemini reads the enquiry against a fixed set of qualification criteria and returns a tier — hot, warm, or cold — with the reasoning behind it.",
    "The model's output is parsed and validated in code before anything downstream acts on it, so a malformed response fails loudly instead of creating a bad record.",
    "Tier decides the routing. Every lead is written to the CRM as a contact and an associated deal; hot leads additionally trigger an immediate alert to the person who can act on it.",
    "A tier-appropriate follow-up email goes out on the same run, so the enquirer gets a reply while they're still on the site.",
  ],

  result: [
    "Response time no longer depends on office hours — a form filled at 11pm is scored, filed, and answered at 11pm.",
    "Scoring criteria live in one place and apply identically to every enquiry, so tiering doesn't drift with whoever is on duty.",
    "Every lead reaches the CRM as a contact and a deal, whether it was hot or cold, so the pipeline reflects real volume rather than what someone remembered to enter.",
    "Only hot leads generate an interruption, so alerts stay meaningful instead of becoming noise people learn to ignore.",
  ],

  diagrams: [
    {
      title: "Enquiry to qualified pipeline record",
      caption:
        "Every lead follows the same path. Tier only decides whether a person gets pulled in.",
      nodes: [
        {
          id: "form",
          label: "Enquiry submitted",
          category: "trigger",
          service: "Web form",
          position: { x: 0, y: 0 },
        },
        {
          id: "score",
          label: "Score & tier lead",
          category: "ai",
          service: "Gemini",
          position: { x: 260, y: 0 },
        },
        {
          id: "route",
          label: "Route by tier",
          category: "logic",
          position: { x: 520, y: 0 },
        },
        {
          id: "alert",
          label: "Alert the team",
          category: "action",
          service: "Gmail",
          position: { x: 780, y: -130 },
        },
        {
          id: "crm",
          label: "Create contact & deal",
          category: "action",
          service: "HubSpot",
          position: { x: 780, y: 0 },
        },
        {
          id: "reply",
          label: "Send follow-up",
          category: "action",
          service: "Gmail",
          position: { x: 1040, y: 0 },
        },
      ],
      edges: [
        { id: "e1", source: "form", target: "score" },
        { id: "e2", source: "score", target: "route" },
        { id: "e3", source: "route", target: "alert", label: "hot only" },
        { id: "e4", source: "route", target: "crm", label: "all tiers" },
        { id: "e5", source: "crm", target: "reply" },
      ],
    },
  ],
};