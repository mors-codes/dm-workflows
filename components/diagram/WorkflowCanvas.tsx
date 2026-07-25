"use client";

import { useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlow,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { WorkflowDiagram } from "@/lib/types";
import { categoryOrder, nodeCategories } from "./categories";
import { WorkflowNode, type WorkflowFlowNode } from "./WorkflowNode";

const nodeTypes = { workflow: WorkflowNode };

export function WorkflowCanvas({ diagram }: { diagram: WorkflowDiagram }) {
  const nodes = useMemo<WorkflowFlowNode[]>(
    () =>
      diagram.nodes.map((node) => ({
        id: node.id,
        type: "workflow" as const,
        position: node.position,
        data: {
          label: node.label,
          category: node.category,
          service: node.service,
        },
      })),
    [diagram.nodes],
  );

  const edges = useMemo<Edge[]>(
    () =>
      diagram.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        type: "smoothstep",
        animated: true,
        style: { stroke: "var(--color-paper)", strokeOpacity: 0.28 },
        labelStyle: {
          fill: "var(--color-paper)",
          fillOpacity: 0.55,
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        },
        labelBgStyle: { fill: "var(--color-ink-soft)" },
        labelBgPadding: [6, 3] as [number, number],
        labelBgBorderRadius: 2,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 14,
          height: 14,
          color: "var(--color-paper)",
        },
      })),
    [diagram.edges],
  );

  const usedCategories = useMemo(
    () =>
      categoryOrder.filter((category) =>
        diagram.nodes.some((node) => node.category === category),
      ),
    [diagram.nodes],
  );

  return (
    <figure className="m-0">
      <div className="h-[360px] w-full rounded-lg border border-paper/10 bg-ink">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          minZoom={0.35}
          maxZoom={1}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          panOnScroll={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: false }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={28}
            size={1}
            color="var(--color-paper)"
            style={{ opacity: 0.07 }}
          />
        </ReactFlow>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {usedCategories.map((category) => {
          const { Icon, label } = nodeCategories[category];
          return (
            <span
              key={category}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/45"
            >
              <Icon className="h-3 w-3" strokeWidth={2.5} />
              {label}
            </span>
          );
        })}
      </figcaption>
    </figure>
  );
}