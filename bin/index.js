#! /usr/bin/env node
import {createMyPackageJsonFile} from '../src/myPackageJsonCreation.js'

const args = process.argv;

const usageGuide = function(){
    const usageText = `
    mypm <command>

    Usage:

    mypm install    <package_name> add a package dependancy to your project
    mypm publish    publish a package to the mypm registry
    mypm init       create a myPackage.json file 
    mypm help       print usage guide
    `
    console.log(usageText);
}

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
        break
    default:
        console.log(`Unknown mypm command: ${args[2]}`);
        console.log();
        console.log('To see a list of supported mypm commands, run:')
        console.log('   mypm help')
}
