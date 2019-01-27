const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should accept string input', () => {
    expect(isRealString(' Peter Parker ')).toBe(true);
  });

  it('should reject undefined', () => {
    expect(isRealString()).toBe(false);
  });

  it('should reject null', () => {
    expect(isRealString(null)).toBe(false);
  });

  it('should reject wihitespaces', () => {
    expect(isRealString('    ')).toBe(false);
  });

  it('should reject non-string value', () => {
    expect(isRealString(123)).toBe(false);
  });
});
