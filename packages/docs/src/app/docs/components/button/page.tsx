import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { components } from "@/lib/component-meta";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Button" };

const meta = components.button;

export default function ButtonPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{meta.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{meta.description}</p>
      </div>

      {/* Preview */}
      <ComponentPreview>
        <Button>Click me</Button>
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
          code={`import { Button } from "@/components/ui/button"\n\n<Button>Click me</Button>`}
          language="tsx"
        />
      </section>

      {/* Examples: Variants */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Variants</h2>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
          language="tsx"
        />
      </section>

      {/* Examples: Sizes */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Sizes</h2>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Button>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Settings">
  <SettingsIcon />
</Button>`}
          language="tsx"
        />
      </section>

      {/* Examples: Loading */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Loading</h2>
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-3">
            <Button loading>Saving...</Button>
            <Button loading variant="secondary">Loading</Button>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Button loading>Saving...</Button>
<Button loading variant="secondary">Loading</Button>`}
          language="tsx"
        />
      </section>

      {/* Examples: As Child */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">As Child</h2>
        <p className="text-muted-foreground">
          Use the <code className="text-sm font-mono text-primary">asChild</code> prop to render
          the button styles on a different element, such as an anchor tag.
        </p>
        <ComponentPreview>
          <Button asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              Go to GitHub
            </a>
          </Button>
        </ComponentPreview>
        <CodeBlock
          code={`<Button asChild>
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
    Go to GitHub
  </a>
</Button>`}
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
