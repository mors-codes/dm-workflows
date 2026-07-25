"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { NodeCategory } from "@/lib/types";
import { nodeCategories } from "./categories";

export type WorkflowNodeData = {
  label: string;
  category: NodeCategory;
  service?: string;
};

export type WorkflowFlowNode = Node<WorkflowNodeData, "workflow">;

const handleClass =
  "!h-1.5 !w-1.5 !border-0 !bg-paper/30 !min-h-0 !min-w-0";

export function WorkflowNode({ data }: NodeProps<WorkflowFlowNode>) {
  const { label, category, service } = data;
  const { Icon, label: categoryLabel, pill, bar } = nodeCategories[category];

  return (
    <div className="relative flex h-[104px] w-[200px] overflow-hidden rounded-md border border-paper/12 bg-ink-soft">
      <span className={`w-[3px] shrink-0 ${bar}`} aria-hidden />

      <div className="flex flex-1 flex-col justify-between px-3 py-2.5">
        <div className="flex flex-col gap-2">
          <span
            className={`inline-flex w-fit items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${pill}`}
          >
            <Icon className="h-2.5 w-2.5" strokeWidth={2.5} />
            {categoryLabel}
          </span>

          <span className="line-clamp-2 text-[13px] leading-snug text-paper">
            {label}
          </span>
        </div>

        <span className="block min-h-[13px] font-mono text-[10px] tracking-wide text-paper/40">
          {service ?? ""}
        </span>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={false}
        className={handleClass}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={false}
        className={handleClass}
      />
    </div>
  );
}