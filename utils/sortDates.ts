import { DateTime } from 'luxon';

export const sortDates = (a: string, b: string) => {
  const l = DateTime.fromISO(a);
  const r = DateTime.fromISO(b);
  return l.toMillis() - r.toMillis();
};
