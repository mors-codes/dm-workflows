import type { CaseStudy } from "@/lib/types";

export const emailCrm: CaseStudy = {
  slug: "email-crm-automation",

  service: "CRM & email automation",
  serviceSummary:
    "Records update themselves and follow-ups send on schedule. Your CRM stays accurate without anyone maintaining it.",

  industry: "Professional services",
  title: "Inbound enquiries filed, answered, and chased without anyone tracking them",
  premise:
    "Client enquiries arrive by email, get read into the CRM, and receive a drafted reply. A second workflow watches what happens next and nudges anything that goes quiet.",

  glance: {
    trigger: "A new client enquiry arrives by email",
    runMode: "Automatic, with low-confidence replies held as drafts for a human",
    stack: ["n8n", "Gemini", "HubSpot", "Google Sheets", "Gmail"],
    integrations: ["Gmail", "HubSpot", "Google Sheets"],
  },

  problem: [
    "Enquiries arrive as ordinary email, so there's no structured record of them until someone makes one.",
    "The same details get retyped into the CRM — contact, deal, follow-up task — three times over for one enquiry.",
    "Replies get written from scratch each time, even though most enquiries fall into a handful of familiar shapes.",
    "Once a reply is sent, nothing tracks whether the client ever came back, so quiet threads are only noticed by accident.",
  ],

  solution: [
    "A Gmail trigger picks up the enquiry directly. No forwarding rule and no separate intake form to maintain.",
    "Gemini reads the email and extracts the details the CRM needs, which are merged with the raw message before anything is written.",
    "The CRM side is built in one pass: contact upserted rather than duplicated, deal created, follow-up task attached.",
    "A reply is drafted against the extracted details, then routed on confidence — clear enquiries send immediately, ambiguous ones are saved as a Gmail draft for a human to approve.",
    "Every enquiry is logged to a tracking sheet either way, which is what the second workflow reads from.",
    "A scheduled watcher re-checks open enquiries, searches the inbox for a client reply, and either closes the thread out or drafts and sends a nudge.",
  ],

  result: [
    "The CRM reflects every enquiry that arrived, not the ones someone had time to enter.",
    "Contacts are upserted rather than appended, so repeat enquirers don't fragment into duplicate records.",
    "A reply the system isn't confident about is never sent — it waits as a draft, so the failure mode is a delay rather than a wrong answer to a client.",
    "Follow-up is driven by the tracking sheet rather than memory, so a thread going quiet triggers a nudge instead of being forgotten.",
    "Replies stop when the client responds, because the watcher checks the inbox before it drafts anything.",
  ],

  diagrams: [
    {
      title: "Enquiry to filed record and reply",
      caption:
        "Confidence decides whether the drafted reply sends itself or waits for approval.",
      nodes: [
        {
          id: "arrive",
          label: "Enquiry arrives",
          category: "trigger",
          service: "Gmail",
          position: { x: 0, y: 0 },
        },
        {
          id: "extract",
          label: "Extract details",
          category: "ai",
          service: "Gemini",
          position: { x: 260, y: 0 },
        },
        {
          id: "crm",
          label: "Create contact, deal & task",
          category: "action",
          service: "HubSpot",
          position: { x: 520, y: 0 },
        },
        {
          id: "draft",
          label: "Draft reply",
          category: "ai",
          service: "Gemini",
          position: { x: 780, y: 0 },
        },
        {
          id: "gate",
          label: "Confident enough to send?",
          category: "logic",
          position: { x: 1040, y: 0 },
        },
        {
          id: "send",
          label: "Send reply",
          category: "action",
          service: "Gmail",
          position: { x: 1300, y: -120 },
        },
        {
          id: "hold",
          label: "Hold as draft",
          category: "action",
          service: "Gmail",
          position: { x: 1300, y: 120 },
        },
      ],
      edges: [
        { id: "a1", source: "arrive", target: "extract" },
        { id: "a2", source: "extract", target: "crm" },
        { id: "a3", source: "crm", target: "draft" },
        { id: "a4", source: "draft", target: "gate" },
        { id: "a5", source: "gate", target: "send", label: "yes" },
        { id: "a6", source: "gate", target: "hold", label: "no" },
      ],
    },
    {
      title: "Follow-up watcher",
      caption:
        "Runs on a schedule against the tracking sheet. Checks the inbox before it ever nudges anyone.",
      nodes: [
        {
          id: "timer",
          label: "Every few minutes",
          category: "trigger",
          service: "Schedule",
          position: { x: 0, y: 0 },
        },
        {
          id: "open",
          label: "Load open enquiries",
          category: "action",
          service: "Google Sheets",
          position: { x: 260, y: 0 },
        },
        {
          id: "search",
          label: "Look for a reply",
          category: "action",
          service: "Gmail",
          position: { x: 520, y: 0 },
        },
        {
          id: "gate2",
          label: "Client replied?",
          category: "logic",
          position: { x: 780, y: 0 },
        },
        {
          id: "close",
          label: "Close the thread",
          category: "action",
          service: "Google Sheets",
          position: { x: 1040, y: -120 },
        },
        {
          id: "nudge",
          label: "Draft nudge",
          category: "ai",
          service: "Gemini",
          position: { x: 1040, y: 120 },
        },
        {
          id: "sendnudge",
          label: "Send nudge",
          category: "action",
          service: "Gmail",
          position: { x: 1300, y: 120 },
        },
      ],
      edges: [
        { id: "b1", source: "timer", target: "open" },
        { id: "b2", source: "open", target: "search" },
        { id: "b3", source: "search", target: "gate2" },
        { id: "b4", source: "gate2", target: "close", label: "yes" },
        { id: "b5", source: "gate2", target: "nudge", label: "no" },
        { id: "b6", source: "nudge", target: "sendnudge" },
      ],
    },
  ],
};