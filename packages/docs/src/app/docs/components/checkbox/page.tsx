import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { components } from "@/lib/component-meta";
import { Checkbox } from "@/components/ui/checkbox";

export const metadata: Metadata = { title: "Checkbox" };

const meta = components.checkbox;

export default function CheckboxPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{meta.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{meta.description}</p>
      </div>

      {/* Preview */}
      <ComponentPreview>
        <Checkbox label="Accept terms and conditions" />
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
          code={`import { Checkbox } from "@/components/ui/checkbox"

<Checkbox label="Accept terms and conditions" />`}
          language="tsx"
        />
      </section>

      {/* With Description */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">With Description</h2>
        <ComponentPreview>
          <Checkbox
            label="Marketing emails"
            description="Receive emails about new products, features, and more."
          />
        </ComponentPreview>
        <CodeBlock
          code={`<Checkbox
  label="Marketing emails"
  description="Receive emails about new products, features, and more."
/>`}
          language="tsx"
        />
      </section>

      {/* Without Label */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Without Label</h2>
        <p className="text-muted-foreground">
          Use without a label for compact layouts. Make sure to provide an{" "}
          <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md">aria-label</code> for accessibility.
        </p>
        <ComponentPreview>
          <div className="flex gap-4">
            <Checkbox aria-label="Option 1" defaultChecked />
            <Checkbox aria-label="Option 2" />
            <Checkbox aria-label="Option 3" />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Checkbox aria-label="Option 1" defaultChecked />
<Checkbox aria-label="Option 2" />
<Checkbox aria-label="Option 3" />`}
          language="tsx"
        />
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Disabled</h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4">
            <Checkbox label="Disabled unchecked" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />`}
          language="tsx"
        />
      </section>

      {/* Form Example */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Form Example</h2>
        <ComponentPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Checkbox
              label="Terms of Service"
              description="I agree to the terms of service and privacy policy."
              required
            />
            <Checkbox
              label="Newsletter"
              description="Send me weekly updates about new features."
              defaultChecked
            />
            <Checkbox
              label="Beta features"
              description="Enable experimental features (may be unstable)."
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Props */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <PropsTable props={meta.props} />
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
