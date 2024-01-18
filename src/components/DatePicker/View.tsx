import { useDatePickerContext } from "./Context";
import getDayCellProps from "./getDayCellProps";

export type ViewProps = {
  className?: string;
  children: (_: {
    /**
     * The weeks of the months in ISO date format
     */
    weeks: string[][];

    /**
     * Needs to be placed on the container of "weeks"
     * @example
     * <tbody ref={viewRef}>
     *   {weeks.map(() => ...)}
     * </tbody>
     */
    viewRef: React.RefObject<HTMLTableSectionElement>;

    /**
     *
     */
    getDayCellProps: typeof getDayCellProps;
  }) => React.ReactNode;
};

function View({ children, className }: ViewProps) {
  const { monthYearLabel, weeks, viewRef } = useDatePickerContext();

  return (
    <table aria-label={monthYearLabel} className={className}>
      {children({
        weeks,
        viewRef,
        getDayCellProps,
      })}
    </table>
  );
}

export default View;
