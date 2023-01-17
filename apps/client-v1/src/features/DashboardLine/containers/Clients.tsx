import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

// import { useGetClientsStatsQuery } from 'api/rtkq'
import { getAccountStats } from "api/account";
import { DashboardEntities } from "entities";

import { Line } from "../components";
import { useLineSettings } from "../hooks/useLineSettings";
import { Ranges } from "../utils";

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
    getAccountStats({
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

  return (
    <Line
      temporaryDate={temporaryDate}
      setTemporaryDate={setTemporaryDate}
      responseDates={responseDates}
      setResponseDates={setResponseDates}
      entity={DashboardEntities.client}
      data={data}
      range={range}
      setRange={setRange}
      isLoading={isLoading}
    />
  );
};
