import * as React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow as renderShallow } from 'enzyme';
import TimeInput from './TimeInput';

const date = new Date('2019-01-10T12:30:00.000');
let onDateValueChangeMock: (newValue: Date) => void;

beforeEach(() => {
  onDateValueChangeMock = jest.fn();
});

describe('propTypes', () => {

  it('should validate prop types', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = TimeInput;

    expect(propTypes.hourSingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.hourDoubleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.minuteSingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.minuteDoubleClickStepCount).toBe(PropTypes.number);
  });
});

describe('defaultProps', () => {
  it('should set default prop values correctly', () => {
    const timeInputWrapper = mount(
      <TimeInput dateValue={new Date()} onDateValueChange={onDateValueChangeMock} />
    );

    expect(timeInputWrapper.props().hourSingleClickStepCount).toBe(1);
    expect(timeInputWrapper.props().hourDoubleClickStepCount).toBe(4);
    expect(timeInputWrapper.props().minuteSingleClickStepCount).toBe(1);
    expect(timeInputWrapper.props().minuteDoubleClickStepCount).toBe(5);
  });
});

describe('getTimeoutIDMap()', () => {
  it('should return correct timeoutID map', () => {
    const timeInput = new TimeInput({
      ...TimeInput.defaultProps,
      dateValue: new Date(),
      onDateValueChange: onDateValueChangeMock
    });

    const timeoutIDMap = timeInput.getTimeoutIDMap();

    expect(timeoutIDMap['decrement hour']).toBe(0);
    expect(timeoutIDMap['decrement minute']).toBe(0);
    expect(timeoutIDMap['decrement hour']).toBe(0);
    expect(timeoutIDMap['increment minute']).toBe(0);
  });
});

describe(' getClickStepCount()', () => {
  it('should return correct click step count', () => {
    const timeInput = new TimeInput({
      ...TimeInput.defaultProps,
      dateValue: new Date(),
      onDateValueChange: onDateValueChangeMock
    });

    expect(timeInput.getClickStepCount('hour', 'single')).toBe(timeInput.props.hourSingleClickStepCount);
    expect(timeInput.getClickStepCount('minute', 'single')).toBe(timeInput.props.minuteSingleClickStepCount);
    expect(timeInput.getClickStepCount('hour', 'double')).toBe(timeInput.props.hourDoubleClickStepCount);
    expect(timeInput.getClickStepCount('minute', 'double')).toBe(timeInput.props.minuteDoubleClickStepCount);
  });
});

describe('render()', () => {
  it('should render component correctly when buttonPlacement is "buttonsOutside"', () => {
    const timeInputWrapper = renderShallow(
      <TimeInput
        buttonPlacement="buttonsOutside"
        dateValue={date}
        onDateValueChange={onDateValueChangeMock}
      />
    );

    expect(timeInputWrapper).toMatchSnapshot();
  });

  it('should render component correctly when buttonPlacement is "buttonsInside"', () => {
    const timeInputWrapper = renderShallow(
      <TimeInput buttonPlacement="buttonsInside" dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );

    expect(timeInputWrapper).toMatchSnapshot();
  });

  it('should render additional props to outside div', () => {
    const timeInputWrapper = mount(
      <TimeInput
        id="testId"
        className="testClassName"
        dateValue={date}
        onDateValueChange={onDateValueChangeMock}
      />
    );

    const outsideDivWrapper = timeInputWrapper.find('div').first();

    expect(outsideDivWrapper.props().id).toBe('testId');
    expect(outsideDivWrapper.props().className).toBe('testClassName');
  });
});
