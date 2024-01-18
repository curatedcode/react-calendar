import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import Calendar, { type CalendarProps } from "./Calendar";

function CalendarExample({ ...props }: CalendarProps) {
  return (
    <Calendar {...props} className="h-[40rem]">
      <Calendar.Header>
        {({
          handleDateReset,

          handleNextPeriod,
          handlePreviousPeriod,
          viewOptions,
          setView,
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
            }
          }

          return (
            <header className="w-full flex gap-6 justify-between py-4 px-1">
              <div className="flex gap-3">
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
              </div>
              <select
                aria-label="Calendar view switcher"
                value={currentView}
                onChange={(e) => setView(e.currentTarget.value)}
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
      <Calendar.View>
        {({ groupedEvents, currentView }) => (
          <div
            className={`grid w-[48rem] ${
              currentView === "day" && "grid-cols-1"
            } ${currentView === "5-days" && "grid-cols-5"} ${
              currentView === "week" && "grid-cols-7"
            } ${currentView === "month" && "grid-cols-7"} ${
              currentView === "year" && "grid-cols-4"
            }`}
          >
            {groupedEvents.map((group) => {
              const { date: rawDate, events } = group;
              const date = dayjs(rawDate);

              return (
                <div key={crypto.randomUUID()} className="grid align-middle">
                  <div
                    className={`flex flex-col gap-2 ${
                      currentView === "day" ? "" : "justify-self-center"
                    }`}
                  >
                    <span>{date.format("ddd")}</span>
                    <span>{date.format("D")}</span>
                  </div>
                  <div className="grid">
                    {events.map((event) => {
                      const { title, isAllDay } = event;
                      const key = crypto.randomUUID();

                      if (isAllDay) {
                        return (
                          <div key={key} className="grid">
                            <div>{title}</div>
                            <div>{dayjs(event.date).format("h:m a")}</div>
                          </div>
                        );
                      }
                      return (
                        <div key={key} className="grid relative -top-44">
                          <div>{title}</div>
                          <div>{dayjs(event.startDate).format("h:m a")}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Calendar.View>
    </Calendar>
  );
}

const meta: Meta<typeof CalendarExample> = {
  title: "Standalone Calendar",
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
  },
  args: {
    defaultView: "day",
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
