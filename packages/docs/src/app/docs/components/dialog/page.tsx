import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { components } from "@/lib/component-meta";
import {
  DialogBasicExample,
  DialogConfirmExample,
  DialogFormExample,
} from "./examples";

export const metadata: Metadata = { title: "Dialog" };

const meta = components.dialog;

export default function DialogPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{meta.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{meta.description}</p>
      </div>

      {/* Preview */}
      <ComponentPreview>
        <DialogBasicExample />
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>Close</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          language="tsx"
        />
      </section>

      {/* Confirmation Dialog */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Confirmation Dialog</h2>
        <p className="text-muted-foreground">
          A common pattern for destructive actions that require user confirmation.
        </p>
        <ComponentPreview>
          <DialogConfirmExample />
        </ComponentPreview>
      </section>

      {/* Form Dialog */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Form Dialog</h2>
        <p className="text-muted-foreground">
          Dialogs can contain forms and any other interactive content.
        </p>
        <ComponentPreview>
          <DialogFormExample />
        </ComponentPreview>
      </section>

      {/* Props */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Dialog</h3>
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
