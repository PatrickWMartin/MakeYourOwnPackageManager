#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./init.js"

const program = new Command();
program.command('init')
    .description('Create a package.json file ')
    .option('--yes, -y', 'create package.json with all the default values')
    .action(() => init());

program.parse(process.argv);
