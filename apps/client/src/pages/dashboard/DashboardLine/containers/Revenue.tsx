// import { useGetRevenueStatsQuery } from 'api/rtkq'
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "api";

import { Line } from "../components";
import { useLineSettings } from "../hooks/useLineSettings";
import { Ranges } from "../utils";
import { PageSkeleton } from "@jigbid/ui";
import { DASHBOARD_ENTITIES } from "type-defs";

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
    api.accounts.getAccountStats({
      type: "revenue",
      date: responseDates[0].unix(),
      range,
    })
  );

  if (!data) {
    return <PageSkeleton />;
  }

  return (
    <Line
      temporaryDate={temporaryDate}
      setTemporaryDate={setTemporaryDate}
      responseDates={responseDates}
      setResponseDates={setResponseDates}
      entity={DASHBOARD_ENTITIES.REVENUE}
      data={data}
      range={range}
      setRange={setRange}
      isLoading={isLoading}
    />
  );
};
