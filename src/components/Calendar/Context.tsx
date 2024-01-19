import dayjs from "dayjs";
import { createContext, useContext } from "react";
import type { CalendarViewType, EventGroup } from "../types";

export type CalendarContextType = {
  datePickerSelectedDate: dayjs.Dayjs;
  calendarSelectedDate: dayjs.Dayjs;
  calendarView: CalendarViewType;
  setCalendarView: React.Dispatch<React.SetStateAction<CalendarViewType>>;
  handleCalendarNextPeriod: () => void;
  handleCalendarPreviousPeriod: () => void;
  handleCalendarDateReset: () => void;
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
