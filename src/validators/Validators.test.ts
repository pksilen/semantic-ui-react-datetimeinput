import Validators from './Validators';

describe('validateIntegerWithinLimits', () => {
  it('should return void when value is an integer between limits', () => {
    Validators.validateIntegerWithinLimits(1, 'testValue', 0, 10);
  });

  it('should return void when value is minValue', () => {
    Validators.validateIntegerWithinLimits(0, 'testValue', 0, 10);
  });

  it('should return void when value is maxValue', () => {
    Validators.validateIntegerWithinLimits(10, 'testValue', 0, 10);
  });

  test.each([[1.25, -1, 15]])('it should throw when value is invalid', (testValue) => {
    expect(() => Validators.validateIntegerWithinLimits(testValue, 'testValue', 0, 10)).toThrow();
  });
});

describe('validateZeroOrIntegerWithinLimits', () => {
  it('should return void when value is an integer between limits', () => {
    Validators.validateZeroOrIntegerWithinLimits(1, 'testValue', 0, 10);
  });

  it('should return void when value is minValue', () => {
    Validators.validateZeroOrIntegerWithinLimits(0, 'testValue', 0, 10);
  });

  it('should return void when value is maxValue', () => {
    Validators.validateZeroOrIntegerWithinLimits(10, 'testValue', 0, 10);
  });

  it('should return void when value is zero', () => {
    Validators.validateZeroOrIntegerWithinLimits(0, 'testValue', 1, 10);
  });

  test.each([[1.25, -1, 15]])('it should throw when value is invalid', (testValue) => {
    expect(() => Validators.validateZeroOrIntegerWithinLimits(testValue, 'testValue', 0, 10)).toThrow();
  });
});
