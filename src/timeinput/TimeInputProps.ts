import { BaseInputProps } from '../baseinput/BaseInputProps';

export interface OptionalTimeInputProps {
  hourSingleClickStepCount: number;
  hourDoubleClickStepCount: number;
  minuteSingleClickStepCount: number;
  minuteDoubleClickStepCount: number;
}

export interface TimeInputProps extends BaseInputProps, OptionalTimeInputProps {
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TimeInputPropTypes = {[key in keyof TimeInputProps]: any};
