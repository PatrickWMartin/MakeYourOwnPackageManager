import {appendFile} from 'fs';

export const createMyPackageJson = function(){
    appendFile('myPackage.json', '{"name": "test"}', function (err) {
      if (err) throw err;
      console.log('myPackage.json created')
    });
}
