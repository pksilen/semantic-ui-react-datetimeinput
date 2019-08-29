import * as React from 'react';
import BaseInput from '../BaseInput';
import { BaseInputProps } from '../BaseInputProps';
import { InputType } from '../../types/InputType';
import { ClickType } from '../../types/ClickType';

export default class TestBaseInput extends BaseInput<BaseInputProps> {
  // eslint-disable-next-line class-methods-use-this
  getClickStepCount(inputType: InputType, clickType: ClickType): number {
    if (clickType === 'single') {
      return 1;
    }
    return 4;
  }

  timeoutIDMap: { [key: string]: number } = {
    'decrement hour': 0,
    'increment hour': 0
  };

  getTimeoutIDMap(): { [key: string]: number } {
    return this.timeoutIDMap;
  }

  render(): React.ReactElement {
    return (
      <div>
        {this.getButtonComponent('decrement')}
        {this.getInputComponent('hour')}
        {this.getInputComponent('minute')}
        {this.getButtonComponent('increment')}
      </div>
    );
  }
}
