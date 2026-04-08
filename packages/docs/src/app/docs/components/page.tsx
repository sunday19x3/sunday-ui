import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { components } from "@/lib/component-meta";

export const metadata: Metadata = { title: "Components" };

const componentList = Object.values(components);

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Components</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Beautifully crafted, accessible UI components built from scratch. Copy
          and paste into your apps.
        </p>
      </div>

      {/* Component Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {componentList.map((component) => (
          <Link
            key={component.slug}
            href={`/docs/components/${component.slug}`}
            className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Card className="h-full transition-colors duration-150 group-hover:border-primary/50 group-hover:shadow-md">
              <CardHeader>
                <CardTitle as="h2" className="text-base">
                  {component.name}
                </CardTitle>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
