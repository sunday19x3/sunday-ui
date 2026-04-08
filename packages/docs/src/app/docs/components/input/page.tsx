import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { components } from "@/lib/component-meta";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Input" };

const meta = components.input;

export default function InputPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{meta.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{meta.description}</p>
      </div>

      {/* Preview */}
      <ComponentPreview>
        <div className="w-full max-w-sm">
          <Input label="Email" placeholder="you@example.com" />
        </div>
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
          code={`import { Input } from "@/components/ui/input"\n\n<Input label="Email" placeholder="you@example.com" />`}
          language="tsx"
        />
      </section>

      {/* Examples: Default */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Default</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <Input label="Username" placeholder="Enter your username" />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Input label="Username" placeholder="Enter your username" />`}
          language="tsx"
        />
      </section>

      {/* Examples: With Helper Text */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">With Helper Text</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              helperText="Must be at least 8 characters."
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Input
  label="Password"
  type="password"
  placeholder="Enter your password"
  helperText="Must be at least 8 characters."
/>`}
          language="tsx"
        />
      </section>

      {/* Examples: With Error */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">With Error</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <Input
              label="Email"
              placeholder="you@example.com"
              error="Please enter a valid email address."
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Input
  label="Email"
  placeholder="you@example.com"
  error="Please enter a valid email address."
/>`}
          language="tsx"
        />
      </section>

      {/* Examples: Required */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Required</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <Input
              label="Full Name"
              placeholder="John Doe"
              required
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Input label="Full Name" placeholder="John Doe" required />`}
          language="tsx"
        />
      </section>

      {/* Examples: Disabled */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Disabled</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <Input
              label="Organization"
              placeholder="Acme Inc."
              disabled
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Input label="Organization" placeholder="Acme Inc." disabled />`}
          language="tsx"
        />
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
