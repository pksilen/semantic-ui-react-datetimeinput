import * as React from 'react';
import { DateTimeInputProps, DateTimeInputPropTypes, DateTimeOptionalInputProps } from './DateTimeInputProps';
import TimeInput from '../timeinput/TimeInput';
import DateInput from '../dateinput/DateInput';
import { TimeInputProps } from '../timeinput/TimeInputProps';
import { DateInputProps } from '../dateinput/DateInputProps';

const DateTimeInput = ({
  onDateValueChange,
  dateValue,
  buttonPlacement,
  doubleClickDelayInMillis,
  focusColor,
  showTooltipDelayInMillis,
  showTooltips,
  size,
  valueType,
  hourSingleClickStepCount,
  hourDoubleClickStepCount,
  minuteSingleClickStepCount,
  minuteDoubleClickStepCount,
  daySingleClickStepCount,
  dayDoubleClickStepCount,
  monthSingleClickStepCount,
  monthDoubleClickStepCount,
  yearSingleClickStepCount,
  yearDoubleClickStepCount,
  dateFormat,
  ...restOfProps
}: DateTimeInputProps): React.ReactElement<DateTimeInputProps> => {
  const timeInputProps: TimeInputProps = {
    onDateValueChange,
    dateValue,
    buttonPlacement,
    doubleClickDelayInMillis,
    focusColor,
    showTooltipDelayInMillis,
    showTooltips,
    size,
    valueType,
    hourSingleClickStepCount,
    hourDoubleClickStepCount,
    minuteSingleClickStepCount,
    minuteDoubleClickStepCount
  };

  const dateInputProps: DateInputProps = {
    onDateValueChange,
    dateValue,
    buttonPlacement,
    doubleClickDelayInMillis,
    focusColor,
    showTooltipDelayInMillis,
    showTooltips,
    size,
    valueType,
    daySingleClickStepCount,
    dayDoubleClickStepCount,
    monthSingleClickStepCount,
    monthDoubleClickStepCount,
    yearSingleClickStepCount,
    yearDoubleClickStepCount,
    dateFormat
  };

  return (
    <div {...restOfProps}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DateInput className="dateInput" {...dateInputProps} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <TimeInput className="timeInput" {...timeInputProps} />
    </div>
  );
};

const propTypes: DateTimeInputPropTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...TimeInput.propTypes,
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...DateInput.propTypes,
};

DateTimeInput.propTypes = propTypes;

const defaultProps: DateTimeOptionalInputProps = {
  ...TimeInput.defaultProps,
  ...DateInput.defaultProps
};

DateTimeInput.defaultProps = defaultProps;

export default DateTimeInput;
