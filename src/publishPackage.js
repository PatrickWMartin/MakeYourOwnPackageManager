import { create } from 'tar';
import { readFileSync } from 'fs';

export const createPackageTar = function(){
    create(
        {
            gzip: true,
            file: 'myPackageName.tgz',
            cwd: process.cwd(),
        },
        ['./']
    )
}

//get package name
export const getPackageName = function(){
    try {
        const myPackageJson = readFileSync('myPackage.json', 'utf8');
        return JSON.parse(myPackageJson).title;
    } catch (error) {

        if (error.code === 'ENOENT'){
            console.error('No myPackage.json file found in this directory!');
            console.error('To continue with this action create myPackage.json file');
        }
    }
}
