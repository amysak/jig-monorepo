import { lazy, Route } from "@tanstack/react-router";
import { router } from "app";

import { api } from "lib/api";
import { queryClient } from "lib/query-client";
import { extensionsParamsSchema, setupParamsSchema } from "lib/validation";
import { setupRoute } from "../setup";

export const extensionsRoute = new Route({
  getParentRoute: () => setupRoute,
  path: "extensions",
});

export const extensionsIndexRoute = new Route({
  getParentRoute: () => extensionsRoute,
  path: "/",
  onLoad: ({ search }) => {
    queryClient.ensureQueryData({
      queryKey: ["panels", search],
      queryFn: () => api.panels.getAll(search),
    });
    queryClient.ensureQueryData({
      queryKey: ["toes", search],
      queryFn: () => api.toes.getAll(search),
    });
  },
  component: lazy(() => import("./extensions")),
});

export const extensionsByCategoryRoute = new Route({
  getParentRoute: () => extensionsIndexRoute,
  path: "$extensionCategory",
  // path: "$extensionCategory",
  parseParams: (params) => {
    const parsingResult = extensionsParamsSchema.safeParse(params);

    if (parsingResult.success) {
      return parsingResult.data;
    }

    return { extensionCategory: null };
  },
  onLoad: ({ search, params }) => {
    if (params.extensionCategory) {
      return queryClient.ensureQueryData({
        queryKey: [params.extensionCategory, { ...search }],
        queryFn: () => api[params.extensionCategory].getAll(search),
      });
    }

    router.navigate({
      from: extensionsByCategoryRoute.id,
      to: extensionsRoute.id,
    });
  },
  component: lazy(() => import("./extensions")),
});

export const extensionRoute = new Route({
  getParentRoute: () => extensionsByCategoryRoute,
  path: "$id",
  parseParams: (params) => setupParamsSchema.parse(params),
  // component: lazy(() => import("./$id")),
});
