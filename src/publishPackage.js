import { create } from "tar";

export const createPackageTar = function(){
    create(
        {
            gzip: true,
            file: 'myPackageName.tar.gz',
            cwd: process.cwd(),
        },
        ['./']
    )
}
//First thing to for publishing a package is to be able to put it into a tar.gz
