import { Props, ValueType } from './Types';
import Validators from './Validators';

export default class PropValidators {
  static validateValue(props: Props): void {
    PropValidators.validateEmptyValue(props.allowEmptyValue, props.value);
    if (props.allowEmptyValue && !props.value) {
      return;
    }
    const value = NumberUtils.getParsedValue(props.value, props.valueType);
    if (!Validators.isValidValue(value, props.valueType)) {
      throw new Error(
        'value must be a string that can be parsed to integer/decimal number depending on valueType'
      );
    }
  }

  static validateEmptyValue(allowEmptyValue: boolean, value: string) {
    if (!allowEmptyValue && !value) {
      throw new Error('value is required');
    }
  }

  static validateDefaultValue(props: Props): void {
    if (props.defaultValue !== undefined && !Validators.isValidValue(props.defaultValue, props.valueType)) {
      throw new Error('defaultValue must be integer/decimal number depending on valueType');
    }
  }

  static validateMinValue(props: Props): void {
    if (props.minValue > props.maxValue) {
      throw new Error('maxValue must greater than or equal to minValue');
    }
    PropValidators.validateMinOrMaxValue(props.valueType, props.minValue, 'minValue', props.maxLength);
  }

  static validateMaxValue = (props: Props): void =>
    PropValidators.validateMinOrMaxValue(props.valueType, props.maxValue, 'maxValue', props.maxLength);

  static validateMinOrMaxValue(
    valueType: ValueType,
    value: number,
    valueName: string,
    maxLength: number
  ): void {
    if (!Validators.isValidValue(value, valueType)) {
      throw new Error(`${valueName} must be integer/decimal number depending on valueType`);
    }
    if (value.toString().length > maxLength) {
      throw new Error(`${valueName} does not fit in maxLength`);
    }
  }

  static validateMaxLength(props: Props): void {
    Validators.validatePositiveInteger(props.maxLength, 'maxLength');
  }

  static validatePrecision(props: Props): void {
    Validators.validatePositiveInteger(props.precision, 'precision');
  }

  static validateStepAmount(props: Props): void {
    if (!Validators.isValidValue(props.stepAmount, props.valueType) || props.stepAmount <= 0) {
      throw new Error('stepAmount must be a positive integer/decimal number depending on valueType');
    }
  }

  static validatePropsInDevelopmentMode(props: Props): void {
    if (process.env.NODE_ENV === 'development') {
      PropValidators.validateValue(props);
      PropValidators.validateDefaultValue(props);
      PropValidators.validateMinValue(props);
      PropValidators.validateMaxValue(props);
      PropValidators.validateMaxLength(props);
      PropValidators.validatePrecision(props);
      PropValidators.validateStepAmount(props);
    }
  }
}
