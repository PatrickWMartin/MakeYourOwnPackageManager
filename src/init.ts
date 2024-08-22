import { type } from "os";

export const init = function(){
    console.log(`This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`mypm help init\` for definitive documentation on these fields
and exactly what they do.

Use \`mypm install <pkg>\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.`)
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


