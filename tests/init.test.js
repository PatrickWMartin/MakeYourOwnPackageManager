import {init, createPackageJsonText} from '../dist/init.js';

describe('init tests', () => {
    // test('call init function', () => {
    //    init(); 
    // });

    test('create default package.json output', () => {
        const testObject = {
            name: "testPackage",
            version: "1.0.0",
            description: "test description",
            main: "testIndex.js",
            scripts: {
              test: "echo \"Error: no test specified\" && exit 1",
            },
            author: "",
            license: "ISC"
        };
        const expectedValue = JSON.stringify(testObject, null, 4)

        expect(
            createPackageJsonText("testPackage", "1.0.0","test description", "testIndex.js", 
                                  "echo \"Error: no test specified\" && exit 1", "", "", "", "ISC"))
            .toBe(expectedValue)
    });

    test('git repo supplied to createPackageJsonText', () => {
        const testObject = {
            name: "repoTest",
            version: "2.5.6",
            description: "test for adding git in init",
            main: "main.js",
            scripts: {
              test: "echo test run",
            },
            repository: {
                type: "git",
                url: "www.fakegitrepo.com/fakerepo",
            },
            keywords: [
                "a",
                "b",
                "c",
            ],
            author: "John Doe",
            license: "MIT"
        };
        const expectedValue = JSON.stringify(testObject, null, 4)
        expect(
            createPackageJsonText("repoTest", "2.5.6", "test for adding git in init", "main.js", 
                                  "echo test run", "www.fakegitrepo.com/fakerepo", "a,b,c", "John Doe", "MIT"))
            .toBe(expectedValue)

    });
    test('keywords supplied to createPackageJsonText', () => {
        const testObject = {
            name: "repoTest",
            version: "2.5.6",
            description: "test for adding git in init",
            main: "main.js",
            scripts: {
              test: "echo test run",
            },
            keywords: [
                "testing",
                "fake",
                "cat",
            ],
            author: "Jane Doe",
            license: "Some Custom License"
        };
        const expectedValue = JSON.stringify(testObject, null, 4)
        expect(
            createPackageJsonText("repoTest", "2.5.6", "test for adding git in init", "main.js", 
                                  "echo test run", "", "testing fake, cat", "Jane Doe", "Some Custom License"))
            .toBe(expectedValue)

    });

});
