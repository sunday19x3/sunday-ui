import { cn } from "@/lib/utils";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
  className?: string;
}

export function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={cn("rounded-xl border border-border overflow-hidden", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Prop</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Type</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Default</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-border last:border-0">
              <td className="px-4 py-3">
                <code className="font-mono text-sm text-primary">{prop.name}</code>
                {prop.required && <span className="ml-1 text-destructive">*</span>}
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-sm text-muted-foreground">{prop.type}</code>
              </td>
              <td className="px-4 py-3">
                {prop.default ? (
                  <code className="font-mono text-sm">{prop.default}</code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
