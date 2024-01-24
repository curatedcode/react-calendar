import dayjs from "dayjs";
import { createContext, useContext } from "react";
import type {
  CalendarViewType,
  EventGroup,
  calendarViewOptions,
} from "../types";

export type CalendarContextType = {
  datePickerSelectedDate: dayjs.Dayjs;
  selectedDate: dayjs.Dayjs;
  currentView: CalendarViewType;
  setCurrentView: (newView: string) => void;
  viewOptions: typeof calendarViewOptions;
  handleNextPeriod: () => void;
  handlePreviousPeriod: () => void;
  handleDateReset: () => void;
  events: EventGroup[];
} | null;

export const CalendarContext = createContext<CalendarContextType>(null);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (context === null) {
    throw new Error("Calendar components must be wrapped in <Calendar />");
  }

  return context;
};
