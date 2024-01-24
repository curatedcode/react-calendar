import { createContext, useContext } from "react";
import type getDayCellProps from "./getDayCellProps";

export type DatePickerContextType = {
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  monthYearLabel: string;
  weeks: string[][];
  viewRef: React.RefObject<HTMLTableSectionElement>;
  getDayCellProps: typeof getDayCellProps;
} | null;

export const DatePickerContext = createContext<DatePickerContextType>(null);

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);

  if (!context) {
    throw new Error("DatePicker components must be wrapped in <DatePicker />");
  }

  return context;
};
