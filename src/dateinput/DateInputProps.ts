import { BaseInputProps } from '../baseinput/BaseInputProps';

export interface OptionalDateInputProps {
  daySingleClickStepCount: number;
  dayDoubleClickStepCount: number;
  monthSingleClickStepCount: number;
  monthDoubleClickStepCount: number;
  yearSingleClickStepCount: number;
  yearDoubleClickStepCount: number;
  dateFormat: 'D M YYYY' | 'M D YYYY';
}

export interface DateInputProps extends BaseInputProps, OptionalDateInputProps {
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DateInputPropTypes = {[key in keyof DateInputProps]: any};
