import type { Meta, StoryObj } from "@storybook/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { useState } from "react";
import { CalendarContext } from "../components/Calendar/Context";
import { useDatePickerContext } from "../components/DatePicker/Context";
import DatePicker from "../components/DatePicker/DatePicker";
import {
  calendarViewOptions,
  type CalendarViewType,
} from "../components/types";

function DatePickerHeader() {
  const { monthYearLabel, handlePrevMonth, handleNextMonth } =
    useDatePickerContext();

  return (
    <>
      <div className="font-medium mr-auto" aria-hidden="true">
        {monthYearLabel}
      </div>
      <button
        aria-label="Previous month"
        type="button"
        onClick={handlePrevMonth}
      >
        <ChevronLeftIcon className="w-5" aria-hidden="true" />
      </button>
      <button aria-label="Next month" type="button" onClick={handleNextMonth}>
        <ChevronRightIcon className="w-5" aria-hidden="true" />
      </button>
    </>
  );
}

function DatePickerView({
  hideDatesOutsideMonth,
}: {
  hideDatesOutsideMonth: boolean;
}) {
  const { weeks, viewRef, getDayCellProps } = useDatePickerContext();

  return (
    <>
      <thead aria-hidden="true">
        <tr className="grid grid-cols-7 h-6">
          <th className="w-8">S</th>
          <th className="w-8">M</th>
          <th className="w-8">T</th>
          <th className="w-8">W</th>
          <th className="w-8">T</th>
          <th className="w-8">F</th>
          <th className="w-8">S</th>
        </tr>
      </thead>
      <tbody className="grid py-1" ref={viewRef}>
        {weeks.map((week, weekIndex) => (
          <tr key={crypto.randomUUID()} className="grid grid-cols-7 h-9">
            {week.map((date) => {
              const { isOutsideMonth, dateLabel, ...props } = getDayCellProps({
                date,
                weekIndex,
                hideDatesOutsideMonth,
              });

              return (
                <td key={crypto.randomUUID()}>
                  {/* biome-ignore lint/a11y/useButtonType: type is passed from getDatePickerCellProps() */}
                  <button
                    className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black size-8 rounded-full data-[is-selected=true]:bg-green-300 data-[is-selected=false]:data-[is-today=false]:hover:bg-red-300 data-[is-today=true]:bg-blue-300 ${
                      isOutsideMonth
                        ? "pointer-events-none cursor-default opacity-30"
                        : ""
                    }`}
                    {...props}
                  >
                    <span aria-hidden="true">{dateLabel}</span>
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </>
  );
}

function DatePickerExample({
  hideDatesOutsideMonth,
}: {
  hideDatesOutsideMonth: boolean;
}) {
  const [currentView, setCurrentViewInternal] =
    useState<CalendarViewType>("5 days");

  function setCurrentView(newView: string) {
    const match = calendarViewOptions.find((val) => val === newView);

    if (!match) return;

    setCurrentViewInternal(match);
  }

  return (
    <CalendarContext.Provider
      value={{
        datePickerSelectedDate: dayjs(),
        selectedDate: dayjs(),
        handleDateReset: () => null,
        handleNextPeriod: () => null,
        handlePreviousPeriod: () => null,
        currentView,
        setCurrentView,
        viewOptions: calendarViewOptions,
        events: [],
      }}
    >
      <DatePicker>
        <DatePickerHeader />
        <DatePickerView hideDatesOutsideMonth={hideDatesOutsideMonth} />
      </DatePicker>
    </CalendarContext.Provider>
  );
}

const meta: Meta<typeof DatePickerExample> = {
  title: "DatePicker Custom Component",
  component: DatePickerExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    hideDatesOutsideMonth: {
      type: "boolean",
      description: "Should dates not in the current month be hidden?",
      control: "boolean",
    },
  },
  args: {
    hideDatesOutsideMonth: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
