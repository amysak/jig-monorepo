import { Dayjs } from "dayjs";
import { random } from "lodash-es";
import { nanoid } from "nanoid";

import type { StatsOption } from "type-defs";

import { Ranges } from "./utils";

export const getClients = (from: Dayjs, range: Ranges, type: StatsOption) => {
  const daysInWeek = 7;
  const daysInMonth = from.daysInMonth();
  const monthsInYear = 12;

  const subsectionsCount =
    range === Ranges.week
      ? daysInWeek
      : range === Ranges.year
      ? monthsInYear
      : daysInMonth;

  const data = new Array(subsectionsCount)
    .fill(from)
    .map((date: Dayjs, idx) =>
      date
        .clone()
        .add(
          idx,
          range === Ranges.week || range === Ranges.month ? "day" : "month"
        )
    )
    .map((date) => {
      return {
        x:
          range === Ranges.week || range === Ranges.month
            ? date.format("D")
            : date.format("MMM"),
        y: random(12, 200),
        key: nanoid(),
      };
    });
  const getResponse = () => {
    return [
      {
        id: type,
        total: random(1500, 5000),
        plus: data.reduce((acc, { y }) => acc + y, 0),
        data,
      },
    ];
  };
  return getResponse();
};
