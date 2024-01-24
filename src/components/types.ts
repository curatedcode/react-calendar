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
  | "Day"
  | "5 days"
  | "Week"
  | "Month"
  | "Year"
  | "Schedule";

export const calendarViewOptions: CalendarViewType[] = [
  "Day",
  "5 days",
  "Week",
  "Month",
  "Year",
  "Schedule",
] as const;

export type DefaultComponentProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};
