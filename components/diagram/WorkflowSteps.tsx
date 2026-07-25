import type { WorkflowDiagram } from "@/lib/types";
import { nodeCategories } from "./categories";

export function WorkflowSteps({ diagram }: { diagram: WorkflowDiagram }) {
  const incoming = new Map(
    diagram.edges
      .filter((edge) => edge.label)
      .map((edge) => [edge.target, edge.label as string]),
  );

  return (
    <ol className="space-y-0">
      {diagram.nodes.map((node, index) => {
        const { Icon, label: categoryLabel, pill, bar } =
          nodeCategories[node.category];
        const branch = incoming.get(node.id);

        return (
          <li key={node.id}>
            {index > 0 && (
              <div className="flex items-center gap-3 py-2 pl-6">
                <span className="h-6 w-px bg-paper/20" />
                {branch && (
                  <span className="rounded-sm bg-paper/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/50">
                    {branch}
                  </span>
                )}
              </div>
            )}

            <div className="flex overflow-hidden rounded-lg border border-paper/12 bg-ink-soft">
              <span className={`w-[3px] shrink-0 ${bar}`} aria-hidden />

              <div className="flex-1 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex w-fit items-center rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${pill}`}
                  >
                    {categoryLabel}
                  </span>

                  <Icon
                    className="h-4 w-4 shrink-0 text-paper/25"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>

                <h4 className="mt-3 text-[15px] font-medium leading-snug text-paper">
                  {node.label}
                </h4>

                {node.service && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/40">
                    {node.service}
                  </p>
                )}

                {node.note && (
                  <p className="mt-3 text-[13px] leading-relaxed text-paper/55">
                    {node.note}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}