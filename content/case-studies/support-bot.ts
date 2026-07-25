import type { CaseStudy } from "@/lib/types";

export const supportBot: CaseStudy = {
  slug: "support-bot",

  service: "Customer support assistant",
  serviceSummary:
    "Routine questions answered instantly from your own policies. Anything else goes to a person, with context attached.",

  industry: "Ecommerce & online retail",
  title: "Routine support questions answered from policy, everything else escalated",
  premise:
    "Most support messages are the same handful of questions about shipping, returns, and payment. This assistant answers those from the store's own policies and hands anything account-specific straight to a person.",

  glance: {
    trigger: "A customer sends a message in chat",
    runMode: "Answers from store policy only, escalates anything it can't source",
    stack: ["n8n", "Gemini", "Google Sheets", "Gmail"],
    integrations: ["Gmail", "Google Sheets"],
  },

  problem: [
    "The same questions about shipping windows, returns, and payment methods arrive every day and get answered by hand every time.",
    "Answers vary depending on who replies, so two customers can be told different things about the same policy.",
    "Genuine problems — a specific order, a refund dispute — sit in the same queue as the routine questions and wait behind them.",
    "There's no record of what was asked, so nobody can see which questions are worth fixing at the source.",
  ],

  solution: [
    "The store's shipping, returns, and payment policies are supplied to the model as its only source of truth.",
    "The assistant returns a structured response rather than loose text — the reply, an escalation flag, and the reason behind it.",
    "That flag drives the routing in code, so escalation is a branch in the workflow rather than a judgement the model narrates.",
    "Anything order-specific, any refund request, and anything not covered by policy is escalated with the customer's message and the reason attached.",
    "Off-topic questions are declined politely rather than escalated, so the human queue stays limited to real support work.",
    "Conversation memory is scoped to the session, so a follow-up question keeps its context without leaking between customers.",
    "Every exchange is appended to a log — question, reply, whether it escalated, and why.",
  ],

  result: [
    "Policy answers are identical every time, because they come from one source rather than from whoever is on shift.",
    "The assistant can't invent a policy it wasn't given — anything outside its knowledge is routed to a person instead of guessed at.",
    "Escalations arrive with the original message and the reason already attached, so the person picking it up doesn't start by asking what happened.",
    "Off-topic messages never reach the queue, so an escalation genuinely means something needs a human.",
    "The log makes recurring questions visible, which is what tells you a policy page needs rewriting rather than more staffing.",
  ],

  diagrams: [
    {
      title: "Message to answer or escalation",
      caption:
        "The customer always gets a reply. The branch decides whether a person is brought in behind it.",
      nodes: [
        {
          id: "msg",
          label: "Customer message",
          category: "trigger",
          service: "Chat",
          position: { x: 0, y: 0 },
        },
        {
          id: "agent",
          label: "Answer from store policy",
          category: "ai",
          service: "Gemini",
          position: { x: 260, y: 0 },
        },
        {
          id: "reply",
          label: "Reply to customer",
          category: "action",
          service: "Chat",
          position: { x: 520, y: -130 },
        },
        {
          id: "gate",
          label: "Outside policy?",
          category: "logic",
          position: { x: 520, y: 0 },
        },
        {
          id: "notify",
          label: "Escalate to support",
          category: "action",
          service: "Gmail",
          position: { x: 800, y: -130 },
        },
        {
          id: "log",
          label: "Log the exchange",
          category: "action",
          service: "Google Sheets",
          position: { x: 800, y: 0 },
        },
      ],
      edges: [
        { id: "s1", source: "msg", target: "agent" },
        { id: "s2", source: "agent", target: "reply" },
        { id: "s3", source: "agent", target: "gate" },
        { id: "s4", source: "gate", target: "notify", label: "escalate" },
        { id: "s5", source: "gate", target: "log" },
      ],
    },
  ],
};