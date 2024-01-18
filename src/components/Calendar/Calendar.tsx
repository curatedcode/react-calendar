import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "../../global.css";
import groupEvents from "../fn/groupEvents";
import type { CalendarViewType, EventType } from "../types";
import { CalendarContext } from "./Context";
import Header from "./Header";
import View from "./View";

export type CalendarProps = {
  /**
   * Required children:
   * <Calendar.Header />
   * and
   * <Calendar.View />
   */
  children: React.ReactNode;

  /**
   * The view the calendar will be initially loaded with.
   */
  defaultView?: CalendarViewType;

  /**
   * All of your calendar events
   */
  events: EventType[];

  className?: string;
};

function CalendarRoot({
  children,
  defaultView = "5-days",
  events,
  className,
}: CalendarProps) {
  const [calendarSelectedDate, setCalendarSelectedDate] = useState(dayjs());

  const [datePickerSelectedDate, setDatePickerSelectedDate] = useState(dayjs());

  const [calendarView, setCalendarView] =
    useState<CalendarViewType>(defaultView);

  const [groupedEvents, setGroupedEvents] = useState(
    groupEvents({ calendarSelectedDate, calendarView, events })
  );

  function getTimeline() {
    let time: number;
    let units: "days" | "months";

    switch (calendarView) {
      case "day":
        time = 1;
        units = "days";
        break;
      case "week":
        time = 7;
        units = "days";
        break;
      case "5-days":
        time = 5;
        units = "days";
        break;
      case "month":
        time = 1;
        units = "months";
        break;
      case "year":
        time = 1;
        units = "days";
        break;
      case "schedule":
        time = 4;
        units = "days";
        break;
    }

    return { time, units };
  }

  function handleCalendarNextPeriod() {
    const timelineToGoForward = getTimeline();

    setDatePickerSelectedDate((date) =>
      date.add(timelineToGoForward.time, timelineToGoForward.units)
    );

    setCalendarSelectedDate((date) =>
      date.add(timelineToGoForward.time, timelineToGoForward.units)
    );
  }

  function handleCalendarPreviousPeriod() {
    const timelineToGoBack = getTimeline();

    setDatePickerSelectedDate((date) =>
      date.subtract(timelineToGoBack.time, timelineToGoBack.units)
    );

    setCalendarSelectedDate((date) =>
      date.subtract(timelineToGoBack.time, timelineToGoBack.units)
    );
  }

  function handleCalendarDateReset() {
    setCalendarSelectedDate(dayjs());
  }

  useEffect(() => {
    setGroupedEvents(
      groupEvents({ calendarSelectedDate, calendarView, events })
    );
  }, [calendarSelectedDate, calendarView, events]);

  useEffect(() => {
    setCalendarView(defaultView);
  }, [defaultView]);

  useEffect(() => {
    console.log(calendarView);
  }, [calendarView]);

  return (
    <CalendarContext.Provider
      value={{
        datePickerSelectedDate,
        calendarSelectedDate,
        calendarView,
        setCalendarView,
        events: groupedEvents,
        handleCalendarPreviousPeriod,
        handleCalendarDateReset,
        handleCalendarNextPeriod,
      }}
    >
      <div className={className}>{children}</div>
    </CalendarContext.Provider>
  );
}

const Calendar = Object.assign(CalendarRoot, {
  View,
  Header,
});

export default Calendar;
