import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "../../global.css";
import groupEvents from "../fn/groupEvents";
import {
  calendarViewOptions,
  type CalendarViewType,
  type EventType,
} from "../types";
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
  defaultView = "5 days",
  events,
  className,
}: CalendarProps) {
  const [calendarSelectedDate, setCalendarSelectedDate] = useState(dayjs());

  const [datePickerSelectedDate, setDatePickerSelectedDate] = useState(dayjs());

  const [currentView, setCurrentViewInternal] =
    useState<CalendarViewType>(defaultView);

  const [groupedEvents, setGroupedEvents] = useState(
    groupEvents({ calendarSelectedDate, currentView, events })
  );

  function setCurrentView(newView: string) {
    const match = calendarViewOptions.find((val) => val === newView);

    if (!match) return;

    setCurrentViewInternal(match);
  }

  function getTimeline() {
    let time: number;
    let units: "days" | "months";

    switch (currentView) {
      case "Day":
        time = 1;
        units = "days";
        break;
      case "Week":
        time = 7;
        units = "days";
        break;
      case "5 days":
        time = 5;
        units = "days";
        break;
      case "Month":
        time = 1;
        units = "months";
        break;
      case "Year":
        time = 1;
        units = "days";
        break;
      case "Schedule":
        time = 4;
        units = "days";
        break;
    }

    return { time, units };
  }

  function handleNextPeriod() {
    const timelineToGoForward = getTimeline();

    setDatePickerSelectedDate((date) =>
      date.add(timelineToGoForward.time, timelineToGoForward.units)
    );

    setCalendarSelectedDate((date) =>
      date.add(timelineToGoForward.time, timelineToGoForward.units)
    );
  }

  function handlePreviousPeriod() {
    const timelineToGoBack = getTimeline();

    setDatePickerSelectedDate((date) =>
      date.subtract(timelineToGoBack.time, timelineToGoBack.units)
    );

    setCalendarSelectedDate((date) =>
      date.subtract(timelineToGoBack.time, timelineToGoBack.units)
    );
  }

  function handleDateReset() {
    setCalendarSelectedDate(dayjs());
  }

  useEffect(() => {
    setGroupedEvents(
      groupEvents({ calendarSelectedDate, currentView, events })
    );
  }, [calendarSelectedDate, currentView, events]);

  return (
    <CalendarContext.Provider
      value={{
        datePickerSelectedDate,
        viewOptions: calendarViewOptions,
        selectedDate: calendarSelectedDate,
        currentView,
        setCurrentView,
        events: groupedEvents,
        handlePreviousPeriod,
        handleDateReset,
        handleNextPeriod,
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
