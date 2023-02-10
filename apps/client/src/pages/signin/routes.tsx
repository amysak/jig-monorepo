import { lazy, Route } from "@tanstack/react-router";
import { rootRoute } from "app";

export const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "signin",
  component: lazy(() => import("./signin")),
});
