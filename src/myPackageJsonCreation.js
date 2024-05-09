import {appendFile} from 'fs';
import promptSync from 'prompt-sync';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const prompt = promptSync();

const myPackageJsonQuestions = function(){
    console.log(`
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`npm help init\` for definitive documentation on these fields
and exactly what they do.

Use \`npm install <pkg>\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.`);

    const packageName = prompt(`package name: (${__dirname})`);
    console.log(packageName);

}

export const createMyPackageJsonFile = function(){
    myPackageJsonQuestions();
    // appendFile('myPackage.json', '{"name": "test"}', function (err) {
    //   if (err) throw err;
    //   console.log('myPackage.json created')
    // });
}
