import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/docs/code-block";
import { ThemeToggle } from "@/components/docs/theme-toggle";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="h-6 w-6 dark:invert-0 invert" aria-hidden="true" />
          <span className="text-lg font-bold text-foreground">sunday</span>
          <span className="text-lg font-bold text-primary">ui</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs/getting-started">Docs</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs/components">Components</Link>
          </Button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/30" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <Badge variant="outline" className="mb-6">
            v0.1.0 — Open Source
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            Beautiful components
            <br />
            <span className="text-primary">you actually own.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Accessible, themeable React components built with Tailwind CSS v4.
            Copy-paste into your project. No dependency lock-in. Fully yours to customize.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/docs/getting-started">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/user/sunday-ui" target="_blank" rel="noopener noreferrer">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <CardTitle>Copy-Paste Install</CardTitle>
              <CardDescription>
                Components live in your codebase. No node_modules bloat, no version conflicts. You own every line.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <CardTitle>Accessible by Default</CardTitle>
              <CardDescription>
                WCAG 2.1 AA compliant. Full keyboard navigation, ARIA attributes, screen reader support, and focus management.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <CardTitle>Tailwind v4 Native</CardTitle>
              <CardDescription>
                CSS-first configuration. Theming via CSS variables. Dark mode with a single attribute. No tailwind.config.js needed.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold text-foreground mb-10">
            Components Preview
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Buttons */}
            <div className="rounded-2xl border border-border bg-background p-6">
              <p className="text-sm font-semibold text-muted-foreground mb-4">Button Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Badges */}
            <div className="rounded-2xl border border-border bg-background p-6">
              <p className="text-sm font-semibold text-muted-foreground mb-4">Badge Variants</p>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
              </div>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-border bg-background p-6">
              <p className="text-sm font-semibold text-muted-foreground mb-4">Card</p>
              <Card>
                <CardHeader>
                  <CardTitle>Project Alpha</CardTitle>
                  <CardDescription>A next-generation design system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Built with love and accessibility in mind.</p>
                </CardContent>
              </Card>
            </div>

            {/* Input */}
            <div className="rounded-2xl border border-border bg-background p-6">
              <p className="text-sm font-semibold text-muted-foreground mb-4">Input</p>
              <div className="space-y-4">
                <Input label="Email" placeholder="you@example.com" />
                <Input label="Password" type="password" error="Password is required" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Install CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Start in seconds</h2>
          <p className="mt-2 text-muted-foreground">One command to set up. Another to add components.</p>
        </div>
        <CodeBlock
          code={`# Initialize sunday-ui in your project
npx sunday-ui init

# Add components
npx sunday-ui add button badge card input dialog select`}
          language="bash"
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="h-5 w-5 dark:invert-0 invert" aria-hidden="true" />
            <span className="text-sm font-semibold text-foreground">sunday</span>
            <span className="text-sm font-semibold text-primary">ui</span>
            <span className="ml-2 text-sm text-muted-foreground">Open source. MIT License.</span>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/docs/getting-started" className="hover:text-foreground transition-colors">Docs</Link>
            <Link href="/docs/components" className="hover:text-foreground transition-colors">Components</Link>
            <Link href="/docs/theming" className="hover:text-foreground transition-colors">Theming</Link>
            <a href="https://github.com/user/sunday-ui" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
