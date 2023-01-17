import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

// import { useGetClientsStatsQuery } from 'api/rtkq'
import { api } from "api";
import { DASHBOARD_ENTITIES } from "type-defs";

import { Line } from "../components";
import { useLineSettings } from "../hooks/useLineSettings";
import { Ranges } from "../utils";
import { PageSkeleton } from "@jigbid/ui";

type ClientsProps = unknown;

export const Clients: FC<ClientsProps> = () => {
  const {
    responseDates,
    setResponseDates,
    temporaryDate,
    setTemporaryDate,
    range,
    setRange,
  } = useLineSettings(Ranges.month);

  const { data, isLoading } = useQuery(["stats", "clients"], () =>
    api.accounts.getAccountStats({
      type: "clients",
      date: responseDates[0].unix(),
      range,
    })
  );

  // const { isFetching: isClientsStatsFetching, data: clientsStat } =
  //     useGetClientsStatsQuery({
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
      entity={DASHBOARD_ENTITIES.CLIENT}
      data={data}
      range={range}
      setRange={setRange}
      isLoading={isLoading}
    />
  );
};
