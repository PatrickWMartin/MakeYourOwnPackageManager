export const usageText = `
mypm <command>

Usage:

mypm install    <package_name> add a package dependancy to your project
mypm publish    publish a package to the mypm registry
mypm init       create a myPackage.json file 
mypm help       print usage guide
`

export const usageGuide = function(){
    console.log(usageText);
}
