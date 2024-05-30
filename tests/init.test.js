test('basic test to try to get spyOn working', () => {
    const logSpy = jest.spyOn(console, 'log');
    console.log('hello');

    expect(logSpy).toHaveBeenCalledWith('hello');
});
