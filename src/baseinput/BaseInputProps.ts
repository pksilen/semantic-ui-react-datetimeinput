import { HTMLAttributes } from 'react';
import { ButtonPlacement } from '../types/ButtonPlacement';
import { ValueType } from '../types/ValueType';

export interface RequiredBaseInputProps {
  dateValue: Date;
  onDateValueChange: (newValue: Date) => void;
}

export interface OptionalBaseInputProps extends HTMLAttributes<HTMLDivElement> {
  buttonPlacement: ButtonPlacement;
  doubleClickDelayInMillis: number,
  focusColor: string;
  showTooltipDelayInMillis: number,
  showTooltips: boolean;
  size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  valueType: ValueType;
}

export type BaseInputProps = RequiredBaseInputProps & OptionalBaseInputProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseInputPropTypes = {[key in keyof BaseInputProps]: any};
