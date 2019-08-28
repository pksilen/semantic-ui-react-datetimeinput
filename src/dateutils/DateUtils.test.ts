import moment from 'moment';
import DateUtils from './DateUtils';

const dateNow = new Date();

describe('getMaxValue()', () => {
  it('should return correct max value for inputType', () => {
    const yearMaxValue = DateUtils.getMaxValue('year', dateNow);
    expect(yearMaxValue).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('should return correct max value for month', () => {
    const monthMaxValue = DateUtils.getMaxValue('month', dateNow);
    expect(monthMaxValue).toBe(DateUtils.MAX_MONTH);
  });

  it('should return correct max value for day', () => {
    const dayMaxValue = DateUtils.getMaxValue('date', dateNow);
    expect(dayMaxValue).toBe(moment(dateNow).daysInMonth());
  });

  it('should return correct max value for hour', () => {
    const hourMaxValue = DateUtils.getMaxValue('hour', dateNow);
    expect(hourMaxValue).toBe(DateUtils.MAX_HOUR);
  });

  it('should return correct max value for minute', () => {
    const minuteMaxValue = DateUtils.getMaxValue('minute', dateNow);
    expect(minuteMaxValue).toBe(DateUtils.MAX_MINUTE);
  });
});

describe('getMinValue()', () => {
  it('should return correct min value for year', () => {
    const yearMinValue = DateUtils.getMinValue('year');
    expect(yearMinValue).toBe(0);
  });

  it('should return correct min value for month', () => {
    const monthMinValue = DateUtils.getMinValue('month');
    expect(monthMinValue).toBe(1);
  });

  it('should return correct min value for day', () => {
    const dayMinValue = DateUtils.getMinValue('date');
    expect(dayMinValue).toBe(1);
  });

  it('should return correct min value for hour', () => {
    const hourMinValue = DateUtils.getMinValue('hour');
    expect(hourMinValue).toBe(0);
  });

  it('should return correct min value for minute', () => {
    const minuteMinValue = DateUtils.getMinValue('minute');
    expect(minuteMinValue).toBe(0);
  });
});

describe('getNewInputValue', () => {
  it('should decrement current input value from 12 to 10 when step count is 2', () => {
    const newInputValue = DateUtils.getNewInputValue('decrement', 'hour', 12, 2, dateNow);
    expect(newInputValue).toBe(10);
  });

  it('should decrement current input value from 46 to 40 when step count is 10', () => {
    const newInputValue = DateUtils.getNewInputValue('decrement', 'minute', 46, 10, dateNow);
    expect(newInputValue).toBe(40);
  });

  it('should not decrement current input value beyond min value', () => {
    const newInputValue = DateUtils.getNewInputValue('decrement', 'date', 2, 2, dateNow);
    expect(newInputValue).toBe(1);
  });

  it('should increment current input value from 14 to 18 when step count is 6', () => {
    const newInputValue = DateUtils.getNewInputValue('increment', 'hour', 14, 6, dateNow);
    expect(newInputValue).toBe(18);
  });

  it('should increment current input value from 45 to 50 by step count 10', () => {
    const newInputValue = DateUtils.getNewInputValue('increment', 'minute', 45, 10, dateNow);
    expect(newInputValue).toBe(50);
  });

  it('should increment current input value from 41 to 50 by step count 10', () => {
    const newInputValue = DateUtils.getNewInputValue('increment', 'minute', 41, 10, dateNow);
    expect(newInputValue).toBe(50);
  });

  it('should increment current input value from 39 to 40 by step count 10', () => {
    const newInputValue = DateUtils.getNewInputValue('increment', 'minute', 39, 10, dateNow);
    expect(newInputValue).toBe(40);
  });

  it('should not increment current input value beyond max value', () => {
    const newInputValue = DateUtils.getNewInputValue('increment', 'minute', 55, 10, dateNow);
    expect(newInputValue).toBe(59);
  });
});

describe('getInputValueAsString()', () => {
  it('should return minute value with leading zero when minutes are 9 or less', () => {
    const inputValueAsStr = DateUtils.getInputValueAsString(9, 'minute');
    expect(inputValueAsStr).toBe('09');
  });

  it('should not return minute value with leading zero when minutes 10 or more', () => {
    const inputValueAsStr = DateUtils.getInputValueAsString(10, 'minute');
    expect(inputValueAsStr).toBe('10');
  });

  it('should add one to month value', () => {
    const inputValueAsStr = DateUtils.getInputValueAsString(10, 'month');
    expect(inputValueAsStr).toBe('11');
  });

  it('should return year value as string', () => {
    const inputValueAsStr = DateUtils.getInputValueAsString(2019, 'year');
    expect(inputValueAsStr).toBe('2019');
  });

  it('should return hour value as string', () => {
    const inputValueAsStr = DateUtils.getInputValueAsString(10, 'hour');
    expect(inputValueAsStr).toBe('10');
  });

  it('should return day value as string', () => {
    const inputValueAsStr = DateUtils.getInputValueAsString(9, 'date');
    expect(inputValueAsStr).toBe('9');
  });
});


describe('getInputResetValue()', () => {
  const date = new Date('2019-01-10T12:30:00.000');

  it('should return min value when valueType is "start', () => {
    const resetValue = DateUtils.getInputResetValue(date, 'start', 'date');
    expect(resetValue).toBe(1);
  });

  it('should return max value when valueType is "end', () => {
    const resetValue = DateUtils.getInputResetValue(date, 'end', 'minute');
    expect(resetValue).toBe(DateUtils.MAX_MINUTE);
  });
});

describe('getNewDateValue()', () => {
  const date = new Date('2019-01-10T12:30:00.000');

  it('should return new date value with new hour set', () => {
    const newDate = DateUtils.getNewDateValue(date, 14, 'hour');
    expect(moment(newDate).hour()).toBe(14);
  })

  it('should return new date value with new month set', () => {
    const newDate = DateUtils.getNewDateValue(date, 11, 'month');
    expect(moment(newDate).month()).toBe(10);
  })
});
