import { OptionalDateInputProps } from '../DateInputProps';
import Validators from '../../validators/Validators';
import DateUtils from '../../dateutils/DateUtils';

export default class DateInputPropsValidator {
  static validatePropsInDevelopmentMode(props: OptionalDateInputProps): void {
    if (process.env.NODE_ENV === 'development') {
      Validators.validateIntegerWithinLimits(
        props.yearSingleClickStepCount,
        'yearSingleClickStepCount',
        1,
        DateUtils.getMaxValue('year')
      );

      Validators.validateZeroOrIntegerWithinLimits(
        props.yearDoubleClickStepCount,
        'buttonDoubleClickStepCountForHour',
        props.yearSingleClickStepCount + 1,
        DateUtils.getMaxValue('year')
      );

      Validators.validateIntegerWithinLimits(
        props.monthSingleClickStepCount,
        'monthSingleClickStepCount',
        1,
        DateUtils.getMaxValue('month')
      );

      Validators.validateZeroOrIntegerWithinLimits(
        props.monthDoubleClickStepCount,
        'monthDoubleClickStepCount',
        props.monthSingleClickStepCount + 1,
        DateUtils.getMaxValue('month')
      );

      Validators.validateIntegerWithinLimits(
        props.daySingleClickStepCount,
        'daySingleClickStepCount',
        1,
        DateUtils.getMaxValue('date')
      );

      Validators.validateZeroOrIntegerWithinLimits(
        props.dayDoubleClickStepCount,
        'dayDoubleClickStepCount',
        props.daySingleClickStepCount + 1,
        DateUtils.getMaxValue('date')
      );
    }
  }
}
