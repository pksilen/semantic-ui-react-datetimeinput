import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Button, Popup } from 'semantic-ui-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import moment from 'moment';
import { BaseInputProps, BaseInputPropTypes, OptionalBaseInputProps } from './BaseInputProps';
import Constants from '../utils/Constants';
import { InputType } from '../types/InputType';
import { BaseInputState } from './BaseInputState';
import { ButtonType } from '../types/ButtonType';
import DateUtils from '../dateutils/DateUtils';
import styleMap from '../styleMap';
import { StrictValueType } from '../types/ValueType';
import ButtonUtils from '../utils/ButtonUtils';
import { ClickType } from '../types/ClickType';

export default abstract class BaseInput<Props extends BaseInputProps> extends React.Component<
  Props,
  BaseInputState
> {
  static propTypes: BaseInputPropTypes = {
    dateValue: PropTypes.instanceOf(Date).isRequired,
    onDateValueChange: PropTypes.func.isRequired,
    buttonPlacement: PropTypes.oneOf(['buttonsOutside', 'buttonsInside']),
    doubleClickDelayInMillis: PropTypes.number,
    focusColor: PropTypes.string,
    showTooltipDelayInMillis: PropTypes.number,
    showTooltips: PropTypes.bool,
    size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
    valueType: PropTypes.oneOf(['start', 'end', 'unspecified'])
  };

  static defaultProps: OptionalBaseInputProps = {
    buttonPlacement: 'buttonsOutside',
    focusColor: '#85b7d9',
    doubleClickDelayInMillis: Constants.DOUBLE_CLICK_DELAY_IN_MILLIS,
    showTooltipDelayInMillis: Constants.SHOW_TOOLTIP_DELAY_IN_MILLIS,
    showTooltips: true,
    size: 'small',
    valueType: 'start'
  };

  state: BaseInputState = {
    focusedInputType: 'hour'
  };

  abstract getTimeoutIDMap(): { [key: string]: number };

  abstract getClickStepCount(inputType: InputType, clickType: ClickType): number;

  onButtonClick = (
    buttonType: ButtonType,
    inputType: InputType,
    hasDoubleClicksEnabled = true
  ) => {
    const { dateValue } = this.props;
    const currentValue = moment(dateValue).get(inputType);
    const timeoutID = this.getTimeoutIDMap()[`${buttonType} ${inputType}`];

    if (timeoutID) {
      window.clearInterval(timeoutID);
      this.handleDoubleClick(buttonType, inputType, currentValue);
    } else if (hasDoubleClicksEnabled && this.hasDoubleClicksEnabled(inputType)) {
      this.handleDelayedSingleClick(buttonType, inputType, currentValue);
    } else {
      this.handleSingleClick(buttonType, inputType, currentValue);
    }
  };

  handleDoubleClick = (buttonType: ButtonType, inputType: InputType, currentValue: number) => {
    const stepCount = this.getClickStepCount(inputType, 'double');
    this.setNewValue(buttonType, inputType, currentValue, stepCount);
  };

  hasDoubleClicksEnabled = (inputType: InputType) => {
    const doubleClickStepCount = this.getClickStepCount(inputType, 'double');
    return doubleClickStepCount > 0;
  };

  handleDelayedSingleClick = (buttonType: ButtonType, inputType: InputType, currentValue: number) => {
    const { doubleClickDelayInMillis } = this.props;

    const newTimeoutID = window.setTimeout(() => {
      this.handleSingleClick(buttonType, inputType, currentValue);
    }, doubleClickDelayInMillis);

    this.setTimeoutID(newTimeoutID, `${buttonType} ${inputType}`);
  };

  handleSingleClick = (buttonType: ButtonType, inputType: InputType, currentValue: number) => {
    const stepCount = this.getClickStepCount(inputType, 'single');
    this.setNewValue(buttonType, inputType, currentValue, stepCount);
  };

  setNewValue = (buttonType: ButtonType, inputType: InputType, currentValue: number, stepCount: number) => {
    const { onDateValueChange, dateValue } = this.props;
    const newInputValue = DateUtils.getNewInputValue(
      buttonType,
      inputType,
      currentValue,
      stepCount,
      dateValue
    );

    onDateValueChange(DateUtils.getNewDateValue(dateValue, newInputValue, inputType));
    this.setTimeoutID(0, `${buttonType} ${inputType}`);
  };

  setTimeoutID = (timeoutID: number, timeoutIDName: string) => {
    this.getTimeoutIDMap()[timeoutIDName] = timeoutID;
  };

  changeValue = (newInputValueStr: string, inputType: InputType) => {
    const { onDateValueChange, dateValue } = this.props;
    const newInputValue = parseInt(newInputValueStr, 10);

    if (
      newInputValue >= DateUtils.getMinValue(inputType) &&
      newInputValue <= DateUtils.getMaxValue(inputType, dateValue)
    ) {
      onDateValueChange(DateUtils.getNewDateValue(dateValue, newInputValue, inputType));
    }
  };

  onInputFocus = (focusedInputType: InputType) => {
    this.setState({
      focusedInputType
    });
  };

  resetValue = (inputType: InputType) => {
    const { valueType, dateValue } = this.props;

    if (valueType !== 'unspecified' && inputType !== 'year') {
      const resetValue =
        valueType === 'start'
          ? DateUtils.getMinValue(inputType)
          : DateUtils.getMaxValue(inputType, dateValue);

      this.resetToValue(resetValue, inputType);
    }
  };

  resetToValue = (resetValue: number, inputType: InputType) => {
    const { onDateValueChange, dateValue } = this.props;
    onDateValueChange(
      moment(dateValue)
        .set(inputType, resetValue)
        .toDate()
    );
  };

  onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, inputType: InputType) => {
    const { dateValue } = this.props;
    
    event.stopPropagation();

    switch (event.key) {
      case 'ArrowUp':
      case '+':
        if (event.ctrlKey) {
          _.times(2, () => this.onButtonClick('increment', inputType));
        } else {
          this.onButtonClick('increment', inputType, false);
        }
        break;

      case 'ArrowDown':
      case '-':
        if (event.ctrlKey) {
          _.times(2, () => this.onButtonClick('decrement', inputType));
        } else {
          this.onButtonClick('decrement', inputType, false);
        }
        break;

      case 'PageUp':
        _.times(2, () => this.onButtonClick('increment', inputType));
        break;

      case 'PageDown':
        _.times(2, () => this.onButtonClick('decrement', inputType));
        break;

      case 'Home':
        this.resetToValue(DateUtils.getMinValue(inputType), inputType);
        break;

      case 'End':
        this.resetToValue(DateUtils.getMaxValue(inputType, dateValue), inputType);
        break;

      default:
    }
  };

  getInputComponent = (inputType: InputType, additionalStyleMap: object = {}): React.ReactElement => {
    const {
      buttonPlacement,
      focusColor,
      showTooltipDelayInMillis,
      showTooltips,
      size,
      dateValue,
      valueType
    } = this.props;

    const { focusedInputType } = this.state;

    const inputStyle = {
      ...styleMap.common.input,
      ...styleMap[buttonPlacement].input,
      ...additionalStyleMap
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
      this.changeValue(event.target.value, inputType);

    if (focusedInputType === inputType && focusColor) {
      inputStyle.color = focusColor;
      inputStyle.fontWeight = 'bold';
    }

    const inputComponent = (
      <div className={`ui input ${size}`}>
        <input
          type="text"
          style={inputStyle}
          maxLength={3}
          value={DateUtils.getInputValueAsString(moment(dateValue).get(inputType), inputType)}
          onDoubleClick={() => this.resetValue(inputType)}
          onChange={onChange}
          onFocus={() => this.onInputFocus(inputType)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => this.onKeyDown(event, inputType)}
        />
      </div>
    );

    if (showTooltips && valueType !== 'unspecified' && inputType !== 'year') {
      const inputResetValue = DateUtils.getInputResetValue(dateValue, valueType as StrictValueType, inputType);
      const tooltipText = `Double-click to set to ${inputResetValue}`;

      return (
        <Popup
          content={tooltipText}
          mouseEnterDelay={showTooltipDelayInMillis}
          mouseLeaveDelay={Constants.HIDE_TOOLTIP_DELAY_IN_MILLIS}
          on="hover"
          trigger={inputComponent}
        />
      );
    }

    return inputComponent;
  };

  getButtonComponent = (
    buttonType: ButtonType,
    possibleInputType?: InputType,
    additionalStyleMap: object = {}
  ): React.ReactElement => {
    const { buttonPlacement, showTooltipDelayInMillis, showTooltips, size, dateValue } = this.props;
    const { focusedInputType } = this.state;
    const inputType = possibleInputType || focusedInputType;
    const singleClickStepCount = this.getClickStepCount(inputType, 'single');

    const buttonStyle = {
      ...styleMap[buttonPlacement].button.base,
      ...additionalStyleMap
    };

    const buttonComponent = (
      <Button
        size={size}
        style={buttonStyle}
        icon={ButtonUtils.getButtonIconName(buttonType, buttonPlacement)}
        onClick={() => this.onButtonClick(buttonType, inputType)}
        disabled={!ButtonUtils.isEnabledButton(dateValue, buttonType, inputType, singleClickStepCount)}
      />
    );

    if (showTooltips) {
      const buttonDoubleClickStepCount = this.getClickStepCount(inputType, 'double');
      const tooltipText = `Double-click to ${buttonType} by ${buttonDoubleClickStepCount}`;
      return (
        <Popup
          content={tooltipText}
          mouseEnterDelay={showTooltipDelayInMillis}
          mouseLeaveDelay={Constants.HIDE_TOOLTIP_DELAY_IN_MILLIS}
          on="hover"
          trigger={buttonComponent}
        />
      );
    }

    return buttonComponent;
  };
}
