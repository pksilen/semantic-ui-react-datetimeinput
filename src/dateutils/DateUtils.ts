// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import moment from 'moment';
import { ButtonType } from '../types/ButtonType';
import { InputType } from '../types/InputType';
import { StrictValueType } from '../types/ValueType';

export default class DateUtils {
  static readonly MAX_MONTH = 12;

  static readonly MAX_DAY = 31;

  static readonly MAX_HOUR = 23;

  static readonly MAX_MINUTE = 59;

  static getMaxValue(inputType: InputType, currentDate?: Date): number {
    let maxValue = 0;

    switch (inputType) {
      case 'year':
        maxValue = Number.MAX_SAFE_INTEGER;
        break;

      case 'month':
        maxValue = DateUtils.MAX_MONTH;
        break;

      case 'date':
        if (currentDate) {
          maxValue = moment(currentDate).daysInMonth();
        }
        maxValue = DateUtils.MAX_DAY;
        break;

      case 'hour':
        maxValue = DateUtils.MAX_HOUR;
        break;

      case 'minute':
        maxValue = DateUtils.MAX_MINUTE;
        break;

      // no default
    }

    return maxValue;
  }

  static getMinValue(inputType: InputType): number {
    let minValue = 0;

    switch (inputType) {
      case 'year':
      case 'hour':
      case 'minute':
        minValue = 0;
        break;

      case 'month':
      case 'date':
        minValue = 1;
        break;

      // no default
    }

    return minValue;
  }

  static getNewInputValue(
    buttonType: ButtonType,
    inputType: InputType,
    currentValue: number,
    stepCount: number,
    currentDate: Date
  ): number {
    let newValue;

    if (buttonType === 'decrement') {
      newValue = currentValue - stepCount;
      if (newValue % stepCount && inputType !== 'date') {
        newValue = newValue + stepCount - (newValue % stepCount);
      }
      const minValue = DateUtils.getMinValue(inputType);
      if (newValue < minValue) {
        newValue = minValue;
      }
    } else {
      newValue = currentValue + stepCount;
      if (newValue % stepCount && inputType !== 'date') {
        newValue -= newValue % stepCount;
      }
      const maxValue = DateUtils.getMaxValue(inputType, currentDate);
      if (newValue > maxValue) {
        newValue = maxValue;
      }
    }

    return newValue;
  }

  static getInputValueAsString(inputValue: number, inputType: InputType): string {
    if (inputType === 'minute' && inputValue <= 9) {
      return `0${inputValue}`;
    }
    if (inputType === 'month') {
      return (inputValue + 1).toString();
    }

    return inputValue.toString();
  }

  static getInputResetValue(value: Date, valueType: StrictValueType, inputType: InputType): number {
    return valueType === 'start' ? DateUtils.getMinValue(inputType) : DateUtils.getMaxValue(inputType, value);
  }

  static getNewDateValue(currentValue: Date, newInputValue: number, inputType: InputType): Date {
    let modifiedNewInputValue = newInputValue;

    if (inputType === 'month') {
      modifiedNewInputValue = newInputValue - 1;
    }

    return moment(currentValue)
      .set(inputType, modifiedNewInputValue)
      .toDate();
  }
}
