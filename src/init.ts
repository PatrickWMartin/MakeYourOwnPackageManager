import promptSync from 'prompt-sync';
import { basename } from 'path';
import {appendFile} from 'fs';

const prompt = promptSync();


export const createPackageJsonFile = function(){
    const packageJsonText = getUserInputAndGeneratePackageJsonText();
    console.log(`About to write to ${process.cwd()}package.json:`)
    console.log();
    console.log(packageJsonText);
    const isOk = prompt('Is this OK? (yes)');
    //npm at least in version 10.2.3 only checks if the first letter of the ok prompt response is y
    if (isOk !== '' && isOk[0] !== 'y'){
        console.log('Aborted');
        process.exit(1);
    } 

    appendFile('package.json', packageJsonText, function (err) {
      if (err) {
        throw err;
      }
    });
}


export const getUserInputAndGeneratePackageJsonText = function(){
    console.log(`This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`mypm help init\` for definitive documentation on these fields
and exactly what they do.

Use \`mypm install <pkg>\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.`)
    const packageName = prompt(`package name: (${basename(process.cwd())})`) || basename(process.cwd());
    const version = prompt("version: (0.0.1) ") || "0.0.1";
    const description = prompt("description: ")
    const entryPoint = prompt("entry point: (index.js) ") || "index.js";
    const testCommand = prompt("test command: ") || "echo \"Error: no test specified\" && exit 1";
    const gitRepo = prompt("git repository: ");
    const keywords = prompt("keywords: ");
    const author = prompt("author: ");
    const license = prompt("license: (ISC)") || "ISC";

    const packageJsonText = createPackageJsonText(packageName, version, description, entryPoint, 
                                                  testCommand, gitRepo, keywords, author, license)
    return packageJsonText;
}


export const createPackageJsonText = function(packageName: string, version: string, description: string, entryPoint: string, 
                                              testCommand: string, gitRepo: string, keyWords: string,author: string, license: string){

    const packageJson: any = {
    name: packageName,
    version: version,
    description: description,
    main: entryPoint,
    scripts: {
      test: testCommand,
    },
  };
    
    if (gitRepo) {
        packageJson.repository = {type: "git", url: gitRepo,};
    }
    
    if (keyWords) {
        packageJson.keywords = keyWords.replace(" ", ",").replace(" ", "").split(",");
    }
    packageJson.author = author;
    packageJson.license = license;
    return JSON.stringify(packageJson, null, 4);

}


