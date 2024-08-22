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
