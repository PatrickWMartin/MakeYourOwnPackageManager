#! /usr/bin/env node
import { createMyPackageJsonFile } from '../src/myPackageJsonCreation.js'
import { createPackageTar } from '../src/publishPackage.js'
import { usageGuide } from '../src/informationalFunctions.js';

const args = process.argv;


if (args.length < 3){
    usageGuide();
    process.exit(1);
}

switch(args[2]) {
    case 'help':
        usageGuide();
        break
    case 'init':
        createMyPackageJsonFile(args.slice(3));
        break
    case 'install':
        console.log('install called');
        break
    case 'publish':
        console.log('publish called');
        createPackageTar();
        break
    default:
        console.log(`Unknown mypm command: ${args[2]}`);
        console.log();
        console.log('To see a list of supported mypm commands, run:')
        console.log('   mypm help')
}
