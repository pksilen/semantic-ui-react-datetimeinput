import moment from 'moment';
import { ButtonType } from '../types/ButtonType';
import { ButtonPlacement } from '../types/ButtonPlacement';
import DateUtils from '../dateutils/DateUtils';
import { InputType } from '../types/InputType';

export default class ButtonUtils {
  static getButtonIconName(buttonType: ButtonType, buttonPlacement: ButtonPlacement): string {
    if (buttonPlacement === 'buttonsInside') {
      if (buttonType === 'increment') {
        return 'caret up';
      }
      return 'caret down';
    }

    if (buttonType === 'increment') {
      return 'plus';
    }
    return 'minus';
  }

  static isEnabledButton(
    value: Date,
    buttonType: ButtonType,
    inputType: InputType,
    stepCount: number
  ): boolean {
    const currentInputValue = moment(value).get(inputType);

    if (buttonType === 'increment') {
      const nextIncrementedInputValue = currentInputValue + stepCount;

      return nextIncrementedInputValue <= DateUtils.getMaxValue(inputType, value);
    }

    const nextDecrementedInputValue = currentInputValue - stepCount;
    return nextDecrementedInputValue >= DateUtils.getMinValue(inputType);
  }
}
