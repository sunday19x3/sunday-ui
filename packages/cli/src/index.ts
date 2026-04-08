import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";

const program = new Command();

program
  .name("sunday-ui")
  .description("A modern, accessible UI component library")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize sunday-ui in your project")
  .action(async () => {
    await init(process.cwd());
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "Component names to add")
  .action(async (components: string[]) => {
    await add(components, process.cwd());
  });

program.parse();
