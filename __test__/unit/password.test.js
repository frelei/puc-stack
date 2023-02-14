const generatePassword = require('../../password-generator');

describe('generatePassword', () => {
  it('should generate a random password of the specified length', () => {
    const length = 10;
    const password = generatePassword(length);
    expect(password).toHaveLength(length);
  });

  it('should generate a different password each time', () => {
    const length = 10;
    const password1 = generatePassword(length);
    const password2 = generatePassword(length);
    expect(password1).not.toEqual(password2);
  });

  it('should throw an error if the length is less than 1', () => {
    expect(() => generatePassword(0)).toThrow();
    expect(() => generatePassword(-1)).toThrow();
  });
});
