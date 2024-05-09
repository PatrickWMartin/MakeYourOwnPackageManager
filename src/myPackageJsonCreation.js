import {appendFile} from 'fs';
import promptSync from 'prompt-sync';
import { basename } from 'path';

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
    const packageName = prompt(`package name: (${cwd})`);
    
    if (packageName === ''){
        myPackageJsonAwnsers.title = cwd;
    } else {
        myPackageJsonAwnsers.title = packageName;
    }

    const version = prompt('version: (1.0.0)');
    if (version === ''){
        myPackageJsonAwnsers.version = '1.0.0';
    } else{
        myPackageJsonAwnsers.version = version;
    } 

    const description = prompt('description:');
    myPackageJsonAwnsers.desription = description;
    
    //Add the keyword logic later
    myPackageJsonAwnsers.keywords = [];

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

export const createMyPackageJsonFile = function(){
    myPackageJsonQuestions();
    // appendFile('myPackage.json', '{"name": "test"}', function (err) {
    //   if (err) throw err;
    //   console.log('myPackage.json created')
    // });
}
