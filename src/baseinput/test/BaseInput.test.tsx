import * as React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Constants from '../../utils/Constants';
import TestBaseInput from './TestBaseInput';

const date = new Date('2019-01-10T12:30:00.000');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let onDateValueChangeMock: any;

beforeEach(() => {
  onDateValueChangeMock = jest.fn();
});

describe('propTypes', () => {
  it('should validate prop types', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = TestBaseInput;

    expect(propTypes.dateValue).toBeTruthy();
    expect(propTypes.onDateValueChange).toBe(PropTypes.func.isRequired);
    expect(propTypes.buttonPlacement).toBeTruthy();
    expect(propTypes.doubleClickDelayInMillis).toBe(PropTypes.number);
    expect(propTypes.focusColor).toBe(PropTypes.string);
    expect(propTypes.showTooltipDelayInMillis).toBe(PropTypes.number);
    expect(propTypes.showTooltips).toBe(PropTypes.bool);
    expect(propTypes.size).toBeTruthy();
    expect(propTypes.valueType).toBeTruthy();
  });
});

describe('defaultProps', () => {
  it('should set default prop values', () => {
    const testBaseInputWrapper = mount(
      <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );

    expect(testBaseInputWrapper.props().buttonPlacement).toBe('buttonsOutside');
    expect(testBaseInputWrapper.props().focusColor).toBe('#85b7d9');
    expect(testBaseInputWrapper.props().doubleClickDelayInMillis).toBe(
      Constants.DOUBLE_CLICK_DELAY_IN_MILLIS
    );
    expect(testBaseInputWrapper.props().showTooltipDelayInMillis).toBe(
      Constants.SHOW_TOOLTIP_DELAY_IN_MILLIS
    );
    expect(testBaseInputWrapper.props().showTooltips).toBe(true);
    expect(testBaseInputWrapper.props().size).toBe('small');
    expect(testBaseInputWrapper.props().valueType).toBe('start');
  });
});

describe('state', () => {
  it('should set focusedInputType correctly in state', () => {
    const testBaseInputWrapper = mount(
      <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );
    expect(testBaseInputWrapper.state('focusedInputType')).toBe('hour');
  });
});

describe('onButtonClick()', () => {
  it('should decrement hour value by 4 on double click', (done) => {
    const testBaseInputWrapper = mount(
      <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );
    const decrementButtonWrapper = testBaseInputWrapper.find('button').first();

    decrementButtonWrapper.simulate('click');
    setTimeout(() => {
      decrementButtonWrapper.simulate('click');
      expect(onDateValueChangeMock.mock.calls[0][0].getTime()).toBe(
        new Date('2019-01-10T08:30:00.000').getTime()
      );
      done();
    }, 50);
  });

  it('should increment hour value by 4 on double click', (done) => {
    const testBaseInputWrapper = mount(
      <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );
    const incrementButtonWrapper = testBaseInputWrapper.find('button').last();

    incrementButtonWrapper.simulate('click');
    setTimeout(() => {
      incrementButtonWrapper.simulate('click');
      expect(onDateValueChangeMock.mock.calls[0][0].getTime()).toBe(
        new Date('2019-01-10T16:30:00.000').getTime()
      );
      done();
    }, 50);
  });

  it('should decrement hour value by 1 on single click', () => {
    jest.useFakeTimers();
    const testBaseInputWrapper = mount(
      <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );
    const decrementButtonWrapper = testBaseInputWrapper.find('button').first();

    decrementButtonWrapper.simulate('click');
    jest.advanceTimersByTime(testBaseInputWrapper.props().doubleClickDelayInMillis + 100);

    expect(onDateValueChangeMock.mock.calls[0][0].getTime()).toBe(
      new Date('2019-01-10T11:30:00.000').getTime()
    );
  });

  it('should increment hour value by 1 on single click', () => {
    jest.useFakeTimers();
    const testBaseInputWrapper = mount(
      <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );
    const incrementButtonWrapper = testBaseInputWrapper.find('button').last();

    incrementButtonWrapper.simulate('click');
    jest.advanceTimersByTime(testBaseInputWrapper.props().doubleClickDelayInMillis + 100);

    expect(onDateValueChangeMock.mock.calls[0][0].getTime()).toBe(
      new Date('2019-01-10T13:30:00.000').getTime()
    );
  });


});

describe('changeValue()', () => {
  it('should change the input value when value is in correct range', () => {
    const testBaseInputWrapper = mount(
      <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );
    const inputWrapper = testBaseInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '14' } });

    expect(onDateValueChangeMock.mock.calls[0][0].getTime()).toBe(
      new Date('2019-01-10T14:30:00.000').getTime()
    );
  });
});

describe('resetValue()', () => {
  it('should change the hour value to minimum when valueType is "start"', () => {
    const testBaseInputWrapper = mount(
      <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );
    const inputWrapper = testBaseInputWrapper.find('input');

    inputWrapper.simulate('dblclick');

    expect(onDateValueChangeMock.mock.calls[0][0].getTime()).toBe(
      new Date('2019-01-10T00:30:00.000').getTime()
    );
  });

  it('should change the hour value to maximum when valueType is "end"', () => {
    const testBaseInputWrapper = mount(
      <TestBaseInput valueType="end" dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );
    const inputWrapper = testBaseInputWrapper.find('input');

    inputWrapper.simulate('dblclick');

    expect(onDateValueChangeMock.mock.calls[0][0].getTime()).toBe(
      new Date('2019-01-10T23:30:00.000').getTime()
    );
  });
});

describe('onKeyDown()', () => {
  test.each([
    ['ArrowUp', '2019-01-10T13:30:00.000'],
    ['+', '2019-01-10T13:30:00.000'],
    ['ArrowDown', '2019-01-10T11:30:00.000'],
    ['-', '2019-01-10T11:30:00.000'],
    ['PageUp', '2019-01-10T16:30:00.000'],
    ['PageDown', '2019-01-10T08:30:00.000'],
    ['Home', '2019-01-10T00:30:00.000'],
    ['End', '2019-01-10T23:30:00.000'],
  ])(
    'it should increment hour value correctly when key is pressed in focused input',
    (key, expectedDate) => {
      const testBaseInputWrapper = mount(
        <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
      );
      const inputWrapper = testBaseInputWrapper.find('input');

      inputWrapper.simulate('focus');
      inputWrapper.simulate('keydown', { key });

      expect(onDateValueChangeMock.mock.calls[0][0].getTime()).toBe(new Date(expectedDate).getTime());
    }
  );

  test.each([
    ['ArrowUp', '2019-01-10T16:30:00.000'],
    ['+', '2019-01-10T16:30:00.000'],
    ['ArrowDown', '2019-01-10T08:30:00.000'],
    ['-', '2019-01-10T08:30:00.000'],
  ])(
    'it should decrement hour value correctly when key is pressed with ctrl key down in focused input',
    (key, expectedDate) => {
      const testBaseInputWrapper = mount(
        <TestBaseInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
      );
      const inputWrapper = testBaseInputWrapper.find('input');

      inputWrapper.simulate('focus');
      inputWrapper.simulate('keydown', { key, ctrlKey: true });

      expect(onDateValueChangeMock.mock.calls[0][0].getTime()).toBe(new Date(expectedDate).getTime());
    }
  );
});
