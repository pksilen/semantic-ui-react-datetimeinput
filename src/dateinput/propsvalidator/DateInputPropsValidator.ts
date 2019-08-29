import { DateInputProps } from '../DateInputProps';
import Validators from '../../validators/Validators';
import DateUtils from '../../dateutils/DateUtils';

export default class DateInputPropsValidator {
  static validatePropsInDevelopmentMode(props: DateInputProps): void {
    if (process.env.NODE_ENV === 'development') {
      Validators.validateIntegerWithinLimits(
        props.yearSingleClickStepCount,
        'yearSingleClickStepCount',
        DateUtils.getMinValue('year'),
        DateUtils.getMaxValue('year', props.dateValue)
      );

      Validators.validateZeroOrIntegerWithinLimits(
        props.yearDoubleClickStepCount,
        'buttonDoubleClickStepCountForHour',
        props.yearSingleClickStepCount + 1,
        DateUtils.getMaxValue('year', props.dateValue)
      );

      Validators.validateIntegerWithinLimits(
        props.monthSingleClickStepCount,
        'monthSingleClickStepCount',
        DateUtils.getMinValue('month'),
        DateUtils.getMaxValue('month', props.dateValue)
      );

      Validators.validateZeroOrIntegerWithinLimits(
        props.monthDoubleClickStepCount,
        'monthDoubleClickStepCount',
        props.monthSingleClickStepCount + 1,
        DateUtils.getMaxValue('month', props.dateValue)
      );

      Validators.validateIntegerWithinLimits(
        props.daySingleClickStepCount,
        'daySingleClickStepCount',
        DateUtils.getMinValue('date'),
        DateUtils.getMaxValue('date', props.dateValue)
      );

      Validators.validateZeroOrIntegerWithinLimits(
        props.dayDoubleClickStepCount,
        'dayDoubleClickStepCount',
        props.daySingleClickStepCount + 1,
        DateUtils.getMaxValue('date', props.dateValue)
      );
    }
  }
}