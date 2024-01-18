import { useEffect, useRef, useState } from "react";
import { useCalendarContext } from "../Calendar/Context";
import getSixWeeksByMonth from "../fn/getSixWeeksByMonth";
import { DatePickerContext } from "./Context";
import Header from "./Header";
import View from "./View";

export type DatePickerProps = {
  /**
   * Required children:
   * <DatePicker.Header />
   * and
   * <DatePicker.View />
   */
  children: React.ReactNode;

  /**
   * Any classes
   */
  className?: string;
};

function DatePickerRoot({ children, className }: DatePickerProps) {
  const { datePickerSelectedDate } = useCalendarContext();

  const [selectedDay, setSelectedDay] = useState(datePickerSelectedDate);
  const [selectedMonth, setSelectedMonth] = useState(datePickerSelectedDate);
  const [weeks, setWeeks] = useState(getSixWeeksByMonth(selectedMonth));

  useEffect(() => {
    setSelectedDay(datePickerSelectedDate);
    setSelectedMonth(datePickerSelectedDate);
  }, [datePickerSelectedDate]);

  function handlePrevMonth() {
    setSelectedMonth((prev) => prev.subtract(1, "month"));
  }

  function handleNextMonth() {
    setSelectedMonth((prev) => prev.add(1, "month"));
  }

  useEffect(() => {
    setWeeks(getSixWeeksByMonth(selectedMonth));
  }, [selectedMonth]);

  const monthYearLabel = selectedMonth.format("MMMM YYYY");

  const viewRef = useRef<HTMLTableSectionElement>(null);

  return (
    <DatePickerContext.Provider
      value={{
        monthYearLabel,
        handleNextMonth,
        handlePrevMonth,
        selectedDay,
        selectedMonth,
        setSelectedDay,
        weeks,
        viewRef,
      }}
    >
      <div
        className={`space-y-3 text-sm ${className}`}
        aria-label={monthYearLabel}
        role="application"
      >
        {children}
      </div>
    </DatePickerContext.Provider>
  );
}

const DatePicker = Object.assign(DatePickerRoot, {
  Header,
  View,
});

export default DatePicker;
