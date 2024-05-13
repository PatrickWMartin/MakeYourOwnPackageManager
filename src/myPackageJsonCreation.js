import {appendFile} from 'fs';
import promptSync from 'prompt-sync';
import { basename } from 'path';
import chalk from 'chalk';

const error = chalk.bold.red;
const prompt = promptSync();

const myPackageJsonQuestions = function(){
    const myPackageJsonAwnsers = {};

    console.log(`
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`mypm help init\` for definitive documentation on these fields
and exactly what they do.

Use \`mypm install <pkg>\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.`);

    const cwd = basename(process.cwd());
    const packageName = prompt(`package name: (${cwd}) `);
    
    if (packageName === ''){
        myPackageJsonAwnsers.title = cwd;
    } else {
        myPackageJsonAwnsers.title = packageName;
    }

    const version = prompt('version: (1.0.0) ');
    if (version === ''){
        myPackageJsonAwnsers.version = '1.0.0';
    } else{
        myPackageJsonAwnsers.version = version;
    } 

    const description = prompt('description: ');
    myPackageJsonAwnsers.desription = description;
    
    const entryPoint = prompt('entry point: (index.js) ');
    if (entryPoint === ''){
        myPackageJsonAwnsers.main = 'index.js';
    } else{
        myPackageJsonAwnsers.main = entryPoint;
    }
    
    const testCommand = prompt('test command: ');
    if (testCommand === ''){
        myPackageJsonAwnsers.scripts = {test: "echo \"Error: no test specified\" && exit 1"};
    } else{
        myPackageJsonAwnsers.scripts = {test: testCommand};
    }

    const gitRepo = prompt('git repository: ');
    if (gitRepo !== ''){

        myPackageJsonAwnsers.repository = {
                                            type: "git",
                                            url: gitRepo
                                          };
    }

    const keywords = prompt('keywords: ');
    if (keywords === ''){
        myPackageJsonAwnsers.keywords = [];
    } else{
        myPackageJsonAwnsers.keywords = keywords.split(' ');
    }

    const author = prompt('author:');
    myPackageJsonAwnsers.author = author;

    const license = prompt('license (ISC);');
    if (license === ''){
        myPackageJsonAwnsers.license = 'ISC';
    } else{
        myPackageJsonAwnsers.license = license;
    }
    console.log(`About to write to ${process.cwd()}package.json:`)
    console.log();
    console.log(myPackageJsonAwnsers);

    const isOk = prompt('Is this OK? (yes)');
    //npm at least in version 10.2.3 only checks if the first letter of the ok prompt response is y
    if (isOk !== '' && isOk[0] !== 'y'){
        console.log('Aborted');
        process.exit(1);
    } 
    
    return myPackageJsonAwnsers;
}

const yesFlagPackageJsonQuestions = function(){
    const myPackageJsonAwnsers = {};
    const cwd = basename(process.cwd());
    myPackageJsonAwnsers.title = cwd;
    myPackageJsonAwnsers.version = '1.0.0';
    myPackageJsonAwnsers.desription = "";
    myPackageJsonAwnsers.main = 'index.js';
    myPackageJsonAwnsers.scripts = {test: "echo \"Error: no test specified\" && exit 1"};
    myPackageJsonAwnsers.keywords = [];
    myPackageJsonAwnsers.author = "";
    myPackageJsonAwnsers.license = 'ISC';
    console.log(`Wrote to ${process.cwd()}package.json:`)
    console.log();
    console.log(myPackageJsonAwnsers);

    return myPackageJsonAwnsers;
}
export const createMyPackageJsonFile = function(restOfArgs){
    let myPackageJsonAwnsers;
    if (restOfArgs.length === 0){
        myPackageJsonAwnsers =JSON.stringify(myPackageJsonQuestions());
    } else{
        if (restOfArgs[0] === '-y' || restOfArgs[0] === '--yes'){
            myPackageJsonAwnsers =JSON.stringify(yesFlagPackageJsonQuestions());
        } else {
            console.log(error('Error:'), `Unknown flag: ${restOfArgs[0]}` )        
            console.log('usage: mypm init [-y | --yes]')
            process.exit(1);
        }
    }
    appendFile('myPackage.json', myPackageJsonAwnsers, function (err) {
      if (err) {
        throw err;
      }
    });
}
