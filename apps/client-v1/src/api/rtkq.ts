import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AccountStats } from "entities/account";
import { RevenueStats } from "entities/revenue";

import { Ranges } from "features/DashboardLine/utils";
import { isEmpty, isNil } from "lodash";
import { IUserState } from "reducers/users/user";
import { tokenStorage } from "utilities/token-storage";

import { client } from "./Api";

const baseQuery = fetchBaseQuery({
  baseUrl: client.defaults.baseURL,
  prepareHeaders(headers, { getState }) {
    const {
      user: { isAuthenticated },
    } = getState() as { user: IUserState };

    if (
      isAuthenticated ||
      !isNil(tokenStorage.get()) ||
      !isEmpty(tokenStorage.get())
    ) {
      headers.set("Authorization", `Bearer ${tokenStorage.get()}`);
    }
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: (builder) => ({
    getClientsStats: builder.query<
      AccountStats,
      { date: number; range: Ranges }
    >({
      query: ({ date, range }) =>
        `accounts/stats/?type=clients&date=${date}&range=${range}`,
    }),

    getJobsStats: builder.query<AccountStats, { date: number; range: Ranges }>({
      query: ({ date, range }) =>
        `accounts/stats/?type=jobs&date=${date}&range=${range}`,
    }),

    getRevenueStats: builder.query<
      RevenueStats,
      { date: number; range: Ranges }
    >({
      query: ({ date, range }) =>
        `accounts/stats/?type=revenue&date=${date}&range=${range}`,
    }),
  }),
});

export const {
  useGetClientsStatsQuery,
  useGetJobsStatsQuery,
  useGetRevenueStatsQuery,
} = baseApi;
