import {jest} from '@jest/globals'
import { usageGuide } from '../src/informationalFunctions';

test('Test if usageGuide is calling the write text', () => {
    const logSpy = jest.spyOn(console, 'log');
    usageGuide();
    expect(logSpy).toHaveBeenCalledWith(`mypm <command>

Usage:

mypm install    <package_name> add a package dependancy to your project
mypm publish    publish a package to the mypm registry
mypm init       create a myPackage.json file 
mypm help       print usage guide`);
});
