import { lazy, Route } from "@tanstack/react-router";

import { rootRoute } from "app";
import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import {
  jobParamsSchema,
  jobSearchSchema,
  jobsSearchSchema,
} from "lib/validation";

export const jobsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "jobs",
});

export const jobsIndexRoute = new Route({
  getParentRoute: () => jobsRoute,
  path: "/",
  validateSearch: jobsSearchSchema,
  onLoad: ({ search }) =>
    queryClient.ensureQueryData({
      queryKey: ["jobs", search],
      queryFn: () => api.jobs.getAll(search),
    }),
  component: lazy(() => import("./jobs")),
});

export const jobRoute = new Route({
  getParentRoute: () => jobsRoute,
  path: "$jobId",
  parseParams: (params) => jobParamsSchema.parse(params),
  validateSearch: jobSearchSchema,
  onLoad: ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ["jobs", params.jobId],
      queryFn: () => api.jobs.getById(params.jobId),
    }),
  component: lazy(() => import("./$jobId")),
});
