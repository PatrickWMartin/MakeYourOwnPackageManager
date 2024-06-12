import {jest} from '@jest/globals';
import { myPackageJsonQuestions, yesFlagPackageJsonQuestions } from '../src/myPackageJsonCreation';

describe('myPackageJsonQuestions function tests', () => {
  let promptMock;
  let logMock;
  let cwdMock;
  let exitMock;

  beforeEach(() => {
    promptMock = jest.fn();
    logMock = jest.fn();
    cwdMock = jest.fn().mockReturnValue('/path/to/project');
    exitMock = jest.fn();
  });

  it('should create a package.json with default values', () => {
    promptMock.mockImplementationOnce(() => '') // package name
      .mockImplementationOnce(() => '') // version
      .mockImplementationOnce(() => '') // description
      .mockImplementationOnce(() => '') // entry point
      .mockImplementationOnce(() => '') // test command
      .mockImplementationOnce(() => '') // git repository
      .mockImplementationOnce(() => '') // keywords
      .mockImplementationOnce(() => '') // author
      .mockImplementationOnce(() => '') // license
      .mockImplementationOnce(() => 'yes'); // is this ok

    const result = myPackageJsonQuestions(promptMock, logMock, cwdMock, exitMock);

    expect(result).toEqual({
      title: 'project',
      version: '1.0.0',
      desription: '',
      main: 'index.js',
      scripts: { test: 'echo "Error: no test specified" && exit 1' },
      repository: undefined,
      keywords: [],
      author: '',
      license: 'ISC',
    });

    expect(exitMock).not.toHaveBeenCalled();
  });

  it('should create a package.json with provided values', () => {
    promptMock.mockImplementationOnce(() => 'my-package') // package name
      .mockImplementationOnce(() => '1.2.3') // version
      .mockImplementationOnce(() => 'A test package') // description
      .mockImplementationOnce(() => 'app.js') // entry point
      .mockImplementationOnce(() => 'npm test') // test command
      .mockImplementationOnce(() => 'https://github.com/user/repo') // git repository
      .mockImplementationOnce(() => 'nodejs jest') // keywords
      .mockImplementationOnce(() => 'John Doe') // author
      .mockImplementationOnce(() => 'MIT') // license
      .mockImplementationOnce(() => 'yes'); // is this ok

    const result = myPackageJsonQuestions(promptMock, logMock, cwdMock, exitMock);

    expect(result).toEqual({
      title: 'my-package',
      version: '1.2.3',
      desription: 'A test package',
      main: 'app.js',
      scripts: { test: 'npm test' },
      repository: {
        type: 'git',
        url: 'https://github.com/user/repo',
      },
      keywords: ['nodejs', 'jest'],
      author: 'John Doe',
      license: 'MIT',
    });

    expect(exitMock).not.toHaveBeenCalled();
  });

  it('should abort when user does not confirm', () => {
    promptMock.mockImplementationOnce(() => '') // package name
      .mockImplementationOnce(() => '') // version
      .mockImplementationOnce(() => '') // description
      .mockImplementationOnce(() => '') // entry point
      .mockImplementationOnce(() => '') // test command
      .mockImplementationOnce(() => '') // git repository
      .mockImplementationOnce(() => '') // keywords
      .mockImplementationOnce(() => '') // author
      .mockImplementationOnce(() => '') // license
      .mockImplementationOnce(() => 'no'); // is this ok

    const result = myPackageJsonQuestions(promptMock, logMock, cwdMock, exitMock);

    expect(exitMock).toHaveBeenCalledWith(1);
  });
});

describe('yesFlagPackageJsonQuestions function tests', () =>{
    it('should return default package.json', () => {
    
        const result = yesFlagPackageJsonQuestions();

        expect(result).toEqual({
          title: 'MakeYourOwnPackageManager',
          version: '1.0.0',
          desription: '',
          main: 'index.js',
          scripts: { test: 'echo "Error: no test specified" && exit 1' },
          keywords: [],
          author: '',
          license: 'ISC',
        });

    });
});
