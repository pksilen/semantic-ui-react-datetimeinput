import * as React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow as renderShallow } from 'enzyme';
import DateInput from './DateInput';

const date = new Date('2019-01-10T12:30:00.000');
let onDateValueChangeMock: (newValue: Date) => void;

beforeEach(() => {
  onDateValueChangeMock = jest.fn();
});

describe('propTypes', () => {
  it('should validate prop types', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = DateInput;

    expect(propTypes.daySingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.dayDoubleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.monthSingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.monthDoubleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.yearSingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.yearDoubleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.dateFormat).toBeTruthy();
  });
});

describe('defaultProps', () => {
  it('should set default prop values correctly', () => {
    const dateInputWrapper = mount(
      <DateInput dateValue={new Date()} onDateValueChange={onDateValueChangeMock} />
    );

    expect(dateInputWrapper.props().daySingleClickStepCount).toBe(1);
    expect(dateInputWrapper.props().dayDoubleClickStepCount).toBe(7);
    expect(dateInputWrapper.props().monthSingleClickStepCount).toBe(1);
    expect(dateInputWrapper.props().monthDoubleClickStepCount).toBe(3);
    expect(dateInputWrapper.props().yearSingleClickStepCount).toBe(1);
    expect(dateInputWrapper.props().yearDoubleClickStepCount).toBe(5);
    expect(dateInputWrapper.props().dateFormat).toBe('D M YYYY');
  });
});

describe('constructor', () => {
  it('should set focusedInputType correctly in state', () => {
    const dateInputWrapper = mount(
      <DateInput dateValue={new Date()} onDateValueChange={onDateValueChangeMock} />
    );

    expect(dateInputWrapper.state('focusedInputType')).toBe('date');
  });
});

describe('getTimeoutIDMap()', () => {
  it('should return correct timeoutID map', () => {
    const dateInput = new DateInput({
      ...DateInput.defaultProps,
      dateValue: new Date(),
      onDateValueChange: onDateValueChangeMock
    });

    const timeoutIDMap = dateInput.getTimeoutIDMap();

    expect(timeoutIDMap['decrement year']).toBe(0);
    expect(timeoutIDMap['decrement month']).toBe(0);
    expect(timeoutIDMap['decrement date']).toBe(0);
    expect(timeoutIDMap['increment year']).toBe(0);
    expect(timeoutIDMap['increment month']).toBe(0);
    expect(timeoutIDMap['increment date']).toBe(0);
  });
});

describe(' getClickStepCount()', () => {
  it('should return correct click step count', () => {
    const dateInput = new DateInput({
      ...DateInput.defaultProps,
      dateValue: new Date(),
      onDateValueChange: onDateValueChangeMock
    });

    expect(dateInput.getClickStepCount('year', 'single')).toBe(dateInput.props.yearSingleClickStepCount);
    expect(dateInput.getClickStepCount('month', 'single')).toBe(dateInput.props.monthSingleClickStepCount);
    expect(dateInput.getClickStepCount('date', 'single')).toBe(dateInput.props.daySingleClickStepCount);
    expect(dateInput.getClickStepCount('year', 'double')).toBe(dateInput.props.yearDoubleClickStepCount);
    expect(dateInput.getClickStepCount('month', 'double')).toBe(dateInput.props.monthDoubleClickStepCount);
    expect(dateInput.getClickStepCount('date', 'double')).toBe(dateInput.props.dayDoubleClickStepCount);
  });
});

describe('render()', () => {
  it('should render component correctly when buttonPlacement is "buttonsOutside" and dateFormat is "D M YYYY"', () => {
    const dateInputWrapper = renderShallow(
      <DateInput
        buttonPlacement="buttonsOutside"
        dateFormat="D M YYYY"
        dateValue={date}
        onDateValueChange={onDateValueChangeMock}
      />
    );

    expect(dateInputWrapper).toMatchSnapshot();
  });

  it('should render component correctly when buttonPlacement is "buttonsOutside" and dateFormat is "M D YYYY"', () => {
    const dateInputWrapper = renderShallow(
      <DateInput
        buttonPlacement="buttonsOutside"
        dateFormat="M D YYYY"
        dateValue={date}
        onDateValueChange={onDateValueChangeMock}
      />
    );

    expect(dateInputWrapper).toMatchSnapshot();
  });

  it('should render component correctly when buttonPlacement is "buttonsInside" and dateFormat is "D M YYYY"', () => {
    const dateInputWrapper = renderShallow(
      <DateInput
        buttonPlacement="buttonsInside"
        dateFormat="D M YYYY"
        dateValue={date}
        onDateValueChange={onDateValueChangeMock}
      />
    );

    expect(dateInputWrapper).toMatchSnapshot();
  });

  it('should render component correctly when buttonPlacement is "buttonsInside" and dateFormat is "M D YYYY"', () => {
    const dateInputWrapper = renderShallow(
      <DateInput
        buttonPlacement="buttonsInside"
        dateFormat="M D YYYY"
        dateValue={date}
        onDateValueChange={onDateValueChangeMock}
      />
    );

    expect(dateInputWrapper).toMatchSnapshot();
  });

  it('should render component correctly without tooltips', () => {
    const dateInputWrapper = renderShallow(
      <DateInput showTooltips={false} dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );

    expect(dateInputWrapper).toMatchSnapshot();
  });

  it('should render additional props to outside div', () => {
    const dateInputWrapper = mount(
      <DateInput
        id="testId"
        className="testClassName"
        dateValue={date}
        onDateValueChange={onDateValueChangeMock}
      />
    );

    const outsideDivWrapper = dateInputWrapper.find('div').first();

    expect(outsideDivWrapper.props().id).toBe('testId');
    expect(outsideDivWrapper.props().className).toBe('testClassName');
  });
});
