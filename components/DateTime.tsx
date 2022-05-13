import React, { FC, useState } from 'react';

import { DateTime as DT, Duration } from 'luxon';

const getRelative = (dur: Duration): string => {
  const { years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0 } = dur.toObject();
  if (years > 0) return `${years} ${years > 1 ? 'years' : 'year'} ago`;
  else if (months > 0) return `${months} ${months > 1 ? 'months' : 'month'} ago`;
  else if (weeks > 0) return `${weeks} ${weeks > 1 ? 'weeks' : 'week'} ago`;
  else if (days > 0) return `${days} ${days > 1 ? 'days' : 'day'} ago`;
  else if (hours > 0) return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
  else if (minutes > 0) return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
  else return `...seconds ago`;
};

type DateTimeProps = {
  iso: string;
};

const DateTime: FC<DateTimeProps> = ({ iso }) => {
  const [relative, setRelative] = useState<boolean>(true);

  const dt = DT.fromISO(iso);
  const dtNow = DT.fromJSDate(new Date());
  const diffNow = dtNow.diff(dt, ['years', 'months', 'weeks', 'days', 'hours', 'minutes']);

  return relative ? (
    <span onClick={() => setRelative(!relative)}>{getRelative(diffNow)}</span>
  ) : (
    <span onClick={() => setRelative(!relative)}>{DT.fromISO(iso).toFormat('EEE, MMM d, yyyy, HH:mm:ss ZZ')}</span>
  );
};

export default DateTime;
