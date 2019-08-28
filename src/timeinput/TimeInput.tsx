import * as React from 'react';
import * as PropTypes from 'prop-types';
import styleMap from '../styleMap';
import { OptionalTimeInputProps, TimeInputProps, TimeInputPropTypes } from './TimeInputProps';
import { TimeInputType } from '../types/TimeInputType';
import TimeInputPropsValidator from './propsvalidator/TimeInputPropsValidator';
import BaseInput from '../baseinput/BaseInput';
import { OptionalBaseInputProps } from '../baseinput/BaseInputProps';
import { ClickType } from '../types/ClickType';

// noinspection JSUnusedGlobalSymbols
export default class TimeInput extends BaseInput<TimeInputProps> {
  static propTypes: TimeInputPropTypes = {
    ...BaseInput.propTypes,
    hourSingleClickStepCount: PropTypes.number,
    hourDoubleClickStepCount: PropTypes.number,
    minuteSingleClickStepCount: PropTypes.number,
    minuteDoubleClickStepCount: PropTypes.number
  };

  static defaultProps: OptionalBaseInputProps & OptionalTimeInputProps = {
    ...BaseInput.defaultProps,
    hourSingleClickStepCount: 1,
    hourDoubleClickStepCount: 4,
    minuteSingleClickStepCount: 1,
    minuteDoubleClickStepCount: 5
  };

  timeoutIDMap: { [key: string]: number } = {
    'decrement hour': 0,
    'decrement minute': 0,
    'increment hour': 0,
    'increment minute': 0
  };

  clickToStepCountMap: { [key: string]: number } = {
    'hour single': this.props.hourSingleClickStepCount,
    'minute single': this.props.minuteSingleClickStepCount,
    'hour double': this.props.hourDoubleClickStepCount,
    'minute double': this.props.minuteDoubleClickStepCount
  };

  getTimeoutIDMap(): { [key: string]: number } {
    return this.timeoutIDMap;
  }

  getClickStepCount(inputType: TimeInputType, clickType: ClickType): number {
    return this.clickToStepCountMap[`${inputType} ${clickType}`];
  }

  render(): React.ReactElement {
    TimeInputPropsValidator.validatePropsInDevelopmentMode(this.props);

    const {
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
      ...restOfProps
    } = this.props;

    if (buttonPlacement === 'buttonsOutside') {
      return (
        <div {...restOfProps} style={styleMap.buttonsOutside.outerDiv}>
          {this.getButtonComponent('decrement', undefined, styleMap.buttonsOutside.button.decrement)}
          {this.getInputComponent('hour', styleMap.common.lightRightBorderColor)}
          {this.getInputComponent('minute', styleMap.common.noLeftBorder)}
          {this.getButtonComponent('increment', undefined, styleMap.buttonsOutside.button.increment)}
        </div>
      );
    }

    return (
      <div {...restOfProps} style={styleMap.buttonsInside.outerDiv}>
        {this.getInputComponent('hour', styleMap.buttonsInside.firstInput)}
        <div style={styleMap.buttonsInside.button.div}>
          {this.getButtonComponent('increment', 'hour', styleMap.buttonsInside.button.nonLast)}
          {this.getButtonComponent('decrement', 'hour', styleMap.buttonsInside.button.nonLast)}
        </div>
        {this.getInputComponent('minute', styleMap.buttonsInside.nonFirstInput)}
        <div style={styleMap.buttonsInside.button.div}>
          {this.getButtonComponent('increment', 'minute', styleMap.buttonsInside.button.lastIncrement)}
          {this.getButtonComponent('decrement', 'minute', styleMap.buttonsInside.button.lastDecrement)}
        </div>
      </div>
    );
  }
}
