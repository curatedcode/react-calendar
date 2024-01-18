import type { GroupEventsReturnType } from "../fn/groupEvents";
import type { CalendarViewType } from "../types";
import { useCalendarContext } from "./Context";

export type CalendarViewProps = {
  children: (_: {
    groupedEvents: GroupEventsReturnType;
    handleCalendarNextPeriod: () => void;
    handleCalendarPreviousPeriod: () => void;
    currentView: CalendarViewType;
  }) => React.ReactNode;
  className?: string;
};

function CalendarView({ children, className }: CalendarViewProps) {
  const {
    events,
    handleCalendarNextPeriod,
    handleCalendarPreviousPeriod,
    calendarView,
  } = useCalendarContext();

  return (
    <div role="presentation" className={className}>
      {children({
        currentView: calendarView,
        groupedEvents: events,
        handleCalendarNextPeriod,
        handleCalendarPreviousPeriod,
      })}
    </div>
  );
}

export default CalendarView;
