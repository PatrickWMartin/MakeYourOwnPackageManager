#! /usr/bin/env node
const args = process.argv;

const usage = function(){
    const usageText = `
    mypm <command>

    Usage:

    mypm install    <package_name> add a package dependancy to your project
    mypm publish    publish a package to the mypm registry
    mypm init       create a myPackage.json file 
    `
    console.log(usageText);
}

if (args.length < 3){
    usage();
}

const commands = ['init', 'install', 'publish']
if (commands.indexOf(args[2])===-1){
    console.log("Error: invalid command");
}
