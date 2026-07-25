export type NodeCategory = "trigger" | "ai" | "logic" | "action";

export interface WorkflowNode {
  id: string;
  label: string;
  category: NodeCategory;
  service?: string;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface WorkflowDiagram {
  title?: string;
  caption?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface CaseStudy {
  slug: string;

  service: string;
  serviceSummary: string;

  industry: string;
  title: string;
  premise: string;

  glance: {
    trigger: string;
    runMode: string;
    stack: string[];
    integrations: string[];
  };

  problem: string[];
  solution: string[];
  result: string[];

  diagrams: WorkflowDiagram[];
}