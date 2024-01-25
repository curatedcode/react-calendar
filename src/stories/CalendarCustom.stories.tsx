import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import Calendar, { type CalendarProps } from "../components/Calendar/Calendar";
import { useCalendarContext } from "../components/Calendar/Context";

function CalendarHeader() {
  const {
    selectedDate,
    currentView,
    handleDateReset,
    handleNextPeriod,
    handlePreviousPeriod,
    setCurrentView,
    viewOptions,
  } = useCalendarContext();

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
}

function CalendarView() {
  const { events, currentView } = useCalendarContext();

  return (
    <div
      className={`grid w-[40rem] text-xs ${
        currentView === "Schedule" && "grid-cols-1"
      } ${currentView === "Day" && "grid-cols-1"} ${
        currentView === "5 days" && "grid-cols-5"
      } ${currentView === "Week" && "grid-cols-7"} ${
        currentView === "Month" && "grid-cols-7"
      } ${currentView === "Year" && "grid-cols-4"}`}
    >
      {events.map((group) => {
        const { date: rawDate, events } = group;
        const date = dayjs(rawDate);

        const allDayEvents = events.filter((event) => event.isAllDay);
        const standardEvents = events.filter((event) => !event.isAllDay);

        return (
          <div key={crypto.randomUUID()} className="grid align-middle">
            <div
              className={`grid gap-1 justify-items-center w-fit ${
                currentView === "Day" ? "ml-4" : "justify-self-center"
              }`}
            >
              <span>{date.format("ddd").toUpperCase()}</span>
              <span className="text-xl">{date.format("D")}</span>
            </div>
            <div className="flex-col flex gap-2">
              <div className="grid gap-y-0.5 text-white pr-3">
                {allDayEvents.map((event) => (
                  <span className="rounded-md bg-blue-300 overflow-hidden h-5 px-2 py-0.5">
                    {event.title}
                  </span>
                ))}
              </div>
              <div className="grid">
                {standardEvents.map((event) => {
                  if (event.isAllDay) return;
                  const timeBetween = dayjs(event.endDate).diff(
                    event.startDate,
                    "minute"
                  );

                  return (
                    <div key={crypto.randomUUID()} className="flex gap-1">
                      <div>{event.title}</div>
                      {timeBetween >= 60 ? (
                        <div className="flex gap-1">
                          <div>{dayjs(event.startDate).format("h:mm a")}</div>
                          <div>-</div>
                          <div>{dayjs(event.endDate).format("h:mm a")}</div>
                        </div>
                      ) : (
                        <div>{dayjs(event.startDate).format("h:mm a")}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CalendarExample({ ...props }: CalendarProps) {
  return (
    <Calendar {...props} className="h-[40rem]">
      <CalendarHeader />
      <CalendarView />
    </Calendar>
  );
}

const meta: Meta<typeof CalendarExample> = {
  title: "Calendar Custom Component",
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
    defaultView: "Schedule",
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
        endDate: dayjs().add(5, "hour").toISOString(),
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
        title: "Get er done boy",
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
        title: "Eat 1 million calories",
        isAllDay: true,
        date: dayjs().toISOString(),
      },
      {
        title:
          "Fold clothes this is a super duper long event that should be truncated once it has reached the limit please truncate for me im a creating a super long event name just for that purpose.",
        isAllDay: true,
        date: dayjs().toISOString(),
      },
      {
        title: "Dentist appointment",
        startDate: dayjs().add(1, "day").toISOString(),
        endDate: dayjs().add(1, "day").add(1, "hour").toISOString(),
      },
      {
        title: "Lunch with mom",
        startDate: dayjs().add(2, "day").toISOString(),
        endDate: dayjs().add(2, "day").add(1, "hour").toISOString(),
      },
      {
        title: "Book club meeting",
        startDate: dayjs().add(2, "day").toISOString(),
        endDate: dayjs().add(2, "day").add(1, "hour").toISOString(),
      },
      {
        title: "Yoga class",
        startDate: dayjs().add(1, "week").toISOString(),
        endDate: dayjs().add(1, "week").add(1, "hour").toISOString(),
      },
      {
        title: "Birthday party",
        startDate: dayjs().add(6, "day").toISOString(),
        endDate: dayjs().add(6, "day").add(1, "hour").toISOString(),
      },
      {
        title: "Grocery shopping",
        startDate: dayjs().add(1, "month").toISOString(),
        endDate: dayjs().add(1, "month").add(1, "hour").toISOString(),
      },
      {
        title: "Movie night",
        startDate: dayjs().add(2, "month").toISOString(),
        endDate: dayjs().add(2, "month").add(1, "hour").toISOString(),
      },
      {
        title: "Hair salon",
        startDate: dayjs().add(1, "day").toISOString(),
        endDate: dayjs().add(1, "day").add(6, "hour").toISOString(),
      },
      {
        title: "Zoom call with boss",
        startDate: dayjs().add(3, "day").toISOString(),
        endDate: dayjs().add(3, "day").add(1, "hour").toISOString(),
      },
      {
        title: "Anniversary dinner",
        startDate: dayjs().add(3, "day").toISOString(),
        endDate: dayjs().add(3, "day").add(1, "hour").toISOString(),
      },
    ],
  },
};
