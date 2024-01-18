import { useMemo } from "react";
import {
  calendarViewOptions,
  readableCalendarViewOptions,
  type ReadableCalendarViewType,
} from "../types";
import { useCalendarContext } from "./Context";

export type CalendarHeaderProps = {
  children: (_: {
    /**
     * Resets the calendar date to today.
     */
    handleDateReset: () => void;

    /**
     * The calendars selected date in ISO format
     */
    selectedDate: string;

    /**
     * Navigate to the previous period. E.g., if current view is "week" it will go back 7 days.
     */
    handlePreviousPeriod: () => void;

    /**
     * Navigate to the next period. E.g., if current view is "week" it will go forward 7 days.
     */
    handleNextPeriod: () => void;

    /**
     * This uses a non-typesafe string so you can pass in the value of "e.currentTarget.value".
     * It will check if any option matches otherwise do nothing.
     */
    setView: (view: string) => void;

    /**
     * The current calendar view
     */
    currentView: ReadableCalendarViewType;

    /**
     * The options for the view.
     */
    viewOptions: typeof readableCalendarViewOptions;
  }) => React.ReactNode;
};

function CalendarHeader({ children }: CalendarHeaderProps) {
  const {
    calendarSelectedDate,
    calendarView,
    setCalendarView: setCalendarViewInternal,
    handleCalendarNextPeriod,
    handleCalendarPreviousPeriod,
    handleCalendarDateReset,
  } = useCalendarContext();

  function setView(value: string) {
    const match = calendarViewOptions.find(
      (option) => option.readable === value
    );

    if (!match) return;
    setCalendarViewInternal(match.internal);
  }

  const readableCalendarView = useMemo(() => {
    const match = calendarViewOptions.find(
      (option) => option.internal === calendarView
    );

    if (!match) return calendarViewOptions[0].readable;

    return match.readable;
  }, [calendarView]);

  return (
    <>
      {children({
        viewOptions: readableCalendarViewOptions,
        handleDateReset: handleCalendarDateReset,
        selectedDate: calendarSelectedDate.toISOString(),
        setView,
        currentView: readableCalendarView,
        handleNextPeriod: handleCalendarNextPeriod,
        handlePreviousPeriod: handleCalendarPreviousPeriod,
      })}
    </>
  );
}

export default CalendarHeader;
