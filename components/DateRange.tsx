import React, { FC } from 'react';

import DateRangePicker, { DateRangePickerProps } from '@awsui/components-react/date-range-picker';

type DateRangeProps = {
  value: DateRangePickerProps.Value | null;
  onChange: (value: DateRangePickerProps.Value | null) => void;
};

const DateRange: FC<DateRangeProps> = ({ value, onChange }) => {
  return (
    <DateRangePicker
      isValidRange={() => ({ valid: true })}
      onChange={({ detail }) => onChange(detail.value)}
      value={value}
      relativeOptions={[
        {
          key: 'previous-5-minutes',
          amount: 5,
          unit: 'minute',
          type: 'relative',
        },
        {
          key: 'previous-30-minutes',
          amount: 30,
          unit: 'minute',
          type: 'relative',
        },
        {
          key: 'previous-1-hour',
          amount: 1,
          unit: 'hour',
          type: 'relative',
        },
        {
          key: 'previous-6-hours',
          amount: 6,
          unit: 'hour',
          type: 'relative',
        },
      ]}
      i18nStrings={{
        todayAriaLabel: 'Today',
        nextMonthAriaLabel: 'Next month',
        previousMonthAriaLabel: 'Previous month',
        customRelativeRangeDurationLabel: 'Duration',
        customRelativeRangeDurationPlaceholder: 'Enter duration',
        customRelativeRangeOptionLabel: 'Custom range',
        customRelativeRangeOptionDescription: 'Set a custom range in the past',
        customRelativeRangeUnitLabel: 'Unit of time',
        formatRelativeRange: (e) => {
          const t = 1 === e.amount ? e.unit : `${e.unit}s`;
          return `Last ${e.amount} ${t}`;
        },
        formatUnit: (e, t) => (1 === t ? e : `${e}s`),
        dateTimeConstraintText: 'Range must be between 6 and 30 days. Use 24 hour format.',
        relativeModeTitle: 'Relative range',
        absoluteModeTitle: 'Absolute range',
        relativeRangeSelectionHeading: 'Choose a range',
        startDateLabel: 'Start date',
        endDateLabel: 'End date',
        startTimeLabel: 'Start time',
        endTimeLabel: 'End time',
        clearButtonLabel: 'Clear and dismiss',
        cancelButtonLabel: 'Cancel',
        applyButtonLabel: 'Apply',
      }}
      placeholder="Filter by a date and time range"
    />
  );
};

export default DateRange;
