// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import moment from 'moment';
import { ButtonType } from '../types/ButtonType';
import { InputType } from '../types/InputType';
import { StrictValueType } from '../types/ValueType';

export default class DateUtils {
  static readonly MAX_MONTH = 12;

  static readonly MAX_HOUR = 23;

  static readonly MAX_MINUTE = 59;

  static getMaxValue(inputType: InputType, currentDate: Date): number {
    switch (inputType) {
      case 'year':
        return Number.MAX_SAFE_INTEGER;

      case 'month':
        return DateUtils.MAX_MONTH;

      case 'date':
        return moment(currentDate).daysInMonth();

      case 'hour':
        return DateUtils.MAX_HOUR;

      case 'minute':
        return DateUtils.MAX_MINUTE;

      default:
        throw new Error('Invalid input type');
    }
  }

  static getMinValue(inputType: InputType): number {
    switch (inputType) {
      case 'year':
      case 'hour':
      case 'minute':
        return 0;

      case 'month':
      case 'date':
        return 1;

      default:
        throw new Error('Invalid input type');
    }
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
      if (newValue % stepCount) {
        newValue = newValue + stepCount - (newValue % stepCount);
      }
      const minValue = DateUtils.getMinValue(inputType);
      if (newValue < minValue) {
        newValue = minValue;
      }
    } else {
      newValue = currentValue + stepCount;
      if (newValue % stepCount) {
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
