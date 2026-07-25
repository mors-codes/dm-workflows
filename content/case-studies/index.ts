import type { CaseStudy } from "@/lib/types";
import { invoiceProcessing } from "./invoice-processing";
import { leadQualification } from "./lead-qualification";
import { emailCrm } from "./email-crm";
import { documentIntelligence } from "./document-intelligence";
import { supportBot } from "./support-bot";

/**
 * Display order for the homepage services grid.
 * Add each new case study here as it's written.
 */
export const caseStudies: CaseStudy[] = [
  leadQualification,
  emailCrm,
  invoiceProcessing,
  documentIntelligence,
  supportBot,
];

export const caseStudySlugs = caseStudies.map((study) => study.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** Wraps around, so the last study points back to the first. */
export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index === -1) return undefined;
  return caseStudies[(index + 1) % caseStudies.length];
}