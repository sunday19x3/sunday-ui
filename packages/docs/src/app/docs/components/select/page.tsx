import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { components } from "@/lib/component-meta";
import {
  SelectBasicExample,
  SelectGroupExample,
  SelectDisabledExample,
  SelectDefaultValueExample,
} from "./examples";

export const metadata: Metadata = { title: "Select" };

const meta = components.select;

export default function SelectPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{meta.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{meta.description}</p>
      </div>

      {/* Preview */}
      <ComponentPreview>
        <SelectBasicExample />
      </ComponentPreview>

      {/* Installation */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <CodeBlock code={meta.install} language="bash" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <CodeBlock
          code={`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>`}
          language="tsx"
        />
      </section>

      {/* With Groups */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">With Groups</h2>
        <p className="text-muted-foreground">
          Use <code className="text-sm font-mono text-primary">SelectGroup</code> and{" "}
          <code className="text-sm font-mono text-primary">SelectLabel</code> to organize options
          into logical sections.
        </p>
        <ComponentPreview>
          <SelectGroupExample />
        </ComponentPreview>
      </section>

      {/* With Disabled Items */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">With Disabled Items</h2>
        <p className="text-muted-foreground">
          Individual options can be disabled to prevent selection.
        </p>
        <ComponentPreview>
          <SelectDisabledExample />
        </ComponentPreview>
      </section>

      {/* With Default Value */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">With Default Value</h2>
        <ComponentPreview>
          <SelectDefaultValueExample />
        </ComponentPreview>
      </section>

      {/* Props */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Select</h3>
        <PropsTable props={meta.props} />
        {meta.subComponents?.map((sub) => (
          <div key={sub.name} className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">{sub.name}</h3>
            {sub.props.length > 0 ? (
              <PropsTable props={sub.props} />
            ) : (
              <p className="text-sm text-muted-foreground">
                Accepts standard HTML attributes.
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Accessibility */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Accessibility</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          {meta.accessibility.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
