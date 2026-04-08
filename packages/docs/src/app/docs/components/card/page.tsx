import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { components } from "@/lib/component-meta";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Card" };

const meta = components.card;

export default function CardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{meta.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{meta.description}</p>
      </div>

      {/* Preview */}
      <ComponentPreview>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is the card content area. You can place any content here.
            </p>
          </CardContent>
          <CardFooter className="justify-end gap-3">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      {/* Installation */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock code={meta.install} language="bash" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
          language="tsx"
        />
      </section>

      {/* Examples: Full Card */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Full Example</h2>
        <p className="text-muted-foreground">
          A complete card using all sub-components: header, title, description, content, and footer.
        </p>
        <ComponentPreview>
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create Project</CardTitle>
              <CardDescription>
                Deploy your new project in one click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground"
                    placeholder="My project"
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Framework
                  </label>
                  <input
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground"
                    placeholder="Next.js"
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code={`<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Create Project</CardTitle>
    <CardDescription>
      Deploy your new project in one click.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col gap-4">
      <Input label="Name" placeholder="My project" />
      <Input label="Framework" placeholder="Next.js" />
    </div>
  </CardContent>
  <CardFooter className="justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`}
          language="tsx"
        />
      </section>

      {/* Props */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <p className="text-muted-foreground">
          All Card sub-components accept standard HTML attributes including{" "}
          <code className="text-sm font-mono text-primary">className</code>.
        </p>
        <PropsTable props={meta.props} />
        {meta.subComponents?.map((sub) => (
          <div key={sub.name} className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">{sub.name}</h3>
            <PropsTable props={sub.props} />
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
