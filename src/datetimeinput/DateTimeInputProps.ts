import { OptionalTimeInputProps } from '../timeinput/TimeInputProps';
import { OptionalDateInputProps } from '../dateinput/DateInputProps';
import { BaseInputProps, OptionalBaseInputProps } from '../baseinput/BaseInputProps';

export type DateTimeOptionalInputProps = OptionalBaseInputProps &
  OptionalTimeInputProps &
  OptionalDateInputProps;
export type DateTimeInputProps = BaseInputProps & OptionalTimeInputProps & OptionalDateInputProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DateTimeInputPropTypes = { [key in keyof DateTimeInputProps]: any };
