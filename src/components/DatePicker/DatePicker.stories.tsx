import type { Meta, StoryObj } from "@storybook/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { useState } from "react";
import "../../global.css";
import { CalendarContext } from "../Calendar/Context";
import type { CalendarViewType } from "../types";
import DatePicker from "./DatePicker";

function DatePickerExample({
  hideDatesOutsideMonth,
}: {
  hideDatesOutsideMonth: boolean;
}) {
  const [calendarView, setCalendarView] = useState<CalendarViewType>("5-days");

  return (
    <CalendarContext.Provider
      value={{
        datePickerSelectedDate: dayjs(),
        calendarSelectedDate: dayjs(),
        handleCalendarDateReset: () => null,
        handleCalendarNextPeriod: () => null,
        handleCalendarPreviousPeriod: () => null,
        calendarView,
        setCalendarView,
        events: [],
      }}
    >
      <DatePicker>
        <DatePicker.Header>
          {({ handleNextMonth, handlePrevMonth, monthYearLabel }) => (
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
              <button
                aria-label="Next month"
                type="button"
                onClick={handleNextMonth}
              >
                <ChevronRightIcon className="w-5" aria-hidden="true" />
              </button>
            </>
          )}
        </DatePicker.Header>
        <DatePicker.View>
          {({ viewRef, weeks, getDayCellProps }) => (
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
                  <tr
                    key={crypto.randomUUID()}
                    className="grid grid-cols-7 h-9"
                  >
                    {week.map((date) => {
                      const { isOutsideMonth, dateLabel, ...props } =
                        getDayCellProps({
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
          )}
        </DatePicker.View>
      </DatePicker>
    </CalendarContext.Provider>
  );
}

const meta: Meta<typeof DatePickerExample> = {
  title: "DatePicker",
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
