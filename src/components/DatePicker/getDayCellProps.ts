/**
 * need to create a helper function that does the underlying things for the button so the user does not need to put things like "isSelectedMonth"
 * can be dealt with easily by passing in only a few required variables
 */

import dayjs from "dayjs";
import { useDatePickerContext } from "./Context";
import useDatePickerNav from "./useDatePickerNav";

export type GetDayCellPropsArgs = {
  /**
   * The date of the current cell
   */
  date: string;

  /**
   * Index of the week
   */
  weekIndex: number;

  /**
   * Should dates not in the current month be hidden?
   * @default false
   */
  hideDatesOutsideMonth?: boolean;
};

function getDayCellProps({
  date,
  weekIndex,
  hideDatesOutsideMonth = false,
}: GetDayCellPropsArgs) {
  const {
    selectedDay,
    selectedMonth,
    viewRef,
    handleNextMonth,
    handlePrevMonth,
    setSelectedDay,
  } = useDatePickerContext();

  const dateAsDayjs = dayjs(date);
  const isOutsideMonth = dateAsDayjs.month() !== selectedMonth.month();
  const isSelected = selectedDay.toISOString() === dateAsDayjs.toISOString();
  const isToday = dayjs().toISOString() === dateAsDayjs.toISOString();
  const isFirstDate = weekIndex === 0 && dateAsDayjs.date() === 1;

  const { buttonProps } = useDatePickerNav({
    handleNextMonth,
    handlePrevMonth,
    viewRef,
  });
  const { onClick: buttonOnClick, ...restBtnProps } = buttonProps(date);

  return {
    isOutsideMonth,
    type: "button" as const,
    role: "button" as const,
    "aria-disabled": isOutsideMonth,
    dateLabel: dateAsDayjs.date(),
    hidden: isOutsideMonth ? hideDatesOutsideMonth : false,
    "data-is-today": isToday,
    "data-is-selected": isSelected,
    "aria-label": dateAsDayjs.format("dddd, MMMM D, YYYY"),
    tabIndex: isFirstDate ? 0 : -1,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      buttonOnClick(e);
      isOutsideMonth && setSelectedDay(dateAsDayjs);
    },
    ...restBtnProps,
  };
}

export default getDayCellProps;
