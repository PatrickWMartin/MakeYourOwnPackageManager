import {jest} from '@jest/globals'
import { usageGuide, usageText } from '../src/informationalFunctions';

test('Test if usageGuide is calling the write text', () => {
    const logSpy = jest.spyOn(console, 'log');
    usageGuide();
    expect(logSpy).toHaveBeenCalledWith(usageText);
});
