import { nanoid } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

import { DatePickerProps as DefaultDatePickerProps } from "components/atoms";
import { AccountStats, DashboardEntities } from "entities/account";

export enum Colors {
  yellow = "hsl(44, 98%, 62%)",
  green = "hsl(164, 96%, 38%)",
  purple = "hsl(245, 73%, 65%)",
}

export enum Ranges {
  week = "week",
  month = "month",
  year = "year",
}

export type StatsType = "revenue" | "clients" | "jobs";

dayjs.extend(utc);

export const getStartOfWeek = (date: Dayjs) => date.clone().startOf("week");
export const getEndOfWeek = (date: Dayjs) => date.clone().endOf("week");

export const getDateOfRangeWithoutUtc = (range: Ranges, date: Dayjs) =>
  date.clone().utc(false).startOf(range);

export type TFormatsByRange = {
  [key in Ranges]: DefaultDatePickerProps["format"];
};

export const formatsByRange: TFormatsByRange = {
  week: (value) => {
    const weekFormat = "D MMM YYYY";
    const start = getStartOfWeek(value).format(weekFormat);
    const end = getEndOfWeek(value).format(weekFormat);

    return `${start}, ${end}`;
  },
  month: (value) => `${value.format("MMMM - YYYY")}`,
  year: (value) => `${value.format("YYYY")}`,
};

export const LineColorsByEntities = {
  [DashboardEntities.client]: Colors.yellow,
  [DashboardEntities.job]: Colors.green,
  [DashboardEntities.revenue]: Colors.purple,
};

const isWeekOrMonth = (range: Ranges) =>
  range === Ranges.week || range === Ranges.month;

// we need to simplify this critically
export const prepareData = (
  from: Dayjs,
  range: Ranges,
  inputData: AccountStats,
  type: DashboardEntities
) => {
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
      date.add(idx, isWeekOrMonth(range) ? "day" : "month")
    )
    .map((date) => {
      const stat = inputData.data?.find((stats) =>
        dayjs(stats?.date).isSame(
          dayjs(date),
          isWeekOrMonth(range) ? "day" : "month"
        )
      );

      const x = date.format(isWeekOrMonth(range) ? "D" : "MMM");

      const y = stat?.value || 0;

      return {
        x,
        y,
        key: nanoid(),
      };
    });

  return [
    {
      ...inputData,
      id: type,
      data,
    },
  ];
};
