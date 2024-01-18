import dayjs from "dayjs";
import type { CalendarViewType, EventGroup, EventType } from "../types";
import getSixWeeksByMonth from "./getSixWeeksByMonth";

export type GroupEventsArgs = {
  /**
   * All the events you want to sort
   */
  events: EventType[];

  /**
   * The calendar view. Will determine how the events are grouped
   */
  calendarView: CalendarViewType;

  /**
   * The selected date of the calendar as a dayjs object
   */
  calendarSelectedDate: dayjs.Dayjs;
};

export type GroupEventsReturnType = {
  allDay: EventGroup<"isAllDay">[];
  standard: EventGroup[];
};

/**
 * Sorts events then groups them according to the calendar view
 */
function groupEvents({
  events,
  calendarView,
  calendarSelectedDate,
}: GroupEventsArgs): GroupEventsReturnType {
  let amountOfGroups: number;
  const sixWeeksFromMonth = getSixWeeksByMonth(calendarSelectedDate).flatMap(
    (val) => val
  );

  switch (calendarView) {
    case "day":
      amountOfGroups = 1;
      break;
    case "week":
      amountOfGroups = 7;
      break;
    case "5-days":
      amountOfGroups = 5;
      break;
    case "month":
      amountOfGroups = sixWeeksFromMonth.length;
      break;
    case "year":
      amountOfGroups = 12;
      break;
    case "schedule":
      amountOfGroups = 4;
      break;
  }

  const eventsSortedByDate = events.sort((a, b) => {
    const dateOne = a.isAllDay ? dayjs(a.date) : dayjs(a.startDate);
    const dateTwo = b.isAllDay ? dayjs(b.date) : dayjs(b.startDate);

    const isSame = dateOne.isSame(dateTwo, "date");
    const isAfter = dateOne.isAfter(dateTwo, "date");

    if (isSame) return 0;
    if (isAfter) return 1;
    return -1;
  });

  const groupedEvents: GroupEventsReturnType = {
    allDay: [],
    standard: [],
  };

  for (let i = 0; i < amountOfGroups; i++) {
    const group = {
      date: "",
      events: [],
    };

    switch (calendarView) {
      case "day":
        group.date = calendarSelectedDate.toISOString();
        break;
      case "week":
        group.date = calendarSelectedDate
          .startOf("week")
          .add(i, "days")
          .toISOString();
        break;
      case "month":
        group.date = sixWeeksFromMonth[i];
        break;
      case "year": {
        const startDate = calendarSelectedDate.startOf("month");
        group.date = startDate.add(i, "months").toISOString();
        break;
      }
      default:
        group.date = calendarSelectedDate.add(i, "days").toISOString();
    }

    groupedEvents.allDay.push(group);
    groupedEvents.standard.push(group);
  }

  for (let i = 0; i < groupedEvents.standard.length; i++) {
    const allDayGroup = groupedEvents.allDay[i];
    const standardGroup = groupedEvents.standard[i];

    for (let j = 0; j < eventsSortedByDate.length; j++) {
      const event = eventsSortedByDate[j];
      const eventDate = event.isAllDay
        ? dayjs(event.date)
        : dayjs(event.startDate);

      const isSameDate = eventDate.isSame(
        // standardGroup and allDayGroup dates are always the same value
        standardGroup.date,
        calendarView === "year" ? "month" : "date"
      );

      if (!isSameDate) continue;

      if (event.isAllDay) {
        allDayGroup.events.push(event);
      } else {
        console.log("pushed standard");
        standardGroup.events.push(event);
      }
    }
  }

  return groupedEvents;
}

export default groupEvents;
