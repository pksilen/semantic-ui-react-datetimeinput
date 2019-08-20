export type ButtonPlacement = 'outsideOfInputs' | 'inlineWithInputs';
export type ButtonType = 'increment' | 'decrement';

interface BaseProps {
  value: Date;
  onChange: (newValue: Date) => void;
  buttonPlacement: ButtonPlacement;
  className: string;
  defaultValue: Date;
  id: string;
  size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
}

export interface TimeInputProps extends BaseProps {
  buttonSingleClickStepCountForHour: number;
  buttonDoubleClickStepCountForHour: number;
  buttonSingleClickStepCountForMinute: number;
  buttonDoubleClickStepCountForMinute: number;
}

export interface DateInputProps extends BaseProps {
  buttonSingleClickStepCountForDay: number;
  buttonDoubleClickStepCountForDay: number;
  buttonSingleClickStepCountForMonth: number;
  buttonDoubleClickStepCountForMonth: number;
  buttonSingleClickStepCountForYear: number;
  buttonDoubleClickStepCountForYear: number;
}

export type DateTimeInputProps = TimeInputProps & DateInputProps;
