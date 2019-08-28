import ButtonUtils from './ButtonUtils';

describe('getButtonIconName()', () => {
  it('should return "minus" when buttonType is "decrement" and buttonPlacement="buttonsOutside', () => {
    const iconName = ButtonUtils.getButtonIconName('decrement', 'buttonsOutside');
    expect(iconName).toBe('minus');
  });

  it('should return "plus" when buttonType is "increment" and buttonPlacement="buttonsOutside', () => {
    const iconName = ButtonUtils.getButtonIconName('increment', 'buttonsOutside');
    expect(iconName).toBe('plus');
  });

  it('should return "caret up" when buttonType is "increment" and buttonPlacement="buttonsInside', () => {
    const iconName = ButtonUtils.getButtonIconName('increment', 'buttonsInside');
    expect(iconName).toBe('caret up');
  });

  it('should return "caret down" when buttonType is "decrement" and buttonPlacement="buttonsInside', () => {
    const iconName = ButtonUtils.getButtonIconName('decrement', 'buttonsInside');
    expect(iconName).toBe('caret down');
  });
});

describe('isEnabledButton()', () => {
  const date = new Date('2019-01-10T12:30:00.000');

  it('should return true if current value plus step count is not greater than max value for "increment" button', () => {
    const isEnabled = ButtonUtils.isEnabledButton(date, 'increment', 'hour', 2);
    expect(isEnabled).toBe(true);
  });

  it('should return true if current value plus step count is max value for "increment" button', () => {
    const isEnabled = ButtonUtils.isEnabledButton(date, 'increment', 'hour', 2);
    expect(isEnabled).toBe(true);
  });

  it('should return false if current value plus step count is greater than max value for "increment" button', () => {
    const isEnabled = ButtonUtils.isEnabledButton(date, 'increment', 'hour', 12);
    expect(isEnabled).toBe(false);
  });

  it('should return true if current value minus step count is not less than min value for "decrement" button', () => {
    const isEnabled = ButtonUtils.isEnabledButton(date, 'decrement', 'hour', 2);
    expect(isEnabled).toBe(true);
  });

  it('should return true if current value minus step count is min value for "decrement" button', () => {
    const isEnabled = ButtonUtils.isEnabledButton(date, 'decrement', 'hour', 12);
    expect(isEnabled).toBe(true);
  });

  it('should return false if current value minus step count is less than min value for "decrement" button', () => {
    const isEnabled = ButtonUtils.isEnabledButton(date, 'decrement', 'hour', 14);
    expect(isEnabled).toBe(false);
  });
});
