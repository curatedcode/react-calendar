import dayjs from "dayjs";
import { useEffect, useState, type KeyboardEvent } from "react";

export type UseDatePickerNavProps = {
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  viewRef: React.RefObject<HTMLTableSectionElement>;
};

function useDatePickerNav({
  handleNextMonth,
  handlePrevMonth,
  viewRef,
}: UseDatePickerNavProps) {
  const [nextFocusableElementDate, setNextFocusableElementDate] =
    useState<string>();
  const [lastFocusedElement, setLastFocusedElement] =
    useState<HTMLButtonElement>();

  useEffect(() => {
    if (!nextFocusableElementDate) return;

    const handleNextElement = setTimeout(() => {
      const nextElement = viewRef.current?.querySelector(
        `button[data-cell-date="${nextFocusableElementDate}"]`
      ) as HTMLButtonElement | null;

      if (!nextElement) return;

      nextElement.tabIndex = 0;
      nextElement.focus();
      if (lastFocusedElement) {
        lastFocusedElement.tabIndex = -1;
      }
      setLastFocusedElement(nextElement);
      setNextFocusableElementDate(undefined);
    }, 1);

    return () => clearTimeout(handleNextElement);
  }, [nextFocusableElementDate, viewRef, lastFocusedElement]);

  // stop scrolling with arrows when date picker cells are focused
  useEffect(() => {
    function handleKeydown(e: globalThis.KeyboardEvent) {
      if (!viewRef.current) return;
      if (!viewRef.current.contains(document.activeElement)) return;

      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [viewRef]);

  /**
   * Controls navigating between cells in the picker calendar grid
   * @param e  - react keyboard event emitter
   * @param date - dayjs object of the cells date
   */
  function keydownNavigator(e: KeyboardEvent<HTMLButtonElement>) {
    const rawCellDate = e.currentTarget.getAttribute("data-cell-date");

    if (!rawCellDate) return;
    if (!viewRef.current) {
      throw new Error(
        "Make sure you have ref={viewRef} on the container of the weeks inside <DatePicker />"
      );
    }

    const cellDate = dayjs(rawCellDate);

    if (e.key === "ArrowLeft") {
      e.currentTarget.tabIndex = -1;
      const dateMinusDay = cellDate.subtract(1, "day");
      const isNextElementOutsideMonth =
        dateMinusDay.month() !== cellDate.month();

      if (isNextElementOutsideMonth) {
        handlePrevMonth();
      }

      setNextFocusableElementDate(dateMinusDay.toISOString());
      return;
    }

    if (e.key === "ArrowRight") {
      if (lastFocusedElement) {
        lastFocusedElement.tabIndex = -1;
      }

      e.currentTarget.tabIndex = -1;
      const datePlusDay = cellDate.add(1, "day");
      const isNextElementOutsideMonth =
        datePlusDay.month() !== cellDate.month();

      if (isNextElementOutsideMonth) {
        handleNextMonth();
      }

      setNextFocusableElementDate(datePlusDay.toISOString());
      return;
    }

    if (e.key === "ArrowDown") {
      e.currentTarget.tabIndex = -1;
      const datePlusSevenDays = cellDate.add(7, "day");
      const isNextElementOutsideMonth =
        datePlusSevenDays.month() !== cellDate.month();

      if (isNextElementOutsideMonth) {
        handleNextMonth();
      }

      setNextFocusableElementDate(datePlusSevenDays.toISOString());
      return;
    }

    if (e.key === "ArrowUp") {
      e.currentTarget.tabIndex = -1;
      const dateMinusSevenDays = cellDate.subtract(7, "day");
      const isNextElementOutsideMonth =
        dateMinusSevenDays.month() !== cellDate.month();

      if (isNextElementOutsideMonth) {
        handlePrevMonth();
      }

      setNextFocusableElementDate(dateMinusSevenDays.toISOString());
      return;
    }
  }

  function propHandler(date: string) {
    return {
      "data-cell-date": date,
      onKeyDown: keydownNavigator,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.currentTarget.tabIndex = 0;
        setLastFocusedElement(e.currentTarget);
      },
    };
  }

  return {
    buttonProps: propHandler,
  };
}

export default useDatePickerNav;
