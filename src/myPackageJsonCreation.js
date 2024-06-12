import { writeFileSync } from 'fs';
import promptSync from 'prompt-sync';
import { basename } from 'path';
import chalk from 'chalk';

const error = chalk.bold.red;
const prompt = promptSync();

export function myPackageJsonQuestions(prompt, log, cwd, exit) {
  const myPackageJsonAnswers = {};

  log(`
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`mypm help init\` for definitive documentation on these fields
and exactly what they do.

Use \`mypm install <pkg>\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.`);

  const cwdName = basename(cwd());
  const packageName = prompt(`package name: (${cwdName}) `);

  myPackageJsonAnswers.title = packageName === '' ? cwdName : packageName;

  const version = prompt('version: (1.0.0) ');
  myPackageJsonAnswers.version = version === '' ? '1.0.0' : version;

  const description = prompt('description: ');
  myPackageJsonAnswers.desription = description;

  const entryPoint = prompt('entry point: (index.js) ');
  myPackageJsonAnswers.main = entryPoint === '' ? 'index.js' : entryPoint;

  const testCommand = prompt('test command: ');
  myPackageJsonAnswers.scripts = {
    test: testCommand === '' ? 'echo "Error: no test specified" && exit 1' : testCommand
  };

  const gitRepo = prompt('git repository: ');
  if (gitRepo !== '') {
    myPackageJsonAnswers.repository = {
      type: 'git',
      url: gitRepo
    };
  }

  const keywords = prompt('keywords: ');
  myPackageJsonAnswers.keywords = keywords === '' ? [] : keywords.split(' ');

  const author = prompt('author:');
  myPackageJsonAnswers.author = author;

  const license = prompt('license (ISC): ');
  myPackageJsonAnswers.license = license === '' ? 'ISC' : license;

  log(`About to write to ${cwd()}package.json:`);
  log();
  log(myPackageJsonAnswers);

  const isOk = prompt('Is this OK? (yes)');
  if (isOk !== '' && isOk[0].toLowerCase() !== 'y') {
    log('Aborted');
    exit(1);
  }

  return myPackageJsonAnswers;
}

export const yesFlagPackageJsonQuestions = function(){
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
        myPackageJsonAwnsers = JSON.stringify(myPackageJsonQuestions(prompt, console.log, process.cwd, process.exit));
    } else{
        if (restOfArgs[0] === '-y' || restOfArgs[0] === '--yes'){
            myPackageJsonAwnsers = JSON.stringify(yesFlagPackageJsonQuestions());
        } else {
            console.log(error('Error:'), `Unknown flag: ${restOfArgs[0]}` )        
            console.log('usage: mypm init [-y | --yes]')
            process.exit(1);
        }
    }
    writeFileSync('myPackage.json', myPackageJsonAwnsers, function (err) {
      if (err) {
        throw err;
      }
    });
}
