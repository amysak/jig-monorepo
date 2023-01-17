// import { useGetJobsStatsQuery } from 'api/rtkq'
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAccountStats } from "api/account";
import { DashboardEntities } from "entities";

import { Line } from "../components";
import { useLineSettings } from "../hooks/useLineSettings";
import { Ranges } from "../utils";

type JobsProps = unknown;

export const Jobs: FC<JobsProps> = () => {
  const {
    responseDates,
    setResponseDates,
    temporaryDate,
    setTemporaryDate,
    range,
    setRange,
  } = useLineSettings(Ranges.month);

  const { data, isLoading } = useQuery(["stats", "jobs"], () =>
    getAccountStats({
      type: "jobs",
      date: responseDates[0].unix(),
      range,
    })
  );

  // const { isFetching: isJobsStatsFetching, data: jobsStat } =
  //     useGetJobsStatsQuery({
  //         date: responseDates?.[0]?.unix(),
  //         range,
  //     })

  return (
    <Line
      temporaryDate={temporaryDate}
      setTemporaryDate={setTemporaryDate}
      responseDates={responseDates}
      setResponseDates={setResponseDates}
      entity={DashboardEntities.job}
      data={data}
      range={range}
      setRange={setRange}
      isLoading={isLoading}
    />
  );
};
