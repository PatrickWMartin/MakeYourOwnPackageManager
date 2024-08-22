#!/usr/bin/env node
import { Command } from "commander";
import { createPackageJsonFile } from "./init.js"

const program = new Command();
program.command('init')
    .description('Create a package.json file ')
    .option('--yes, -y', 'create package.json with all the default values')
    .action(() => createPackageJsonFile());

program.parse(process.argv);
