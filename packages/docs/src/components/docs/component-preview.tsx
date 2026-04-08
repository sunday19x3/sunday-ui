"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code?: React.ReactNode;
  className?: string;
}

export function ComponentPreview({
  children,
  code,
  className,
}: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className={cn("rounded-xl border border-border overflow-hidden", className)}>
      <TabsList className="bg-muted/50 px-2">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        {code && <TabsTrigger value="code">Code</TabsTrigger>}
      </TabsList>
      <TabsContent value="preview">
        <div className="flex min-h-[200px] items-center justify-center p-8">
          {children}
        </div>
      </TabsContent>
      {code && (
        <TabsContent value="code">
          {code}
        </TabsContent>
      )}
    </Tabs>
  );
}
