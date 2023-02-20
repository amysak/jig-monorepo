import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Outlet,
  ReactRouter,
  RootRoute,
  RouterProvider,
} from "@tanstack/react-router";
import { ConfigProvider } from "antd";
import { lazy } from "react";

import { ErrorBoundary } from "components/error";
import { Fallback } from "layouts/fallback";
import { queryClient } from "lib/query-client";
import { theme } from "lib/theme";

import { rootChildren } from "./tree";

const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )
  : () => null;

export const rootRoute = new RootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools position="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
      <ConfigProvider theme={theme} componentSize="small">
        <Outlet />
      </ConfigProvider>
    </QueryClientProvider>
  ),
  errorComponent: ErrorBoundary,
});

export const router = new ReactRouter({
  routeTree: rootRoute.addChildren(rootChildren),
  defaultPendingComponent: Fallback,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => <RouterProvider router={router} />;

// export const routes = [
//   {
//     path: "setup",
//     element: () =>
//       import("pages/setup/setup").then((res) => (
//         <ProtectedRoute>
//           <res.default />
//         </ProtectedRoute>
//       )),
//     children: [
//       {
//         path: "cabinets",
//         element: () =>
//           import("pages/setup/cabinets").then((res) => <res.default />),
//         children: [
//           // Below is a modal
//           {
//             path: ":id",
//             element: () =>
//               import("pages/setup/cabinets/edit").then((res) => (
//                 <res.default />
//               )),
//           },
//         ],
//       },
//       {
//         path: "openings",
//         element: () =>
//           import("pages/setup/openings").then((res) => <res.default />),
//         children: [
//           // Below is a modal
//           // {
//           //   path: ":id",
//           //   element: () =>
//           //     import("pages/setup/openings/edit-cabinet").then((res) => (
//           //       <res.default />
//           //     )),
//           // },
//         ],
//       },
//       {
//         path: "profiles",
//         element: () =>
//           import("pages/setup/profiles").then((res) => <res.default />),
//         children: [],
//       },
//       {
//         path: "equipment",
//         // loader: () =>
//         //   // queryClient.getQueryData(["equipment"]) ??
//         //   queryClient
//         //     .fetchQuery(["equipment"], () =>
//         //       Promise.all([api.trims.getAll(), api.moldings])
//         //     )
//         //     .then(() => ({})),
//         element: () =>
//           import("pages/setup/equipment").then((res) => <res.default />),
//         children: [],
//       },
//       {
//         path: "extensions",
//         // loader: () =>
//         //   // queryClient.getQueryData(["equipment"]) ??
//         //   queryClient
//         //     .fetchQuery(["equipment"], () =>
//         //       Promise.all([api.trims.getAll(), api.moldings])
//         //     )
//         //     .then(() => ({})),
//         element: () =>
//           import("pages/setup/extensions").then((res) => <res.default />),
//         children: [
//           {
//             path: ":extensionCategory",
//             // element: () =>
//             //   import("pages/setup/extensions").then((res) => (
//             //     <res.default />
//             //   )),
//           },
//         ],
//       },
//       {
//         path: "materials",
//         element: () =>
//           import("pages/setup/materials").then((res) => <res.default />),
//         children: [],
//       },
//       {
//         path: "finishes",
//         element: () =>
//           import("pages/setup/finishes").then((res) => <res.default />),
//         children: [],
//       },
//       {
//         path: "prices",
//         element: () =>
//           import("pages/setup/prices").then((res) => <res.default />),
//         children: [],
//       },
//       {
//         path: "sets",
//         element: () =>
//           import("pages/setup/sets").then((res) => <res.default />),
//         children: [
//           {
//             path: ":setType",
//             children: [
//               {
//                 path: ":id",
//                 element: () =>
//                   import("pages/setup/sets/edit").then((res) => (
//                     <res.default />
//                   )),
//               },
//             ],
//           },
//         ],
//       },
//       { path: "*", element: <Navigate to="/setup" replace /> },
//     ],
//   },
//   {
//     path: "dashboard",
//     element: () =>
//       import("pages/dashboard").then((res) => (
//         <ProtectedRoute>
//           <res.default />
//         </ProtectedRoute>
//       )),
//   },
//   {
//     path: "signin",
//     element: () =>
//       import("pages/signin").then((res) => (
//         <PublicRoute>
//           <res.default />
//         </PublicRoute>
//       )),
//   },
//   // {
//   //   path: "signup",
//   //   element: () => import("pages/signup").then((res) => <res.default />),
//   // },
//   {
//     path: "jobs",
//     children: [
//       {
//         path: "/",
//         element: () =>
//           import("pages/jobs").then((res) => (
//             <ProtectedRoute>
//               <res.default />
//             </ProtectedRoute>
//           )),
//       },
//       {
//         path: ":id",
//         loader: (routeMatch) =>
//           queryClient.getQueryData(["job", routeMatch.params.id]) ??
//           queryClient
//             .fetchQuery(["job", routeMatch.params.id], () =>
//               api.jobs.getById(routeMatch.params.id)
//             )
//             .then(() => ({})),
//         children: [
//           {
//             path: "/",
//             element: <Navigate to="info" replace />,
//           },
//           {
//             path: ":tabName",
//             element: () =>
//               import("pages/job").then((res) => (
//                 <ProtectedRoute>
//                   <res.default />
//                 </ProtectedRoute>
//               )),
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: "rooms",
//     children: [
//       {
//         path: ":id",
//         element: () =>
//           import("pages/room").then((res) => (
//             <ProtectedRoute>
//               <res.default />
//             </ProtectedRoute>
//           )),
//       },
//     ],
//   },
//   {
//     element: <Navigate to="dashboard" replace />,
//   },
// ];
