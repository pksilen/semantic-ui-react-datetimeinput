import * as React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow as renderShallow } from 'enzyme';
import DateTimeInput from './DateTimeInput';

const date = new Date('2019-01-10T12:30:00.000');
let onDateValueChangeMock: (newValue: Date) => void;

beforeEach(() => {
  onDateValueChangeMock = jest.fn();
});

describe('propTypes', () => {
  it('should validate prop types', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = DateTimeInput;

    expect(propTypes.daySingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.dayDoubleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.monthSingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.monthDoubleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.yearSingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.yearDoubleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.dateFormat).toBeTruthy();
    expect(propTypes.hourSingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.hourDoubleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.minuteSingleClickStepCount).toBe(PropTypes.number);
    expect(propTypes.minuteDoubleClickStepCount).toBe(PropTypes.number);
  });
});

describe('defaultProps', () => {
  it('should set default prop values correctly', () => {
    const dateTimeInputWrapper = mount(
      <DateTimeInput dateValue={new Date()} onDateValueChange={onDateValueChangeMock} />
    );

    expect(dateTimeInputWrapper.props().daySingleClickStepCount).toBe(1);
    expect(dateTimeInputWrapper.props().dayDoubleClickStepCount).toBe(7);
    expect(dateTimeInputWrapper.props().monthSingleClickStepCount).toBe(1);
    expect(dateTimeInputWrapper.props().monthDoubleClickStepCount).toBe(3);
    expect(dateTimeInputWrapper.props().yearSingleClickStepCount).toBe(1);
    expect(dateTimeInputWrapper.props().yearDoubleClickStepCount).toBe(5);
    expect(dateTimeInputWrapper.props().dateFormat).toBe('D M YYYY');
    expect(dateTimeInputWrapper.props().hourSingleClickStepCount).toBe(1);
    expect(dateTimeInputWrapper.props().hourDoubleClickStepCount).toBe(4);
    expect(dateTimeInputWrapper.props().minuteSingleClickStepCount).toBe(1);
    expect(dateTimeInputWrapper.props().minuteDoubleClickStepCount).toBe(5);
  });
});

describe('render()', () => {
  it('should render component correctly', () => {
    const timeInputWrapper = renderShallow(
      <DateTimeInput dateValue={date} onDateValueChange={onDateValueChangeMock} />
    );

    expect(timeInputWrapper).toMatchSnapshot();
  });

  it('should render additional props to outside div', () => {
    const dateTimeInputWrapper = mount(
      <DateTimeInput
        id="testId"
        className="testClassName"
        dateValue={date}
        onDateValueChange={onDateValueChangeMock}
      />
    );

    const outsideDivWrapper = dateTimeInputWrapper.find('div').first();

    expect(outsideDivWrapper.props().id).toBe('testId');
    expect(outsideDivWrapper.props().className).toBe('testClassName');
  });
});
