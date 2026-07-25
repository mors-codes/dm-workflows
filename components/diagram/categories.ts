import { GitBranch, Send, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NodeCategory } from "@/lib/types";

export interface CategoryConfig {
  label: string;
  Icon: LucideIcon;
  /** Badge pill styling. */
  pill: string;
  /** Left accent bar on the node card. */
  bar: string;
}

export const nodeCategories: Record<NodeCategory, CategoryConfig> = {
  trigger: {
    label: "Trigger",
    Icon: Zap,
    pill: "bg-accent text-paper",
    bar: "bg-accent",
  },
  ai: {
    label: "AI",
    Icon: Sparkles,
    pill: "bg-paper text-ink",
    bar: "bg-paper",
  },
  logic: {
    label: "Logic",
    Icon: GitBranch,
    pill: "text-paper/70 ring-1 ring-inset ring-paper/25",
    bar: "bg-paper/30",
  },
  action: {
    label: "Action",
    Icon: Send,
    pill: "bg-paper/15 text-paper/85",
    bar: "bg-paper/55",
  },
};

export const categoryOrder: NodeCategory[] = [
  "trigger",
  "ai",
  "logic",
  "action",
];