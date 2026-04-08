import type { PropDef } from "@/components/docs/props-table";

export interface ComponentMeta {
  name: string;
  slug: string;
  description: string;
  install: string;
  importCode: string;
  props: PropDef[];
  accessibility: string[];
  subComponents?: {
    name: string;
    props: PropDef[];
  }[];
}

export const components: Record<string, ComponentMeta> = {
  button: {
    name: "Button",
    slug: "button",
    description: "A versatile button component with multiple variants, sizes, loading state, and asChild support for rendering as different elements.",
    install: "npx sunday-ui add button",
    importCode: `import { Button } from "@/components/ui/button"`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to merge with defaults" },
      { name: "variant", type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"', default: '"default"', description: "Visual style of the button" },
      { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Size of the button" },
      { name: "asChild", type: "boolean", default: "false", description: "Render as child element (e.g., <a>) with button styles" },
      { name: "loading", type: "boolean", default: "false", description: "Show loading spinner and disable interaction" },
      { name: "disabled", type: "boolean", default: "false", description: "Disable the button" },
    ],
    accessibility: [
      "Uses semantic <button> element",
      "Enter and Space keys activate the button",
      "Disabled state uses disabled attribute and aria-disabled",
      "Loading state uses aria-busy",
      "Icon-only buttons require aria-label",
      "Visible focus ring on focus-visible",
    ],
  },

  badge: {
    name: "Badge",
    slug: "badge",
    description: "A small status indicator component with multiple color variants for labels, counts, and statuses.",
    install: "npx sunday-ui add badge",
    importCode: `import { Badge } from "@/components/ui/badge"`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to merge with defaults" },
      { name: "variant", type: '"default" | "secondary" | "destructive" | "outline" | "success" | "warning"', default: '"default"', description: "Color variant of the badge" },
    ],
    accessibility: [
      "Uses <span> element",
      "Color is not the only status indicator — pair with text",
    ],
  },

  card: {
    name: "Card",
    slug: "card",
    description: "A compound card component using semantic HTML with article, header, and footer elements.",
    install: "npx sunday-ui add card",
    importCode: `import {\n  Card,\n  CardHeader,\n  CardTitle,\n  CardDescription,\n  CardContent,\n  CardFooter,\n} from "@/components/ui/card"`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    accessibility: [
      "Card uses semantic <article> element",
      "CardHeader uses <header>, CardFooter uses <footer>",
      "CardTitle renders as <h3> by default (customizable via as prop)",
    ],
  },

  checkbox: {
    name: "Checkbox",
    slug: "checkbox",
    description: "A checkbox input with optional label and description text, built on a native input element for full accessibility.",
    install: "npx sunday-ui add checkbox",
    importCode: `import { Checkbox } from "@/components/ui/checkbox"`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to merge with defaults" },
      { name: "label", type: "string", description: "Label text displayed next to the checkbox" },
      { name: "description", type: "string", description: "Helper text displayed below the label" },
      { name: "id", type: "string", description: "Checkbox ID (auto-generated if not provided)" },
      { name: "checked", type: "boolean", description: "Controlled checked state" },
      { name: "defaultChecked", type: "boolean", description: "Default checked state (uncontrolled)" },
      { name: "disabled", type: "boolean", default: "false", description: "Disable the checkbox" },
      { name: "required", type: "boolean", default: "false", description: "Mark checkbox as required" },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback when checked state changes" },
    ],
    accessibility: [
      "Uses native <input type=\"checkbox\"> for built-in keyboard and screen reader support",
      "Label associated via htmlFor and id (auto-generated)",
      "Description linked via aria-describedby",
      "Space key toggles the checkbox",
      "Disabled state communicated to assistive technology",
      "Visible focus ring on focus-visible",
    ],
    subComponents: [
      { name: "CardTitle", props: [
        { name: "as", type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"', default: '"h3"', description: "Heading level to render" },
      ]},
    ],
  },

  input: {
    name: "Input",
    slug: "input",
    description: "A form input with built-in label, helper text, and error state with full ARIA support.",
    install: "npx sunday-ui add input",
    importCode: `import { Input } from "@/components/ui/input"`,
    props: [
      { name: "className", type: "string", description: "Additional CSS classes to merge with defaults" },
      { name: "label", type: "string", required: true, description: "Label text displayed above the input" },
      { name: "helperText", type: "string", description: "Helper text displayed below the input" },
      { name: "error", type: "string", description: "Error message (replaces helper text)" },
      { name: "id", type: "string", description: "Input ID (auto-generated if not provided)" },
      { name: "required", type: "boolean", default: "false", description: "Mark input as required" },
    ],
    accessibility: [
      "Label associated via htmlFor and id (auto-generated)",
      "Error state uses aria-invalid and aria-describedby",
      "Helper text linked via aria-describedby",
      "Required state uses required attribute and aria-required",
      "Placeholder never used as label replacement",
    ],
  },

  dialog: {
    name: "Dialog",
    slug: "dialog",
    description: "A modal dialog with focus trapping, scroll lock, keyboard navigation, and portal rendering. Supports controlled and uncontrolled modes.",
    install: "npx sunday-ui add dialog",
    importCode: `import {\n  Dialog,\n  DialogTrigger,\n  DialogContent,\n  DialogHeader,\n  DialogFooter,\n  DialogTitle,\n  DialogDescription,\n  DialogClose,\n} from "@/components/ui/dialog"`,
    props: [
      { name: "open", type: "boolean", description: "Controlled open state" },
      { name: "defaultOpen", type: "boolean", default: "false", description: "Default open state (uncontrolled)" },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes" },
    ],
    accessibility: [
      "Uses role=\"dialog\" and aria-modal=\"true\"",
      "Focus trapped within dialog (Tab/Shift+Tab cycles)",
      "Escape key closes the dialog",
      "Focus returns to trigger element on close",
      "Body scroll locked while open",
      "Title and description linked via aria-labelledby and aria-describedby",
    ],
    subComponents: [
      { name: "DialogTrigger", props: [] },
      { name: "DialogContent", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
      { name: "DialogHeader", props: [] },
      { name: "DialogFooter", props: [] },
      { name: "DialogTitle", props: [] },
      { name: "DialogDescription", props: [] },
      { name: "DialogClose", props: [] },
    ],
  },

  select: {
    name: "Select",
    slug: "select",
    description: "A custom select component implementing the WAI-ARIA listbox pattern with keyboard navigation, type-ahead search, and portal rendering.",
    install: "npx sunday-ui add select",
    importCode: `import {\n  Select,\n  SelectTrigger,\n  SelectValue,\n  SelectContent,\n  SelectItem,\n  SelectGroup,\n  SelectLabel,\n} from "@/components/ui/select"`,
    props: [
      { name: "value", type: "string", description: "Controlled value" },
      { name: "defaultValue", type: "string", default: '""', description: "Default value (uncontrolled)" },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback when value changes" },
    ],
    accessibility: [
      "Trigger uses role=\"combobox\" with aria-expanded and aria-haspopup",
      "Content uses role=\"listbox\", items use role=\"option\"",
      "Arrow keys navigate items, Home/End jump to first/last",
      "Enter/Space select the active item",
      "Escape closes without changing value",
      "Type-ahead: typing characters jumps to matching item",
      "aria-activedescendant tracks the focused option",
    ],
    subComponents: [
      { name: "SelectTrigger", props: [] },
      { name: "SelectValue", props: [{ name: "placeholder", type: "string", description: "Placeholder text when no value selected" }] },
      { name: "SelectContent", props: [] },
      { name: "SelectItem", props: [
        { name: "value", type: "string", required: true, description: "Value of the option" },
        { name: "disabled", type: "boolean", default: "false", description: "Disable this option" },
      ]},
      { name: "SelectGroup", props: [] },
      { name: "SelectLabel", props: [] },
    ],
  },
};
