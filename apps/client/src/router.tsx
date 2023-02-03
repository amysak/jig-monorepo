import {
  MakeGenerics,
  Navigate,
  ReactLocation,
} from "@tanstack/react-location";
import { FilterValue } from "antd/es/table/interface";
import { CabinetExtensionCategory, GetStatsDto, Pagination } from "type-defs";

import { useAuthorization } from "hooks";
import { Fallback } from "layouts/fallback";
import { MainLayout } from "layouts/main";
import { api } from "lib/api";

import { queryClient } from "./app";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading } = useAuthorization();

  if (isLoading) {
    return <Fallback />;
  }

  if (!data?.isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <MainLayout>{children}</MainLayout>;
};

const PublicRoute = ({ children }) => {
  const { data, isLoading } = useAuthorization();

  if (isLoading) {
    return <Fallback />;
  }

  if (data?.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export type SetupSearch = {
  category?: string | null;
  search?: string;
};

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    // me?: GetMeResult;
  };
  Search: {
    stats?: GetStatsDto;
    filters?: Record<string, any>;
    pagination?: Pagination;
    // TODO: add enum
    setup?: SetupSearch;
    group?: boolean;
  };
  Params: {
    id: string;
    tabName?: string;
    extensionCategory?: CabinetExtensionCategory;
  };
}>;

// Set up a ReactLocation instance
export const location = new ReactLocation<LocationGenerics>({});

export const routes = [
  {
    path: "setup",
    element: () =>
      import("pages/setup").then((res) => (
        <ProtectedRoute>
          <res.default />
        </ProtectedRoute>
      )),
    children: [
      {
        path: "cabinets",
        element: () =>
          import("pages/setup/cabinets").then((res) => <res.default />),
        children: [
          // Below is a modal
          {
            path: ":id",
            element: () =>
              import("pages/setup/cabinets/edit").then((res) => (
                <res.default />
              )),
          },
        ],
      },
      {
        path: "openings",
        element: () =>
          import("pages/setup/openings").then((res) => <res.default />),
        children: [
          // Below is a modal
          // {
          //   path: ":id",
          //   element: () =>
          //     import("pages/setup/openings/edit-cabinet").then((res) => (
          //       <res.default />
          //     )),
          // },
        ],
      },
      {
        path: "profiles",
        element: () =>
          import("pages/setup/profiles").then((res) => <res.default />),
        children: [],
      },
      {
        path: "equipment",
        // loader: () =>
        //   // queryClient.getQueryData(["equipment"]) ??
        //   queryClient
        //     .fetchQuery(["equipment"], () =>
        //       Promise.all([api.trims.getAll(), api.moldings])
        //     )
        //     .then(() => ({})),
        element: () =>
          import("pages/setup/equipment").then((res) => <res.default />),
        children: [],
      },
      {
        path: "extensions",
        // loader: () =>
        //   // queryClient.getQueryData(["equipment"]) ??
        //   queryClient
        //     .fetchQuery(["equipment"], () =>
        //       Promise.all([api.trims.getAll(), api.moldings])
        //     )
        //     .then(() => ({})),
        element: () =>
          import("pages/setup/extensions").then((res) => <res.default />),
        children: [
          {
            path: ":extensionCategory",
            // element: () =>
            //   import("pages/setup/extensions").then((res) => (
            //     <res.default />
            //   )),
          },
        ],
      },
      {
        path: "materials",
        element: () =>
          import("pages/setup/materials").then((res) => <res.default />),
        children: [],
      },
      {
        path: "finishes",
        element: () =>
          import("pages/setup/finishes").then((res) => <res.default />),
        children: [],
      },
      {
        path: "prices",
        element: () =>
          import("pages/setup/prices").then((res) => <res.default />),
        children: [],
      },
      {
        path: "sets",
        element: () =>
          import("pages/setup/sets").then((res) => <res.default />),
        children: [],
      },
      { path: "*", element: <Navigate to="/setup" replace /> },
    ],
  },
  {
    path: "dashboard",
    element: () =>
      import("pages/dashboard").then((res) => (
        <ProtectedRoute>
          <res.default />
        </ProtectedRoute>
      )),
  },
  {
    path: "signin",
    element: () =>
      import("pages/signin").then((res) => (
        <PublicRoute>
          <res.default />
        </PublicRoute>
      )),
  },
  // {
  //   path: "signup",
  //   element: () => import("pages/signup").then((res) => <res.default />),
  // },
  {
    path: "jobs",
    children: [
      {
        path: "/",
        element: () =>
          import("pages/jobs").then((res) => (
            <ProtectedRoute>
              <res.default />
            </ProtectedRoute>
          )),
      },
      {
        path: ":id",
        loader: (routeMatch) =>
          queryClient.getQueryData(["job", routeMatch.params.id]) ??
          queryClient
            .fetchQuery(["job", routeMatch.params.id], () =>
              api.jobs.getById(routeMatch.params.id)
            )
            .then(() => ({})),
        children: [
          {
            path: "/",
            element: <Navigate to="info" replace />,
          },
          {
            path: ":tabName",
            element: () =>
              import("pages/job").then((res) => (
                <ProtectedRoute>
                  <res.default />
                </ProtectedRoute>
              )),
          },
        ],
      },
    ],
  },
  {
    path: "rooms",
    children: [
      {
        path: ":id",
        element: () =>
          import("pages/room").then((res) => (
            <ProtectedRoute>
              <res.default />
            </ProtectedRoute>
          )),
      },
    ],
  },
  {
    element: <Navigate to="dashboard" replace />,
  },
];

// reference
// loader: async () => {
//   return {
//     invoices: await fetchInvoices(),
//   };
// },
// children: [
//   { path: "/", element: <DashboardHome /> },
//   {
//     path: "invoices",
//     element: <Invoices />,
//     children: [
//       { path: "/", element: <InvoicesHome /> },
//       {
//         path: ":invoiceId",
//         element: <Invoice />,
//         loader: async ({ params: { invoiceId } }) => {
//           return {
//             invoice: await fetchInvoiceById(invoiceId),
//           };
//         },
//         onMatch: (match) => {
//           console.log(`Now rendering invoice ${match.params.invoiceId}`);
//           return () => {
//             console.log(
//               `No longer rendering invoice ${match.params.invoiceId}`
//             );
//           };
//         },
//       },
//     ],
//   },
//   {
//     path: "users",
//     element: <Users />,
//     loader: async () => {
//       return {
//         users: await fetchUsers(),
//       };
//     },
//     searchFilters: [
//       // Keep the usersView search param around
//       // while in this route (or it's children!)
//       (search) => ({
//         ...search,
//         usersView: {
//           ...search.usersView,
//         },
//       }),
//     ],
//     children: [
//       {
//         path: ":userId",
//         element: <User />,
//         loader: async ({ params: { userId } }) => {
//           return {
//             user: await fetchUserById(userId),
//           };
//         },
//       },
//     ],
//   },
// ],
// {
//   // Your elements can be asynchronous, which means you can code-split!
//   path: "expensive",
//   element: () =>
//     import("./Expensive").then((res) => <res.Expensive />)
// },
// {
//   path: "authenticated/",
//   element: <Auth />,
//   children: [
//     {
//       path: "/",
//       element: <Authenticated />,
//     },
//   ],
// },
