export interface RegistryItem {
  name: string;
  type: "ui" | "lib" | "hook" | "css";
  files: string[];
  dependencies: string[]; // other registry item names
  npmDependencies?: string[];
}

export const registry: RegistryItem[] = [
  // ---- Lib ----
  {
    name: "utils",
    type: "lib",
    files: ["lib/utils.ts"],
    dependencies: [],
    npmDependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "compose-refs",
    type: "lib",
    files: ["lib/compose-refs.ts"],
    dependencies: [],
  },
  {
    name: "slot",
    type: "lib",
    files: ["lib/slot.tsx"],
    dependencies: ["utils", "compose-refs"],
  },
  {
    name: "portal",
    type: "lib",
    files: ["lib/portal.tsx"],
    dependencies: [],
  },

  // ---- Hooks ----
  {
    name: "use-id",
    type: "hook",
    files: ["hooks/use-id.ts"],
    dependencies: [],
  },
  {
    name: "use-escape-key",
    type: "hook",
    files: ["hooks/use-escape-key.ts"],
    dependencies: [],
  },
  {
    name: "use-click-outside",
    type: "hook",
    files: ["hooks/use-click-outside.ts"],
    dependencies: [],
  },
  {
    name: "use-scroll-lock",
    type: "hook",
    files: ["hooks/use-scroll-lock.ts"],
    dependencies: [],
  },
  {
    name: "use-controllable-state",
    type: "hook",
    files: ["hooks/use-controllable-state.ts"],
    dependencies: [],
  },
  {
    name: "use-focus-trap",
    type: "hook",
    files: ["hooks/use-focus-trap.ts"],
    dependencies: [],
  },
  {
    name: "use-typeahead",
    type: "hook",
    files: ["hooks/use-typeahead.ts"],
    dependencies: [],
  },

  // ---- UI Components ----
  {
    name: "button",
    type: "ui",
    files: ["ui/button.tsx"],
    dependencies: ["utils", "slot"],
    npmDependencies: ["class-variance-authority"],
  },
  {
    name: "badge",
    type: "ui",
    files: ["ui/badge.tsx"],
    dependencies: ["utils"],
    npmDependencies: ["class-variance-authority"],
  },
  {
    name: "card",
    type: "ui",
    files: ["ui/card.tsx"],
    dependencies: ["utils"],
  },
  {
    name: "checkbox",
    type: "ui",
    files: ["ui/checkbox.tsx"],
    dependencies: ["utils", "use-id"],
  },
  {
    name: "input",
    type: "ui",
    files: ["ui/input.tsx"],
    dependencies: ["utils", "use-id"],
  },
  {
    name: "dialog",
    type: "ui",
    files: ["ui/dialog.tsx"],
    dependencies: [
      "utils",
      "portal",
      "use-controllable-state",
      "use-focus-trap",
      "use-scroll-lock",
      "use-escape-key",
      "use-click-outside",
      "use-id",
    ],
  },
  {
    name: "select",
    type: "ui",
    files: ["ui/select.tsx"],
    dependencies: [
      "utils",
      "portal",
      "use-controllable-state",
      "use-escape-key",
      "use-click-outside",
      "use-id",
      "use-typeahead",
    ],
  },

  // ---- CSS ----
  {
    name: "css",
    type: "css",
    files: ["css/sunday-ui.css"],
    dependencies: [],
  },
];

export function getRegistryItem(name: string): RegistryItem | undefined {
  return registry.find((item) => item.name === name);
}

export function resolveAllDependencies(name: string): RegistryItem[] {
  const resolved = new Map<string, RegistryItem>();

  function resolve(itemName: string) {
    if (resolved.has(itemName)) return;
    const item = getRegistryItem(itemName);
    if (!item) return;

    // Resolve deps first (depth-first)
    for (const dep of item.dependencies) {
      resolve(dep);
    }
    resolved.set(itemName, item);
  }

  resolve(name);
  return Array.from(resolved.values());
}

export function getAvailableComponents(): RegistryItem[] {
  return registry.filter((item) => item.type === "ui");
}
