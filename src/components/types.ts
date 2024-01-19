export type AllDayEventType = {
  isAllDay: true;
  date: Date | string;
};

export type StandardEventType = {
  isAllDay?: false;
  startDate: Date | string;
  endDate: Date | string;
};

export type EventType = {
  title: string;
} & (AllDayEventType | StandardEventType);

export type EventGroup = {
  date: string;
  events: EventType[];
};

export type CalendarViewType =
  | "day"
  | "week"
  | "5-days"
  | "month"
  | "year"
  | "schedule";

export type ReadableCalendarViewType =
  | "Day"
  | "5 days"
  | "Week"
  | "Month"
  | "Year"
  | "Schedule";

export const readableCalendarViewOptions = [
  "Day",
  "5 days",
  "Week",
  "Month",
  "Year",
  "Schedule",
] as const;

export const calendarViewOptions = [
  { internal: "day", readable: "Day" },
  { internal: "5-days", readable: "5 days" },
  { internal: "week", readable: "Week" },
  { internal: "month", readable: "Month" },
  { internal: "year", readable: "Year" },
  { internal: "schedule", readable: "Schedule" },
] as const;

export type DefaultComponentProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};
