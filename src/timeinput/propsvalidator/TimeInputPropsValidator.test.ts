import TimeInputPropsValidator from './TimeInputPropsValidator';
import TimeInput from '../TimeInput';

process.env.NODE_ENV = 'development';

describe('validatePropsInDevelopmentMode', () => {
  it('should return void when props are in valid range', () => {
    TimeInputPropsValidator.validatePropsInDevelopmentMode(TimeInput.defaultProps);
  });

  it('should return void if hourDoubleClickStepCount is zero', () => {
    TimeInputPropsValidator.validatePropsInDevelopmentMode({
      ...TimeInput.defaultProps,
      hourDoubleClickStepCount: 0
    });
  });

  it('should throw error if hourSingleStepCount is zero', () => {
    expect(() =>
      TimeInputPropsValidator.validatePropsInDevelopmentMode({
        ...TimeInput.defaultProps,
        hourSingleClickStepCount: 0
      })
    ).toThrow();
  });

  it('should throw error if hourDoubleClickStepCount is equal to hourSingleClickStepCount', () => {
    expect(() =>
      TimeInputPropsValidator.validatePropsInDevelopmentMode({
        ...TimeInput.defaultProps,
        hourDoubleClickStepCount: 1
      })
    ).toThrow();
  });

  it('should throw error if hourDoubleClickStepCount is less than hourSingleClickStepCount', () => {
    expect(() =>
      TimeInputPropsValidator.validatePropsInDevelopmentMode({
        ...TimeInput.defaultProps,
        hourSingleClickStepCount: 2,
        hourDoubleClickStepCount: 1
      })
    ).toThrow();
  });

  it('should return void if minuteDoubleClickStepCount is zero', () => {
    TimeInputPropsValidator.validatePropsInDevelopmentMode({
      ...TimeInput.defaultProps,
      minuteDoubleClickStepCount: 0
    });
  });

  it('should throw error if minuteSingleStepCount is zero', () => {
    expect(() =>
      TimeInputPropsValidator.validatePropsInDevelopmentMode({
        ...TimeInput.defaultProps,
        minuteSingleClickStepCount: 0
      })
    ).toThrow();
  });

  it('should throw error if minuteDoubleClickStepCount is equal to minuteSingleClickStepCount', () => {
    expect(() =>
      TimeInputPropsValidator.validatePropsInDevelopmentMode({
        ...TimeInput.defaultProps,
        minuteDoubleClickStepCount: 1
      })
    ).toThrow();
  });

  it('should throw error if minuteDoubleClickStepCount is less than minuteSingleClickStepCount', () => {
    expect(() =>
      TimeInputPropsValidator.validatePropsInDevelopmentMode({
        ...TimeInput.defaultProps,
        minuteSingleClickStepCount: 2,
        minuteDoubleClickStepCount: 1
      })
    ).toThrow();
  });
});
