// import { useGetRevenueStatsQuery } from 'api/rtkq'
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAccountStats } from "api/account";
import { DashboardEntities } from "entities";

import { Line } from "../components";
import { useLineSettings } from "../hooks/useLineSettings";
import { Ranges } from "../utils";

type RevenueProps = unknown;

export const Revenue: FC<RevenueProps> = () => {
  const {
    responseDates,
    setResponseDates,
    range,
    setRange,
    temporaryDate,
    setTemporaryDate,
  } = useLineSettings(Ranges.month);

  const { data, isLoading } = useQuery(["stats", "revenue"], () =>
    getAccountStats({
      type: "revenue",
      date: responseDates[0].unix(),
      range,
    })
  );

  return (
    <Line
      temporaryDate={temporaryDate}
      setTemporaryDate={setTemporaryDate}
      responseDates={responseDates}
      setResponseDates={setResponseDates}
      entity={DashboardEntities.revenue}
      data={data}
      range={range}
      setRange={setRange}
      isLoading={isLoading}
    />
  );
};
