import type { CaseStudy } from "@/lib/types";

export const invoiceProcessing: CaseStudy = {
  slug: "invoice-processing",

  service: "Document & order processing",
  serviceSummary:
    "Invoices, forms, and orders get read, checked, and filed automatically. Data entry, removed.",

  industry: "Wholesale & distribution",
  title: "Supplier invoices read, checked, and filed without data entry",
  premise:
    "Invoices arrive as PDFs and phone photos from dozens of suppliers, each with its own layout. This system reads them, verifies the arithmetic, and only asks a human when something doesn't reconcile.",

  glance: {
    trigger: "New file lands in the invoice intake folder",
    runMode: "Hands-off, with a review queue for anything that fails validation",
    stack: ["n8n", "Gemini (vision)", "Airtable", "Gmail"],
    integrations: ["Google Drive", "Airtable", "Gmail"],
  },

  problem: [
    "Supplier invoices arrive in every format there is — PDF, scan, phone photo — and no two suppliers lay them out the same way.",
    "Someone retypes the header details and every line item into the accounting system by hand.",
    "Typos surface weeks later at reconciliation, when tracing them back costs more than the original entry did.",
    "Volume spikes at month end, exactly when the person doing the typing has the least time for it.",
  ],

  solution: [
    "A watched intake folder is the only interface. Drop a file in, the system takes it from there.",
    "Gemini reads the document as an image, pulling header fields and the full line-item table. No per-supplier template to build or maintain.",
    "Validation runs in code, not in the model: line items are summed and compared against the stated total within tolerance, and required fields are checked for presence.",
    "The validation result decides the route. Clean invoices file themselves. Anything that fails is flagged and a reviewer is emailed the specific reason.",
    "Line items are written as separate linked records, so the data is queryable per product rather than trapped in one text blob.",
  ],

  result: [
    "Arithmetic is verified before anything is written — a total that doesn't match its line items can't quietly enter the books.",
    "Flagged invoices are still saved, marked for review rather than dropped, so nothing goes missing while it waits on a human.",
    "The review email names the reason for the flag, so the reviewer opens the one field in question instead of re-checking the whole document.",
    "Adding a new supplier requires no configuration. The extraction reads layout, not a mapping.",
  ],

  diagrams: [
    {
      title: "Intake to filed record",
      caption:
        "Every invoice passes the same check. The only branch is whether a human gets pulled in.",
      nodes: [
        {
          id: "arrives",
          label: "Invoice arrives",
          category: "trigger",
          service: "Google Drive",
          position: { x: 0, y: 0 },
        },
        {
          id: "read",
          label: "Read invoice",
          category: "ai",
          service: "Gemini vision",
          position: { x: 260, y: 0 },
        },
        {
          id: "check",
          label: "Check totals",
          category: "logic",
          position: { x: 520, y: 0 },
        },
        {
          id: "review",
          label: "Flag for review",
          category: "action",
          service: "Gmail",
          position: { x: 780, y: -110 },
        },
        {
          id: "file",
          label: "File invoice",
          category: "action",
          service: "Airtable",
          position: { x: 1040, y: 0 },
        },
      ],
      edges: [
        { id: "e1", source: "arrives", target: "read" },
        { id: "e2", source: "read", target: "check" },
        { id: "e3", source: "check", target: "review", label: "mismatch" },
        { id: "e4", source: "check", target: "file", label: "clean" },
        { id: "e5", source: "review", target: "file" },
      ],
    },
  ],
};