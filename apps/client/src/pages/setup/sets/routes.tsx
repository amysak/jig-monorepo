import { lazy, Route } from "@tanstack/react-router";
import { router } from "app";
import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { setsParamsSchema, setupParamsSchema } from "lib/validation";

import { setupRoute } from "../setup";

export const setsRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "sets",
});

export const setsIndexRoute = new Route({
  getParentRoute: () => setsRoute,
  path: "/",
  onLoad: ({ search }) => {
    queryClient.ensureQueryData({
      queryKey: ["material-sets", search],
      queryFn: () => api.materialSets.getAll(search),
    });

    queryClient.ensureQueryData({
      queryKey: ["hardware-sets", search],
      queryFn: () => api.hardwareSets.getAll(search),
    });
  },
  component: lazy(() => import("./sets")),
});

export const setsWithTypeRoute = new Route({
  getParentRoute: () => setsIndexRoute,
  path: "$setType",
  parseParams: (params) => {
    const parsingResult = setsParamsSchema.safeParse(params);

    if (parsingResult.success) {
      return parsingResult.data;
    }

    return { setType: null };
  },
  onLoad: ({ search, params }) => {
    if (params.setType) {
      return queryClient.ensureQueryData({
        queryKey: [params.setType, { ...search }],
        queryFn: () => api[params.setType + "Sets"].getAll(search),
      });
    }

    router.navigate({
      from: setsWithTypeRoute.id,
      to: setsRoute.id,
    });
  },
});

export const setRoute = new Route({
  getParentRoute: () => setsWithTypeRoute,
  path: "$id",
  parseParams: (params) => setupParamsSchema.parse(params),
  component: lazy(() => import("./$id")),
});
