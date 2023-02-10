import { Navigate, Outlet, Route } from "@tanstack/react-router";

import { rootRoute } from "app";
import MainLayout from "layouts/main";
import { roomsIndexRoute } from "pages/rooms";
import {
  cabinetRoute,
  cabinetsIndexRoute,
  cabinetsRoute,
  dashboardRoute,
  equipmentIndexRoute,
  equipmentItemRoute,
  equipmentRoute,
  extensionRoute,
  extensionsByCategoryRoute,
  extensionsIndexRoute,
  extensionsRoute,
  finishesIndexRoute,
  finishesRoute,
  finishRoute,
  jobRoute,
  jobsIndexRoute,
  jobsRoute,
  materialRoute,
  materialsIndexRoute,
  materialsRoute,
  openingRoute,
  openingsIndexRoute,
  openingsRoute,
  profileRoute,
  profilesIndexRoute,
  profilesRoute,
  roomRoute,
  roomsRoute,
  setRoute,
  setsIndexRoute,
  setsRoute,
  setsWithTypeRoute,
  setupIndexRoute,
  setupRoute,
  signInRoute,
} from "pages/routes";

export const mainLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "main-layout",
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/dashboard" />,
});

export const rootChildren = [
  mainLayoutRoute.addChildren([
    indexRoute,
    setupRoute.addChildren([
      setupIndexRoute,
      cabinetsRoute.addChildren([
        cabinetsIndexRoute.addChildren([cabinetRoute]),
      ]),
      openingsRoute.addChildren([openingsIndexRoute, openingRoute]),
      extensionsRoute.addChildren([
        extensionsIndexRoute.addChildren([
          extensionsByCategoryRoute.addChildren([extensionRoute]),
        ]),
      ]),
      profilesRoute.addChildren([profilesIndexRoute, profileRoute]),
      equipmentRoute.addChildren([equipmentIndexRoute, equipmentItemRoute]),
      materialsRoute.addChildren([materialsIndexRoute, materialRoute]),
      finishesRoute.addChildren([finishesIndexRoute, finishRoute]),
      setsRoute.addChildren([
        setsIndexRoute.addChildren([setsWithTypeRoute.addChildren([setRoute])]),
      ]),
      // hardwareRoute,
    ]),
    jobsRoute.addChildren([jobsIndexRoute, jobRoute]),
    roomsRoute.addChildren([roomsIndexRoute, roomRoute]),
    dashboardRoute,
  ]),
  signInRoute,
];
