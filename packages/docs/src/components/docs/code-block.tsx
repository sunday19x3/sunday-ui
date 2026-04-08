import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export async function CodeBlock({
  code,
  language = "tsx",
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });

  return (
    <div className={cn("relative rounded-xl border border-border overflow-hidden", className)}>
      <div className="absolute right-2 top-2 z-10">
        <CopyButton text={code.trim()} />
      </div>
      <div
        className="[&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-7 [&_.shiki]:bg-muted! dark:[&_.shiki]:bg-[#1a1818]! [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
