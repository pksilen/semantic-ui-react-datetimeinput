export default class Validators {
  static validateIntegerWithinLimits(
    value: number,
    valueName: string,
    minValue: number,
    maxValue: number
  ): void {
    if (!Number.isSafeInteger(value) || value < minValue || value > maxValue) {
      throw new Error(`${valueName} must be an integer between ${minValue} and ${maxValue}`);
    }
  }

  static validateZeroOrIntegerWithinLimits(
    value: number,
    valueName: string,
    minValue: number,
    maxValue: number
  ): void {
    if (!Number.isSafeInteger(value) || value !== 0 && (value < minValue || value > maxValue)) {
      throw new Error(`${valueName} must be zero or an integer between ${minValue} and ${maxValue}`);
    }
  }
}
