import { DateRangePickerProps } from '@awsui/components-react/date-range-picker';
import { DateTime, Duration } from 'luxon';

export const dateRangeFilter = (dateRange: DateRangePickerProps.Value, date: string): boolean => {
  const { type } = dateRange;
  switch (type) {
    case 'absolute':
      return absoluteFilter(dateRange, date);
    case 'relative':
      return relativeFilter(dateRange, date);
  }
};

const absoluteFilter = (dateRange: DateRangePickerProps.AbsoluteValue, date: string): boolean => {
  const { startDate, endDate } = dateRange;
  const startDT = DateTime.fromISO(startDate).toSeconds();
  const endDT = DateTime.fromISO(endDate).toSeconds();
  const dateDT = Math.floor(DateTime.fromISO(date).toSeconds());
  return dateDT >= startDT && dateDT <= endDT;
};
const relativeFilter = (dateRange: DateRangePickerProps.RelativeValue, date: string): boolean => {
  const { amount, unit } = dateRange;
  const diffNow = DateTime.fromISO(date).diffNow(unit);
  const relativeDT = Duration.fromObject({ [unit]: -amount });
  return relativeDT.valueOf() <= diffNow.valueOf();
};
