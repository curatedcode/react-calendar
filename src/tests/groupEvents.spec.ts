import dayjs from "dayjs";
import groupEvents from "src/components/fn/groupEvents";
import type { EventType } from "src/components/types";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("groupEvents", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("returns dates grouped by day", () => {
    const systemDate = new Date(2024, 0, 17);
    vi.setSystemTime(systemDate);

    const events: EventType[] = [
      {
        title: "Fast",
        isAllDay: true,
        date: "2024-01-15T05:00:00.000Z",
      },
      {
        title: "Dentist appointment",
        startDate: "2024-01-15T05:00:00.000Z",
        endDate: "2024-01-15T06:00:00.000Z",
      },
      {
        title: "Team meeting",
        startDate: "2024-01-17T05:00:00.000Z",
        endDate: "2024-01-17T05:15:00.000Z",
      },
      {
        title: "Lunch with Sarah",
        startDate: "2024-01-17T08:00:00.000Z",
        endDate: "2024-01-17T08:45:00.000Z",
      },
      {
        title: "Presentation rehearsal",
        startDate: "2024-01-18T05:00:00.000Z",
        endDate: "2024-01-18T06:45:00.000Z",
      },
      {
        title: "Call with client",
        startDate: "2024-01-19T05:00:00.000Z",
        endDate: "2024-01-19T05:30:00.000Z",
      },
      {
        title: "Yoga class",
        startDate: "2024-01-20T05:00:00.000Z",
        endDate: "2024-01-20T05:00:00.000Z",
      },
      {
        title: "Grocery shopping",
        startDate: "2024-01-21T05:00:00.000Z",
        endDate: "2024-01-21T05:30:00.000Z",
      },
      {
        title: "Cook dinner",
        startDate: "2024-01-22T05:00:00.000Z",
        endDate: "2024-01-22T05:30:00.000Z",
      },
      {
        title: "Clean",
        startDate: "2024-01-23T05:00:00.000Z",
        endDate: "2024-01-23T05:30:00.000Z",
      },
      {
        title: "Some stuff",
        startDate: "2024-01-24T05:00:00.000Z",
        endDate: "2024-01-24T05:45:00.000Z",
      },
    ];

    const result = groupEvents({
      events,
      calendarSelectedDate: dayjs(),
      calendarView: "day",
    });

    expect(result).toStrictEqual({
      allDay: [
        {
          date: "2024-01-17T05:00:00.000Z",
          events: [],
        },
      ],
      standard: [
        {
          date: "2024-01-17T05:00:00.000Z",
          events: [
            {
              title: "Team meeting",
              startDate: "2024-01-17T05:00:00.000Z",
              endDate: "2024-01-17T05:15:00.000Z",
            },
            {
              title: "Lunch with Sarah",
              startDate: "2024-01-17T08:00:00.000Z",
              endDate: "2024-01-17T08:45:00.000Z",
            },
          ],
        },
      ],
    });
  });

  test.skip("returns dates grouped by week", () => {
    const systemDate = new Date(2024, 0, 17);
    vi.setSystemTime(systemDate);

    const events: EventType[] = [
      {
        title: "Fast",
        isAllDay: true,
        date: "2024-01-15T05:00:00.000Z",
      },
      {
        title: "Dentist appointment",
        startDate: "2024-01-15T05:00:00.000Z",
        endDate: "2024-01-15T06:00:00.000Z",
      },
      {
        title: "Team meeting",
        startDate: "2024-01-16T05:00:00.000Z",
        endDate: "2024-01-16T05:15:00.000Z",
      },
      {
        title: "Presentation rehearsal",
        startDate: "2024-01-18T05:00:00.000Z",
        endDate: "2024-01-18T06:45:00.000Z",
      },
      {
        title: "Call with client",
        startDate: "2024-01-19T05:00:00.000Z",
        endDate: "2024-01-19T05:30:00.000Z",
      },
      {
        title: "Yoga class",
        startDate: "2024-01-20T05:00:00.000Z",
        endDate: "2024-01-20T05:00:00.000Z",
      },
      {
        title: "Grocery shopping",
        startDate: "2024-01-21T05:00:00.000Z",
        endDate: "2024-01-21T05:30:00.000Z",
      },
      {
        title: "Cook dinner",
        startDate: "2024-01-22T05:00:00.000Z",
        endDate: "2024-01-22T05:30:00.000Z",
      },
      {
        title: "Clean",
        startDate: "2024-01-23T05:00:00.000Z",
        endDate: "2024-01-23T05:30:00.000Z",
      },
      {
        title: "Some stuff",
        startDate: "2024-01-24T05:00:00.000Z",
        endDate: "2024-01-24T05:45:00.000Z",
      },
    ];

    const result = groupEvents({
      events,
      calendarSelectedDate: dayjs(),
      calendarView: "week",
    });

    expect(result).toStrictEqual({
      standard: {
        date: "",
        events: [
          {
            date: "2024-01-15T05:00:00.000Z",
            events: [
              {
                title: "Dentist appointment",
                startDate: "2024-01-15T05:00:00.000Z",
                endDate: "2024-01-15T06:00:00.000Z",
              },
            ],
          },
        ],
      },
      allDay: {
        date: "",
        events: [
          {
            date: "2024-01-15T05:00:00.000Z",
            events: [
              {
                title: "Dentist appointment",
                startDate: "2024-01-15T05:00:00.000Z",
                endDate: "2024-01-15T06:00:00.000Z",
              },
            ],
          },
        ],
      },

      // { date: "2024-01-14T05:00:00.000Z", events: [] },
      // {
      //   date: "2024-01-15T05:00:00.000Z",
      //   events: [
      //     {
      //       title: "Fast",
      //       isAllDay: true,
      //       date: "2024-01-15T05:00:00.000Z",
      //     },
      //     {
      //       title: "Dentist appointment",
      //       startDate: "2024-01-15T05:00:00.000Z",
      //       endDate: "2024-01-15T06:00:00.000Z",
      //     },
      //   ],
      // },
      // {
      //   date: "2024-01-16T05:00:00.000Z",
      //   events: [
      //     {
      //       title: "Team meeting",
      //       startDate: "2024-01-16T05:00:00.000Z",
      //       endDate: "2024-01-16T05:15:00.000Z",
      //     },
      //   ],
      // },
      // { date: "2024-01-17T05:00:00.000Z", events: [] },
      // {
      //   date: "2024-01-18T05:00:00.000Z",
      //   events: [
      //     {
      //       title: "Presentation rehearsal",
      //       startDate: "2024-01-18T05:00:00.000Z",
      //       endDate: "2024-01-18T06:45:00.000Z",
      //     },
      //   ],
      // },
      // {
      //   date: "2024-01-19T05:00:00.000Z",
      //   events: [
      //     {
      //       title: "Call with client",
      //       startDate: "2024-01-19T05:00:00.000Z",
      //       endDate: "2024-01-19T05:30:00.000Z",
      //     },
      //   ],
      // },
      // {
      //   date: "2024-01-20T05:00:00.000Z",
      //   events: [
      //     {
      //       title: "Yoga class",
      //       startDate: "2024-01-20T05:00:00.000Z",
      //       endDate: "2024-01-20T05:00:00.000Z",
      //     },
      //   ],
      // },
    });
  });

  test.skip("returns dates grouped by 5-days", () => {
    const systemDate = new Date(2024, 0, 17);
    vi.setSystemTime(systemDate);

    const events: EventType[] = [
      {
        title: "Fast",
        isAllDay: true,
        date: "2024-01-15T05:00:00.000Z",
      },
      {
        title: "Dentist appointment",
        startDate: "2024-01-15T05:00:00.000Z",
        endDate: "2024-01-15T06:00:00.000Z",
      },
      {
        title: "Team meeting",
        startDate: "2024-01-16T05:00:00.000Z",
        endDate: "2024-01-16T05:15:00.000Z",
      },
      {
        title: "Lunch with Sarah",
        startDate: "2024-01-17T05:00:00.000Z",
        endDate: "2024-01-17T05:45:00.000Z",
      },
      {
        title: "Presentation rehearsal",
        startDate: "2024-01-18T05:00:00.000Z",
        endDate: "2024-01-18T06:45:00.000Z",
      },
      {
        title: "Call with client",
        startDate: "2024-01-19T05:00:00.000Z",
        endDate: "2024-01-19T05:30:00.000Z",
      },
      {
        title: "Grocery shopping",
        startDate: "2024-01-21T05:00:00.000Z",
        endDate: "2024-01-21T05:30:00.000Z",
      },
      {
        title: "Cook dinner",
        startDate: "2024-01-22T05:00:00.000Z",
        endDate: "2024-01-22T05:30:00.000Z",
      },
      {
        title: "Clean",
        startDate: "2024-01-23T05:00:00.000Z",
        endDate: "2024-01-23T05:30:00.000Z",
      },
      {
        title: "Some stuff",
        startDate: "2024-01-24T05:00:00.000Z",
        endDate: "2024-01-24T05:45:00.000Z",
      },
    ];

    const result = groupEvents({
      events,
      calendarSelectedDate: dayjs(),
      calendarView: "5-days",
    });

    expect(result).toStrictEqual([
      {
        date: "2024-01-17T05:00:00.000Z",
        events: [
          {
            title: "Lunch with Sarah",
            startDate: "2024-01-17T05:00:00.000Z",
            endDate: "2024-01-17T05:45:00.000Z",
          },
        ],
      },
      {
        date: "2024-01-18T05:00:00.000Z",
        events: [
          {
            title: "Presentation rehearsal",
            startDate: "2024-01-18T05:00:00.000Z",
            endDate: "2024-01-18T06:45:00.000Z",
          },
        ],
      },
      {
        date: "2024-01-19T05:00:00.000Z",
        events: [
          {
            title: "Call with client",
            startDate: "2024-01-19T05:00:00.000Z",
            endDate: "2024-01-19T05:30:00.000Z",
          },
        ],
      },
      { date: "2024-01-20T05:00:00.000Z", events: [] },
      {
        date: "2024-01-21T05:00:00.000Z",
        events: [
          {
            title: "Grocery shopping",
            startDate: "2024-01-21T05:00:00.000Z",
            endDate: "2024-01-21T05:30:00.000Z",
          },
        ],
      },
    ]);
  });

  test.skip("returns dates grouped by month", () => {
    const systemDate = new Date(2024, 0, 17);
    vi.setSystemTime(systemDate);

    const events: EventType[] = [
      {
        title: "Fast",
        isAllDay: true,
        date: "2024-01-15T05:00:00.000Z",
      },
      {
        title: "Dentist appointment",
        startDate: "2024-01-15T05:00:00.000Z",
        endDate: "2024-01-15T06:00:00.000Z",
      },
      {
        title: "Team meeting",
        startDate: "2024-01-19T05:00:00.000Z",
        endDate: "2024-01-19T05:15:00.000Z",
      },
      {
        title: "Grocery shopping",
        startDate: "2024-01-21T05:00:00.000Z",
        endDate: "2024-01-21T05:30:00.000Z",
      },
      {
        title: "Lunch with Sarah",
        startDate: "2024-01-24T05:00:00.000Z",
        endDate: "2024-01-24T05:45:00.000Z",
      },
      {
        title: "Presentation rehearsal",
        startDate: "2024-01-30T05:00:00.000Z",
        endDate: "2024-01-30T06:45:00.000Z",
      },
      {
        title: "Call with client",
        startDate: "2024-01-31T05:00:00.000Z",
        endDate: "2024-01-31T05:30:00.000Z",
      },
      {
        title: "Yoga class",
        startDate: "2024-01-31T09:00:00.000Z",
        endDate: "2024-01-31T09:45:00.000Z",
      },
      {
        title: "Cook dinner",
        startDate: "2024-02-03T05:00:00.000Z",
        endDate: "2024-02-03T05:30:00.000Z",
      },
      {
        title: "Clean",
        startDate: "2024-02-06T05:00:00.000Z",
        endDate: "2024-02-06T05:30:00.000Z",
      },
      {
        title: "Some stuff",
        startDate: "2024-02-20T05:00:00.000Z",
        endDate: "2024-02-20T05:45:00.000Z",
      },
    ];

    const result = groupEvents({
      events,
      calendarSelectedDate: dayjs(),
      calendarView: "month",
    });

    expect(result).toStrictEqual([
      { date: "2023-12-31T05:00:00.000Z", events: [] },
      { date: "2024-01-01T05:00:00.000Z", events: [] },
      { date: "2024-01-02T05:00:00.000Z", events: [] },
      { date: "2024-01-03T05:00:00.000Z", events: [] },
      { date: "2024-01-04T05:00:00.000Z", events: [] },
      { date: "2024-01-05T05:00:00.000Z", events: [] },
      { date: "2024-01-06T05:00:00.000Z", events: [] },
      { date: "2024-01-07T05:00:00.000Z", events: [] },
      { date: "2024-01-08T05:00:00.000Z", events: [] },
      { date: "2024-01-09T05:00:00.000Z", events: [] },
      { date: "2024-01-10T05:00:00.000Z", events: [] },
      { date: "2024-01-11T05:00:00.000Z", events: [] },
      { date: "2024-01-12T05:00:00.000Z", events: [] },
      { date: "2024-01-13T05:00:00.000Z", events: [] },
      { date: "2024-01-14T05:00:00.000Z", events: [] },
      {
        date: "2024-01-15T05:00:00.000Z",
        events: [
          {
            title: "Fast",
            isAllDay: true,
            date: "2024-01-15T05:00:00.000Z",
          },
          {
            title: "Dentist appointment",
            startDate: "2024-01-15T05:00:00.000Z",
            endDate: "2024-01-15T06:00:00.000Z",
          },
        ],
      },
      { date: "2024-01-16T05:00:00.000Z", events: [] },
      { date: "2024-01-17T05:00:00.000Z", events: [] },
      { date: "2024-01-18T05:00:00.000Z", events: [] },
      {
        date: "2024-01-19T05:00:00.000Z",
        events: [
          {
            title: "Team meeting",
            startDate: "2024-01-19T05:00:00.000Z",
            endDate: "2024-01-19T05:15:00.000Z",
          },
        ],
      },
      { date: "2024-01-20T05:00:00.000Z", events: [] },
      {
        date: "2024-01-21T05:00:00.000Z",
        events: [
          {
            title: "Grocery shopping",
            startDate: "2024-01-21T05:00:00.000Z",
            endDate: "2024-01-21T05:30:00.000Z",
          },
        ],
      },
      { date: "2024-01-22T05:00:00.000Z", events: [] },
      { date: "2024-01-23T05:00:00.000Z", events: [] },
      {
        date: "2024-01-24T05:00:00.000Z",
        events: [
          {
            title: "Lunch with Sarah",
            startDate: "2024-01-24T05:00:00.000Z",
            endDate: "2024-01-24T05:45:00.000Z",
          },
        ],
      },
      { date: "2024-01-25T05:00:00.000Z", events: [] },
      { date: "2024-01-26T05:00:00.000Z", events: [] },
      { date: "2024-01-27T05:00:00.000Z", events: [] },
      { date: "2024-01-28T05:00:00.000Z", events: [] },
      { date: "2024-01-29T05:00:00.000Z", events: [] },
      {
        date: "2024-01-30T05:00:00.000Z",
        events: [
          {
            title: "Presentation rehearsal",
            startDate: "2024-01-30T05:00:00.000Z",
            endDate: "2024-01-30T06:45:00.000Z",
          },
        ],
      },
      {
        date: "2024-01-31T05:00:00.000Z",
        events: [
          {
            title: "Call with client",
            startDate: "2024-01-31T05:00:00.000Z",
            endDate: "2024-01-31T05:30:00.000Z",
          },
          {
            title: "Yoga class",
            startDate: "2024-01-31T09:00:00.000Z",
            endDate: "2024-01-31T09:45:00.000Z",
          },
        ],
      },
      { date: "2024-02-01T05:00:00.000Z", events: [] },
      { date: "2024-02-02T05:00:00.000Z", events: [] },
      {
        date: "2024-02-03T05:00:00.000Z",
        events: [
          {
            title: "Cook dinner",
            startDate: "2024-02-03T05:00:00.000Z",
            endDate: "2024-02-03T05:30:00.000Z",
          },
        ],
      },
      { date: "2024-02-04T05:00:00.000Z", events: [] },
      { date: "2024-02-05T05:00:00.000Z", events: [] },
      {
        date: "2024-02-06T05:00:00.000Z",
        events: [
          {
            title: "Clean",
            startDate: "2024-02-06T05:00:00.000Z",
            endDate: "2024-02-06T05:30:00.000Z",
          },
        ],
      },
      { date: "2024-02-07T05:00:00.000Z", events: [] },
      { date: "2024-02-08T05:00:00.000Z", events: [] },
      { date: "2024-02-09T05:00:00.000Z", events: [] },
      { date: "2024-02-10T05:00:00.000Z", events: [] },
    ]);
  });

  test.skip("returns dates grouped by year", () => {
    const systemDate = new Date(2024, 0, 17);
    vi.setSystemTime(systemDate);

    const events: EventType[] = [
      {
        title: "Fast",
        isAllDay: true,
        date: "2024-01-15T05:00:00.000Z",
      },
      {
        title: "Dentist appointment",
        startDate: "2024-01-15T05:00:00.000Z",
        endDate: "2024-01-15T06:00:00.000Z",
      },
      {
        title: "Team meeting",
        startDate: "2024-02-19T05:00:00.000Z",
        endDate: "2024-02-19T05:15:00.000Z",
      },
      {
        title: "Lunch with Sarah",
        startDate: "2024-03-24T05:00:00.000Z",
        endDate: "2024-03-24T05:45:00.000Z",
      },
      {
        title: "Presentation rehearsal",
        startDate: "2024-06-30T05:00:00.000Z",
        endDate: "2024-06-30T06:45:00.000Z",
      },
      {
        title: "Call with client",
        startDate: "2024-08-31T05:00:00.000Z",
        endDate: "2024-08-31T05:30:00.000Z",
      },
      {
        title: "Grocery shopping",
        startDate: "2024-09-21T05:00:00.000Z",
        endDate: "2024-09-21T05:30:00.000Z",
      },
      {
        title: "Yoga class",
        startDate: "2024-09-30T09:00:00.000Z",
        endDate: "2024-09-30T09:45:00.000Z",
      },
      {
        title: "Cook dinner",
        startDate: "2024-10-03T05:00:00.000Z",
        endDate: "2024-10-03T05:30:00.000Z",
      },
      {
        title: "Clean",
        startDate: "2024-11-06T05:00:00.000Z",
        endDate: "2024-11-06T05:30:00.000Z",
      },
      {
        title: "Some stuff",
        startDate: "2024-12-20T05:00:00.000Z",
        endDate: "2024-12-20T05:45:00.000Z",
      },
    ];

    const result = groupEvents({
      events,
      calendarSelectedDate: dayjs(),
      calendarView: "year",
    });

    expect(result).toStrictEqual([
      {
        date: "2024-01-01T05:00:00.000Z",
        events: [
          {
            title: "Fast",
            isAllDay: true,
            date: "2024-01-15T05:00:00.000Z",
          },
          {
            title: "Dentist appointment",
            startDate: "2024-01-15T05:00:00.000Z",
            endDate: "2024-01-15T06:00:00.000Z",
          },
        ],
      },
      {
        date: "2024-02-01T05:00:00.000Z",
        events: [
          {
            title: "Team meeting",
            startDate: "2024-02-19T05:00:00.000Z",
            endDate: "2024-02-19T05:15:00.000Z",
          },
        ],
      },
      {
        date: "2024-03-01T05:00:00.000Z",
        events: [
          {
            title: "Lunch with Sarah",
            startDate: "2024-03-24T05:00:00.000Z",
            endDate: "2024-03-24T05:45:00.000Z",
          },
        ],
      },
      { date: "2024-04-01T04:00:00.000Z", events: [] },
      { date: "2024-05-01T04:00:00.000Z", events: [] },
      {
        date: "2024-06-01T04:00:00.000Z",
        events: [
          {
            title: "Presentation rehearsal",
            startDate: "2024-06-30T05:00:00.000Z",
            endDate: "2024-06-30T06:45:00.000Z",
          },
        ],
      },
      { date: "2024-07-01T04:00:00.000Z", events: [] },
      {
        date: "2024-08-01T04:00:00.000Z",
        events: [
          {
            title: "Call with client",
            startDate: "2024-08-31T05:00:00.000Z",
            endDate: "2024-08-31T05:30:00.000Z",
          },
        ],
      },
      {
        date: "2024-09-01T04:00:00.000Z",
        events: [
          {
            title: "Grocery shopping",
            startDate: "2024-09-21T05:00:00.000Z",
            endDate: "2024-09-21T05:30:00.000Z",
          },
          {
            title: "Yoga class",
            startDate: "2024-09-30T09:00:00.000Z",
            endDate: "2024-09-30T09:45:00.000Z",
          },
        ],
      },
      {
        date: "2024-10-01T04:00:00.000Z",
        events: [
          {
            title: "Cook dinner",
            startDate: "2024-10-03T05:00:00.000Z",
            endDate: "2024-10-03T05:30:00.000Z",
          },
        ],
      },
      {
        date: "2024-11-01T04:00:00.000Z",
        events: [
          {
            title: "Clean",
            startDate: "2024-11-06T05:00:00.000Z",
            endDate: "2024-11-06T05:30:00.000Z",
          },
        ],
      },
      {
        date: "2024-12-01T05:00:00.000Z",
        events: [
          {
            title: "Some stuff",
            startDate: "2024-12-20T05:00:00.000Z",
            endDate: "2024-12-20T05:45:00.000Z",
          },
        ],
      },
    ]);
  });

  test.skip("returns dates grouped by schedule", () => {
    const systemDate = new Date(2024, 0, 17);
    vi.setSystemTime(systemDate);

    const events: EventType[] = [
      {
        title: "Fast",
        isAllDay: true,
        date: "2024-01-15T05:00:00.000Z",
      },
      {
        title: "Dentist appointment",
        startDate: "2024-01-15T05:00:00.000Z",
        endDate: "2024-01-15T06:00:00.000Z",
      },
      {
        title: "Team meeting",
        startDate: "2024-01-16T05:00:00.000Z",
        endDate: "2024-01-16T05:15:00.000Z",
      },
      {
        title: "Lunch with Sarah",
        startDate: "2024-01-17T05:00:00.000Z",
        endDate: "2024-01-17T05:45:00.000Z",
      },
      {
        title: "Presentation rehearsal",
        startDate: "2024-01-18T05:00:00.000Z",
        endDate: "2024-01-18T06:45:00.000Z",
      },
      {
        title: "Call with client",
        startDate: "2024-01-19T05:00:00.000Z",
        endDate: "2024-01-19T05:30:00.000Z",
      },
      {
        title: "Yoga class",
        startDate: "2024-01-20T05:00:00.000Z",
        endDate: "2024-01-20T05:00:00.000Z",
      },
      {
        title: "Grocery shopping",
        startDate: "2024-01-21T05:00:00.000Z",
        endDate: "2024-01-21T05:30:00.000Z",
      },
      {
        title: "Cook dinner",
        startDate: "2024-01-22T05:00:00.000Z",
        endDate: "2024-01-22T05:30:00.000Z",
      },
      {
        title: "Clean",
        startDate: "2024-01-23T05:00:00.000Z",
        endDate: "2024-01-23T05:30:00.000Z",
      },
      {
        title: "Some stuff",
        startDate: "2024-01-24T05:00:00.000Z",
        endDate: "2024-01-24T05:45:00.000Z",
      },
    ];

    const result = groupEvents({
      events,
      calendarSelectedDate: dayjs(),
      calendarView: "schedule",
    });

    expect(result).toStrictEqual([
      {
        date: "2024-01-17T05:00:00.000Z",
        events: [
          {
            title: "Lunch with Sarah",
            startDate: "2024-01-17T05:00:00.000Z",
            endDate: "2024-01-17T05:45:00.000Z",
          },
        ],
      },
      {
        date: "2024-01-18T05:00:00.000Z",
        events: [
          {
            title: "Presentation rehearsal",
            startDate: "2024-01-18T05:00:00.000Z",
            endDate: "2024-01-18T06:45:00.000Z",
          },
        ],
      },
      {
        date: "2024-01-19T05:00:00.000Z",
        events: [
          {
            title: "Call with client",
            startDate: "2024-01-19T05:00:00.000Z",
            endDate: "2024-01-19T05:30:00.000Z",
          },
        ],
      },
      {
        date: "2024-01-20T05:00:00.000Z",
        events: [
          {
            title: "Yoga class",
            startDate: "2024-01-20T05:00:00.000Z",
            endDate: "2024-01-20T05:00:00.000Z",
          },
        ],
      },
    ]);
  });
});
