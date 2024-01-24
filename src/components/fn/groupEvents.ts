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
  currentView: CalendarViewType;

  /**
   * The selected date of the calendar as a dayjs object
   */
  calendarSelectedDate: dayjs.Dayjs;
};

/**
 * Sorts events then groups them according to the calendar view
 */
function groupEvents({
  events,
  currentView,
  calendarSelectedDate,
}: GroupEventsArgs): EventGroup[] {
  let amountOfGroups: number;
  const sixWeeksFromMonth = getSixWeeksByMonth(calendarSelectedDate).flatMap(
    (val) => val
  );

  switch (currentView) {
    case "Day":
      amountOfGroups = 1;
      break;
    case "Week":
      amountOfGroups = 7;
      break;
    case "5 days":
      amountOfGroups = 5;
      break;
    case "Month":
      amountOfGroups = sixWeeksFromMonth.length;
      break;
    case "Year":
      amountOfGroups = 12;
      break;
    case "Schedule":
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

  const groupedEvents: EventGroup[] = [];

  for (let i = 0; i < amountOfGroups; i++) {
    const group = {
      date: "",
      events: [],
    };

    switch (currentView) {
      case "Day":
        group.date = calendarSelectedDate.toISOString();
        break;
      case "Week":
        group.date = calendarSelectedDate
          .startOf("week")
          .add(i, "days")
          .toISOString();
        break;
      case "Month":
        group.date = sixWeeksFromMonth[i];
        break;
      case "Year": {
        const startDate = calendarSelectedDate.startOf("month");
        group.date = startDate.add(i, "months").toISOString();
        break;
      }
      default:
        group.date = calendarSelectedDate.add(i, "days").toISOString();
    }

    groupedEvents.push(group);
  }

  for (let i = 0; i < amountOfGroups; i++) {
    const group = groupedEvents[i];

    for (let j = 0; j < eventsSortedByDate.length; j++) {
      const event = eventsSortedByDate[j];
      const eventDate = event.isAllDay
        ? dayjs(event.date)
        : dayjs(event.startDate);

      const isSameDate = eventDate.isSame(
        group.date,
        currentView === "Year" ? "month" : "date"
      );

      if (!isSameDate) continue;

      group.events.push(event);
    }
  }

  return groupedEvents;
}

export default groupEvents;
