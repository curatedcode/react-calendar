import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import Calendar, { type CalendarProps } from "../components/Calendar";
import DatePicker from "../components/DatePicker";

function CalendarExample({
  hideDatesOutsideMonth,
  ...props
}: CalendarProps & { hideDatesOutsideMonth?: boolean }) {
  return (
    <Calendar {...props}>
      <Calendar.Header>
        {({
          handleDateReset,
          handleNextPeriod,
          handlePreviousPeriod,
          viewOptions,
          setCurrentView,
          currentView,
          selectedDate,
        }) => {
          let dateLabel: string;
          const date = dayjs(selectedDate);

          switch (currentView) {
            case "Day":
              dateLabel = date.format("MMMM D, YYYY");
              break;
            case "Month":
              dateLabel = date.format("MMMM YYYY");
              break;
            case "Year":
              dateLabel = date.format("YYYY");
              break;
            default: {
              const isSameMonth = date
                .startOf("week")
                .isSame(date.endOf("week"), "month");

              if (!isSameMonth) {
                const firstHalf = date.startOf("week").format("MMM YYYY");
                const secondHalf = date.endOf("week").format("MMM YYYY");
                dateLabel = `${firstHalf} - ${secondHalf}`;
                break;
              }

              dateLabel = date.format("MMMM D, YYYY");
              break;
            }
          }

          return (
            <header className="w-full flex gap-6 items-center py-4 px-1">
              <button type="button" onClick={handleDateReset}>
                Today
              </button>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handlePreviousPeriod}
                  aria-label="Previous period"
                >
                  <ChevronLeftIcon className="w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNextPeriod}
                  aria-label="Next period"
                >
                  <ChevronRightIcon className="w-6" aria-hidden="true" />
                </button>
              </div>
              <div>{dateLabel}</div>
              <select
                aria-label="Calendar view"
                defaultValue={currentView}
                onChange={(e) => setCurrentView(e.currentTarget.value)}
              >
                {viewOptions.map((option) => (
                  <option key={crypto.randomUUID()} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </header>
          );
        }}
      </Calendar.Header>
      <div className="grid">
        <DatePicker className="w-fit">
          <DatePicker.Header>
            {({ handleNextMonth, handlePrevMonth, monthYearLabel }) => (
              <>
                <div className="font-medium mr-auto" aria-hidden="true">
                  {monthYearLabel}
                </div>
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={handlePrevMonth}
                >
                  <ChevronLeftIcon className="w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next month"
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
                          <td key={date}>
                            {/* biome-ignore lint/a11y/useButtonType: type is passed from getDayCellProps() */}
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
        <Calendar.View>
          {({ events, currentView }) => (
            <div
              className="data-[calendar-view='day']:grid-cols-1 grid data-[calendar-view='week']:grid-cols-7 data-[calendar-view='5-days']:grid-cols-5 w-[48rem]"
              data-calendar-view={currentView}
            >
              {events.map((group) => (
                <div key={crypto.randomUUID()}>
                  <span>{group.date}</span>
                  <div className="grid">
                    {group.events.map((event) => (
                      <div key={crypto.randomUUID()}>{event.title}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Calendar.View>
      </div>
    </Calendar>
  );
}

const meta: Meta<typeof CalendarExample> = {
  title: "Calendar with Date Picker",
  component: CalendarExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultView: {
      control: "select",
      options: ["day", "5-days", "week", "month", "year", "schedule"] as const,
      description: "The view the Calendar will be initially loaded with",
    },
    events: {
      description: "All of the calendar events",
    },
    hideDatesOutsideMonth: {
      type: "boolean",
      description: "Should dates not in the current month be hidden?",
    },
  },
  args: {
    defaultView: "5 days",
    hideDatesOutsideMonth: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    events: [],
  },
};

export const Full: Story = {
  args: {
    events: [
      {
        title: "Dentist appointment",
        startDate: dayjs().toISOString(),
        endDate: dayjs().add(1, "hour").toISOString(),
      },
      {
        title: "Team meeting",
        startDate: dayjs().add(2, "hour").toISOString(),
        endDate: dayjs().add(3, "hour").toISOString(),
      },
      {
        title: "Lunch with Sarah",
        startDate: dayjs().add(3, "hour").add(30, "minute").toISOString(),
        endDate: dayjs().add(4, "hour").add(30, "minute").toISOString(),
      },
      {
        title: "Presentation rehearsal",
        startDate: dayjs().add(5, "hour").toISOString(),
        endDate: dayjs().add(6, "hour").toISOString(),
      },
      {
        title: "Call with client",
        startDate: dayjs().add(6, "hour").add(30, "minute").toISOString(),
        endDate: dayjs().add(7, "hour").toISOString(),
      },
      {
        title: "Yoga class",
        startDate: dayjs().add(8, "hour").toISOString(),
        endDate: dayjs().add(9, "hour").toISOString(),
      },
      {
        title: "Grocery shopping",
        startDate: dayjs().add(9, "hour").add(30, "minute").toISOString(),
        endDate: dayjs().add(10, "hour").toISOString(),
      },
      {
        title: "Cook dinner",
        startDate: dayjs().add(10, "hour").add(30, "minute").toISOString(),
        endDate: dayjs().add(11, "hour").toISOString(),
      },
      {
        title: "Fast",
        isAllDay: true,
        date: dayjs().toISOString(),
      },
    ],
  },
};
