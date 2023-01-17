// import { useGetJobsStatsQuery } from 'api/rtkq'
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "api";
import { DASHBOARD_ENTITIES } from "type-defs";

import { Line } from "../components";
import { useLineSettings } from "../hooks/useLineSettings";
import { Ranges } from "../utils";
import { PageSkeleton } from "@jigbid/ui";

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
    api.accounts.getAccountStats({
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
  if (!data) {
    return <PageSkeleton />;
  }

  return (
    <Line
      temporaryDate={temporaryDate}
      setTemporaryDate={setTemporaryDate}
      responseDates={responseDates}
      setResponseDates={setResponseDates}
      entity={DASHBOARD_ENTITIES.JOB}
      data={data}
      range={range}
      setRange={setRange}
      isLoading={isLoading}
    />
  );
};
