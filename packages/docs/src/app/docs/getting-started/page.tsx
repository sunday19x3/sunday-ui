import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Getting Started",
};

export default function GettingStartedPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Getting Started</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Install and configure sunday-ui in your project.
        </p>
      </div>

      {/* Introduction */}
      <section className="flex flex-col gap-3">
        <h2 id="introduction" className="text-xl font-semibold text-foreground">
          Introduction
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          sunday-ui is a collection of beautifully designed, accessible React components that you
          copy and paste into your project. You own the code — no <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md">node_modules</code> bloat,
          no version lock-in, full customization.
        </p>
        <div className="flex gap-2">
          <Badge>Tailwind v4</Badge>
          <Badge variant="secondary">React 18+</Badge>
          <Badge variant="outline">WCAG 2.1 AA</Badge>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="flex flex-col gap-3">
        <h2 id="prerequisites" className="text-xl font-semibold text-foreground">
          Prerequisites
        </h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>React 18+ (or Next.js 13+ with App Router)</li>
          <li>Tailwind CSS v4</li>
          <li>TypeScript (recommended)</li>
          <li>pnpm, npm, or yarn</li>
        </ul>
      </section>

      {/* Initialize */}
      <section className="flex flex-col gap-3">
        <h2 id="initialize" className="text-xl font-semibold text-foreground">
          Initialize sunday-ui
        </h2>
        <p className="text-muted-foreground">
          Run the init command to set up your project. It will create a config file, copy the utility
          functions, and inject the theme CSS variables into your global stylesheet.
        </p>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock code="npx sunday-ui init" language="bash" />
        <p className="text-sm text-muted-foreground">
          The CLI will ask you where your global CSS file, components, lib, and hooks directories are.
        </p>
      </section>

      {/* Install font */}
      <section className="flex flex-col gap-3">
        <h2 id="font" className="text-xl font-semibold text-foreground">
          Install Poppins Font
        </h2>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code={`pnpm add @fontsource/poppins`}
          language="bash"
        />
        <p className="text-muted-foreground">
          Then import the font weights in your root layout:
        </p>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code={`import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";`}
          language="tsx"
        />
      </section>

      {/* Add a component */}
      <section className="flex flex-col gap-3">
        <h2 id="add-component" className="text-xl font-semibold text-foreground">
          Add Your First Component
        </h2>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock code="npx sunday-ui add button" language="bash" />
        <p className="text-muted-foreground">
          This copies the Button component and its dependencies (utils, slot, compose-refs) into your project.
          Now use it:
        </p>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}`}
          language="tsx"
        />
      </section>

      {/* Peer dependencies */}
      <section className="flex flex-col gap-3">
        <h2 id="dependencies" className="text-xl font-semibold text-foreground">
          Peer Dependencies
        </h2>
        <p className="text-muted-foreground">
          sunday-ui components need these packages installed in your project:
        </p>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code="pnpm add clsx tailwind-merge class-variance-authority"
          language="bash"
        />
      </section>
    </div>
  );
}
