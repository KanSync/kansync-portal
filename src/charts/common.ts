export const CATEGORY_DONE = "Done";

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

/**
 * Calculate the time difference between two dates and then divide it with the number of milliseconds in a day to get the number of days.
 *
 * @param old Older date
 * @param recent More recent date
 *
 * @returns The number of days between the two dates.
 */
export function time_diff(old: Date, recent: Date) {
  return (recent.getTime() - old.getTime()) / DAY_IN_MS;
}

export function sum(numList: number[]) {
  return numList.reduce((partialSum, a) => partialSum + a, 0);
}

export function count(list: any[]) {
  return list.reduce(
    (acc, element) => ((acc[element] = acc[element] + 1 || 1), acc),
    {}
  );
}