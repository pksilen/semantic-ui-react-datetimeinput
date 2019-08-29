import DateInput from '../DateInput';
import DateInputPropsValidator from './DateInputPropsValidator';

process.env.NODE_ENV = 'development';

describe('validatePropsInDevelopmentMode', () => {
  it('should return void when props are in valid range', () => {
    DateInputPropsValidator.validatePropsInDevelopmentMode(DateInput.defaultProps);
  });

  it('should return void if yearDoubleClickStepCount is zero', () => {
    DateInputPropsValidator.validatePropsInDevelopmentMode({
      ...DateInput.defaultProps,
      yearDoubleClickStepCount: 0
    });
  });

  it('should throw error if yearDoubleSingleStepCount is zero', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        yearSingleClickStepCount: 0
      })
    ).toThrow();
  });

  it('should throw error if yearDoubleClickStepCount is equal to yearSingleClickStepCount', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        yearDoubleClickStepCount: 1
      })
    ).toThrow();
  });

  it('should throw error if yearDoubleClickStepCount is less than yearSingleClickStepCount', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        yearSingleClickStepCount: 2,
        yearDoubleClickStepCount: 1
      })
    ).toThrow();
  });

  it('should return void if monthDoubleClickStepCount is zero', () => {
    DateInputPropsValidator.validatePropsInDevelopmentMode({
      ...DateInput.defaultProps,
      monthDoubleClickStepCount: 0
    });
  });

  it('should throw error if monthSingleClickStepCount is zero', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        monthSingleClickStepCount: 0
      })
    ).toThrow();
  });

  it('should throw error if monthDoubleClickStepCount is equal to monthSingleClickStepCount', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        monthDoubleClickStepCount: 1
      })
    ).toThrow();
  });

  it('should throw error if monthDoubleClickStepCount is less than monthSingleClickStepCount', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        monthSingleClickStepCount: 2,
        monthDoubleClickStepCount: 1
      })
    ).toThrow();
  });

  it('should throw error if monthSingleClickStepCount is greater than max month value', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        monthSingleClickStepCount: 15
      })
    ).toThrow();
  });

  it('should return void if dayDoubleClickStepCount is zero', () => {
    DateInputPropsValidator.validatePropsInDevelopmentMode({
      ...DateInput.defaultProps,
      dayDoubleClickStepCount: 0
    });
  });

  it('should throw error if daySingleClickStepCount is zero', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        daySingleClickStepCount: 0
      })
    ).toThrow();
  });

  it('should throw error if dayDoubleClickStepCount is equal to daySingleClickStepCount', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        dayDoubleClickStepCount: 1
      })
    ).toThrow();
  });

  it('should throw error if dayDoubleClickStepCount is less than daySingleClickStepCount', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        daySingleClickStepCount: 2,
        dayDoubleClickStepCount: 1
      })
    ).toThrow();
  });

  it('should throw error if daySingleClickStepCount is greater than max day value', () => {
    expect(() =>
      DateInputPropsValidator.validatePropsInDevelopmentMode({
        ...DateInput.defaultProps,
        monthSingleClickStepCount: 32
      })
    ).toThrow();
  });
});
