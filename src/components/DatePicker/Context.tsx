import type dayjs from "dayjs";
import { createContext, useContext } from "react";

export type DatePickerContextType = {
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  monthYearLabel: string;
  selectedMonth: dayjs.Dayjs;
  setSelectedDay: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  selectedDay: dayjs.Dayjs;
  weeks: string[][];
  viewRef: React.RefObject<HTMLTableSectionElement>;
} | null;

export const DatePickerContext = createContext<DatePickerContextType>(null);

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);

  if (!context) {
    throw new Error("DatePicker components must be wrapped in <DatePicker />");
  }

  return context;
};
