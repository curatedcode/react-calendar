import dayjs from "dayjs";
import getSixWeeksByMonth from "src/components/fn/getSixWeeksByMonth";
import { describe, expect, test } from "vitest";

describe("getSixWeeksByMonth", () => {
  test("returns 6 weeks from and surrounding January", () => {
    const result = getSixWeeksByMonth(dayjs(new Date(2024, 0, 3)));

    expect(result).toStrictEqual([
      [
        "2023-12-31T05:00:00.000Z",
        "2024-01-01T05:00:00.000Z",
        "2024-01-02T05:00:00.000Z",
        "2024-01-03T05:00:00.000Z",
        "2024-01-04T05:00:00.000Z",
        "2024-01-05T05:00:00.000Z",
        "2024-01-06T05:00:00.000Z",
      ],
      [
        "2024-01-07T05:00:00.000Z",
        "2024-01-08T05:00:00.000Z",
        "2024-01-09T05:00:00.000Z",
        "2024-01-10T05:00:00.000Z",
        "2024-01-11T05:00:00.000Z",
        "2024-01-12T05:00:00.000Z",
        "2024-01-13T05:00:00.000Z",
      ],
      [
        "2024-01-14T05:00:00.000Z",
        "2024-01-15T05:00:00.000Z",
        "2024-01-16T05:00:00.000Z",
        "2024-01-17T05:00:00.000Z",
        "2024-01-18T05:00:00.000Z",
        "2024-01-19T05:00:00.000Z",
        "2024-01-20T05:00:00.000Z",
      ],
      [
        "2024-01-21T05:00:00.000Z",
        "2024-01-22T05:00:00.000Z",
        "2024-01-23T05:00:00.000Z",
        "2024-01-24T05:00:00.000Z",
        "2024-01-25T05:00:00.000Z",
        "2024-01-26T05:00:00.000Z",
        "2024-01-27T05:00:00.000Z",
      ],
      [
        "2024-01-28T05:00:00.000Z",
        "2024-01-29T05:00:00.000Z",
        "2024-01-30T05:00:00.000Z",
        "2024-01-31T05:00:00.000Z",
        "2024-02-01T05:00:00.000Z",
        "2024-02-02T05:00:00.000Z",
        "2024-02-03T05:00:00.000Z",
      ],
      [
        "2024-02-04T05:00:00.000Z",
        "2024-02-05T05:00:00.000Z",
        "2024-02-06T05:00:00.000Z",
        "2024-02-07T05:00:00.000Z",
        "2024-02-08T05:00:00.000Z",
        "2024-02-09T05:00:00.000Z",
        "2024-02-10T05:00:00.000Z",
      ],
    ]);
  });

  test("each week starts on sunday and ends on saturday", () => {
    const result = getSixWeeksByMonth(dayjs(new Date(2024, 0, 3)));

    for (let i = 0; i < result.length; i++) {
      const week = result[i];

      for (let j = 0; j < week.length; j++) {
        const day = dayjs(week[j]).day();

        expect(day).toStrictEqual(j);
      }
    }
  });
});
