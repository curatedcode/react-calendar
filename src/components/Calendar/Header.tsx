import { calendarViewOptions, type CalendarViewType } from "../types";
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
    setCurrentView: (newView: string) => void;

    /**
     * The current calendar view
     */
    currentView: CalendarViewType;

    /**
     * All calendar view options
     */
    viewOptions: typeof calendarViewOptions;
  }) => React.ReactNode;
};

function CalendarHeader({ children }: CalendarHeaderProps) {
  const {
    selectedDate,
    setCurrentView,
    handleNextPeriod,
    handlePreviousPeriod,
    handleDateReset,
    currentView,
    viewOptions,
  } = useCalendarContext();

  return (
    <>
      {children({
        handleDateReset,
        selectedDate: selectedDate.toISOString(),
        setCurrentView,
        currentView,
        handleNextPeriod,
        handlePreviousPeriod,
        viewOptions,
      })}
    </>
  );
}

export default CalendarHeader;
