import * as React from 'react';
import * as PropTypes from 'prop-types';
import BaseInput from '../baseinput/BaseInput';
import { OptionalBaseInputProps } from '../baseinput/BaseInputProps';
import { DateInputProps, DateInputPropTypes, OptionalDateInputProps } from './DateInputProps';
import { ClickType } from '../types/ClickType';
import DateInputPropsValidator from './propsvalidator/DateInputPropsValidator';
import styleMap from '../styleMap';
import { InputType } from '../types/InputType';

// noinspection JSUnusedGlobalSymbols
export default class DateInput extends BaseInput<DateInputProps> {
  static propTypes: DateInputPropTypes = {
    ...BaseInput.propTypes,
    daySingleClickStepCount: PropTypes.number,
    dayDoubleClickStepCount: PropTypes.number,
    monthSingleClickStepCount: PropTypes.number,
    monthDoubleClickStepCount: PropTypes.number,
    yearSingleClickStepCount: PropTypes.number,
    yearDoubleClickStepCount: PropTypes.number,
    dateFormat: PropTypes.oneOf(['D M YYYY', 'M D YYYY'])
  };

  static defaultProps: OptionalBaseInputProps & OptionalDateInputProps = {
    ...BaseInput.defaultProps,
    daySingleClickStepCount: 1,
    dayDoubleClickStepCount: 7,
    monthSingleClickStepCount: 1,
    monthDoubleClickStepCount: 3,
    yearSingleClickStepCount: 1,
    yearDoubleClickStepCount: 5,
    dateFormat: 'D M YYYY'
  };

  timeoutIDMap: { [key: string]: number } = {
    'decrement year': 0,
    'decrement month': 0,
    'decrement date': 0,
    'increment year': 0,
    'increment month': 0,
    'increment date': 0
  };

  clickToStepCountMap: {[key: string]: number} = {
    'year single': this.props.yearSingleClickStepCount,
    'month single': this.props.monthSingleClickStepCount,
    'date single': this.props.daySingleClickStepCount,
    'year double': this.props.yearDoubleClickStepCount,
    'month double': this.props.monthDoubleClickStepCount,
    'date double': this.props.dayDoubleClickStepCount
  };

  constructor(props: DateInputProps) {
    super(props);
    this.state = {
      focusedInputType: 'date'
    };
  }

  getTimeoutIDMap(): { [key: string]: number } {
    return this.timeoutIDMap;
  }

  getClickStepCount(inputType: InputType, clickType: ClickType): number {
    return this.clickToStepCountMap[`${inputType} ${clickType}`];
  }

  render(): React.ReactElement {
    DateInputPropsValidator.validatePropsInDevelopmentMode(this.props);

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
      daySingleClickStepCount,
      dayDoubleClickStepCount,
      monthSingleClickStepCount,
      monthDoubleClickStepCount,
      yearSingleClickStepCount,
      yearDoubleClickStepCount,
      dateFormat,
      ...restOfProps
    } = this.props;

    const firstInputType = dateFormat === 'D M YYYY' ? 'date' : 'month';
    const secondInputType = dateFormat === 'D M YYYY' ? 'month' : 'date';

    if (buttonPlacement === 'buttonsOutside') {
      const firstInputAdditionalStyle = styleMap.common.lightRightBorderColor;
      const secondInputAdditionalStyle = {
        ...styleMap.common.lightRightBorderColor,
        ...styleMap.common.noLeftBorder
      };

      const yearInputAdditionalStyle = {
        ...styleMap.common.noLeftBorder,
        ...styleMap.common.yearInput
      };

      if (dateFormat === 'D M YYYY') {
        return (
          <div {...restOfProps} style={styleMap.buttonsOutside.outerDiv}>
            {this.getButtonComponent('decrement', undefined, styleMap.buttonsOutside.button.decrement)}
            {this.getInputComponent(firstInputType, firstInputAdditionalStyle)}
            {this.getInputComponent(secondInputType, secondInputAdditionalStyle)}
            {this.getInputComponent('year', yearInputAdditionalStyle)}
            {this.getButtonComponent('increment', undefined, styleMap.buttonsOutside.button.increment)}
          </div>
        );
      }
    }

    const yearInputAdditionalStyle = {
      ...styleMap.common.yearInput,
      ...styleMap.buttonsInside.nonFirstInput
    };

    return (
      <div {...restOfProps} style={styleMap.buttonsInside.outerDiv}>
        {this.getInputComponent(firstInputType, styleMap.buttonsInside.firstInput)}
        <div style={styleMap.buttonsInside.button.div}>
          {this.getButtonComponent('increment', firstInputType, styleMap.buttonsInside.button.nonLast)}
          {this.getButtonComponent('decrement', firstInputType, styleMap.buttonsInside.button.nonLast)}
        </div>
        {this.getInputComponent(secondInputType, styleMap.buttonsInside.nonFirstInput)}
        <div style={styleMap.buttonsInside.button.div}>
          {this.getButtonComponent('increment', secondInputType, styleMap.buttonsInside.button.nonLast)}
          {this.getButtonComponent('decrement', secondInputType, styleMap.buttonsInside.button.nonLast)}
        </div>
        {this.getInputComponent('year', yearInputAdditionalStyle)}
        <div style={styleMap.buttonsInside.button.div}>
          {this.getButtonComponent('increment', 'year', styleMap.buttonsInside.button.lastIncrement)}
          {this.getButtonComponent('decrement', 'year', styleMap.buttonsInside.button.lastDecrement)}
        </div>
      </div>
    );
  }
}
