
export const usageGuide = function(){
    console.log(
 `mypm <command>

Usage:

mypm install    <package_name> add a package dependancy to your project
mypm publish    publish a package to the mypm registry
mypm pack       create a tar archive of the package
mypm init       create a myPackage.json file 
mypm help       print usage guide`);
}
