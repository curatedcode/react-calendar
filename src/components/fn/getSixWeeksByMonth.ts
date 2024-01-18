import dayjs from "dayjs";

/**
 * Gets the weeks from a month and fills the remaining days with dates surrounding the month
 * @param date - The date you want to get the weeks from
 * @returns A matrix of 6 arrays that contain 7 ISO dates
 */

function getSixWeeksByMonth(date: dayjs.Dayjs) {
  const month = date.month();
  const year = date.year();

  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 0 - firstDayOfMonth;

  const daysMatrix = new Array(6).fill([]).map(() =>
    new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount)).toISOString();
    })
  );

  return daysMatrix;
}

export default getSixWeeksByMonth;
