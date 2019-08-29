import { OptionalTimeInputProps } from '../TimeInputProps';
import Validators from '../../validators/Validators';
import DateUtils from '../../dateutils/DateUtils';

export default class TimeInputPropsValidator {
  static validatePropsInDevelopmentMode(props: OptionalTimeInputProps): void {
    if (process.env.NODE_ENV === 'development') {
      Validators.validateIntegerWithinLimits(
        props.hourSingleClickStepCount,
        'buttonSingleClickStepCountForHour',
        1,
        DateUtils.MAX_HOUR
      );

      Validators.validateZeroOrIntegerWithinLimits(
        props.hourDoubleClickStepCount,
        'buttonDoubleClickStepCountForHour',
        props.hourSingleClickStepCount + 1,
        DateUtils.MAX_HOUR
      );

      Validators.validateIntegerWithinLimits(
        props.minuteSingleClickStepCount,
        'buttonSingleClickStepCountForMinute',
        1,
        DateUtils.MAX_MINUTE
      );

      Validators.validateZeroOrIntegerWithinLimits(
        props.minuteDoubleClickStepCount,
        'buttonDoubleClickStepCountForMinute',
        props.minuteSingleClickStepCount + 1,
        DateUtils.MAX_MINUTE
      );
    }
  }
}
