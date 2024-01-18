import { useDatePickerContext } from "./Context";

export type HeaderProps = {
  className?: string;

  children: (_: {
    /**
     * Allows you to navigate to the next month
     */
    handleNextMonth: () => void;
    /**
     * Allows you to navigate to the previous month
     */
    handlePrevMonth: () => void;
    /**
     * The month and year label, e.g., January 2024
     */
    monthYearLabel: string;
  }) => React.ReactNode;
};

function Header({ children, className }: HeaderProps) {
  const { handleNextMonth, handlePrevMonth, monthYearLabel } =
    useDatePickerContext();

  return (
    <div className={`flex px-2 gap-3 ${className}`}>
      {children({ handleNextMonth, handlePrevMonth, monthYearLabel })}
    </div>
  );
}

export default Header;
