import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Theming",
};

const colorTokens = [
  { name: "Primary", var: "--sui-primary", light: "#ff6e00", dark: "#ff8a33" },
  { name: "Secondary", var: "--sui-secondary", light: "#1a1a2e", dark: "#2a2a4a" },
  { name: "Destructive", var: "--sui-destructive", light: "#dc2626", dark: "#ef4444" },
  { name: "Success", var: "--sui-success", light: "#16a34a", dark: "#22c55e" },
  { name: "Warning", var: "--sui-warning", light: "#ca8a04", dark: "#eab308" },
  { name: "Muted", var: "--sui-muted", light: "#f5f0eb", dark: "#2a2520" },
  { name: "Accent", var: "--sui-accent", light: "#fff3e8", dark: "#2a1f15" },
  { name: "Background", var: "--sui-background", light: "#ffffff", dark: "#121010" },
  { name: "Foreground", var: "--sui-foreground", light: "#1a1a1a", dark: "#e8e4e0" },
  { name: "Border", var: "--sui-border", light: "#e5ddd5", dark: "#3a3330" },
];

export default function ThemingPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Theming</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Customize colors, dark mode, and create custom themes.
        </p>
      </div>

      {/* Architecture */}
      <section className="flex flex-col gap-3">
        <h2 id="architecture" className="text-xl font-semibold text-foreground">
          Architecture
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          sunday-ui theming works in three layers:
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-6 font-mono text-sm space-y-2">
          <p><span className="text-primary font-semibold">1.</span> CSS Variables (<code>--sui-*</code>) define the actual values</p>
          <p><span className="text-primary font-semibold">2.</span> <code>@theme inline</code> maps vars to Tailwind tokens</p>
          <p><span className="text-primary font-semibold">3.</span> <code>data-theme</code> attribute switches variable sets</p>
        </div>
        <p className="text-muted-foreground">
          Components use Tailwind classes like <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md">bg-primary</code> which
          resolve to CSS variables. Switching themes just swaps the variable values — zero component changes.
        </p>
      </section>

      {/* Color Tokens */}
      <section className="flex flex-col gap-3">
        <h2 id="colors" className="text-xl font-semibold text-foreground">
          Color Tokens
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {colorTokens.map((token) => (
            <div key={token.var} className="flex items-center gap-3 rounded-xl border border-border p-3">
              <div className="flex gap-1">
                <div
                  className="h-8 w-8 rounded-lg border border-border"
                  style={{ backgroundColor: token.light }}
                  title={`Light: ${token.light}`}
                />
                <div
                  className="h-8 w-8 rounded-lg border border-border"
                  style={{ backgroundColor: token.dark }}
                  title={`Dark: ${token.dark}`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{token.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{token.var}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dark Mode */}
      <section className="flex flex-col gap-3">
        <h2 id="dark-mode" className="text-xl font-semibold text-foreground">
          Dark Mode
        </h2>
        <p className="text-muted-foreground">
          Dark mode is controlled by setting <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md">data-theme=&quot;dark&quot;</code> on
          the <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md">&lt;html&gt;</code> element.
        </p>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code={`// Toggle dark mode
document.documentElement.setAttribute("data-theme", "dark");

// Toggle light mode
document.documentElement.removeAttribute("data-theme");`}
          language="tsx"
        />
        <p className="text-muted-foreground">
          The Tailwind <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md">dark:</code> variant
          is configured to match this attribute:
        </p>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code={`@custom-variant dark (&:is([data-theme="dark"] *));`}
          language="css"
        />
      </section>

      {/* Custom Theme */}
      <section className="flex flex-col gap-3">
        <h2 id="custom-themes" className="text-xl font-semibold text-foreground">
          Custom Themes
        </h2>
        <p className="text-muted-foreground">
          Create a new theme by adding a CSS variable block with a custom <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md">data-theme</code> value:
        </p>
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code={`[data-theme="ocean"] {
  --sui-primary: #0077b6;
  --sui-primary-foreground: #ffffff;
  --sui-secondary: #023e8a;
  --sui-secondary-foreground: #ffffff;
  --sui-background: #f0f8ff;
  --sui-foreground: #0a1628;
  /* ... override all tokens */
}`}
          language="css"
        />
        {/* @ts-expect-error Async Server Component */}
        <CodeBlock
          code={`document.documentElement.setAttribute("data-theme", "ocean");`}
          language="tsx"
        />
      </section>

      {/* Rules */}
      <section className="flex flex-col gap-3">
        <h2 id="rules" className="text-xl font-semibold text-foreground">
          Component Theming Rules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-success/30 bg-success/5 p-4">
            <p className="text-sm font-semibold text-success mb-2">DO</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code className="font-mono">bg-primary</code></li>
              <li><code className="font-mono">text-foreground</code></li>
              <li><code className="font-mono">border-border</code></li>
              <li><code className="font-mono">hover:bg-primary/90</code></li>
            </ul>
          </div>
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm font-semibold text-destructive mb-2">DON&apos;T</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code className="font-mono line-through">bg-[#ff6e00]</code></li>
              <li><code className="font-mono line-through">text-gray-900</code></li>
              <li><code className="font-mono line-through">border-gray-200</code></li>
              <li><code className="font-mono line-through">dark:bg-gray-800</code></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
