import type { CalendarViewType, EventGroup } from "../types";
import { useCalendarContext } from "./Context";

export type CalendarViewProps = {
  children:
    | ((_: {
        events: EventGroup[];
        handleNextPeriod: () => void;
        handlePreviousPeriod: () => void;
        currentView: CalendarViewType;
      }) => React.ReactNode)
    | React.ReactNode;
  className?: string;
};

function CalendarView({ children, className }: CalendarViewProps) {
  const { events, handleNextPeriod, handlePreviousPeriod, currentView } =
    useCalendarContext();

  return (
    <div role="presentation" className={className}>
      {typeof children === "function"
        ? children({
            currentView,
            events,
            handleNextPeriod,
            handlePreviousPeriod,
          })
        : children}
    </div>
  );
}

export default CalendarView;
