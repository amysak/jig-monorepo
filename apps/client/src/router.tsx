import { FallbackUI } from "@jigbid/ui";
import {
  MakeGenerics,
  Navigate,
  ReactLocation,
  type Route,
} from "@tanstack/react-location";
import { GetMeResult } from "type-defs";

import { MainLayout } from "components/layout";
import { useAuthorization } from "hooks";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading } = useAuthorization();

  if (isLoading) {
    return <FallbackUI />;
  }

  if (!data?.account) {
    return <Navigate to="/signin" />;
  }

  return <MainLayout className="dashboardlayout">{children}</MainLayout>;
};

const PublicRoute = ({ children }) => {
  const { data, isLoading } = useAuthorization();

  if (isLoading) {
    return <FallbackUI />;
  }

  if (data?.account) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    me: GetMeResult;
  };
  Params: {
    id: string;
    tabName: string;
  };
  // Search: {};
}>;

// Set up a ReactLocation instance
export const location = new ReactLocation<LocationGenerics>();

// Build our routes. We could do this in our component, too.
export const routes: Route<LocationGenerics>[] = [
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
        children: [
          {
            path: "/",
            element: <Navigate to="info" />,
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
  // {
  //   path: "rooms",
  //   element: () => import("pages/rooms").then((res) => <res.default />),
  //   children: [
  //     {
  //       path: ":id",
  //       element: () => import("pages/room").then((res) => <res.default />),
  //     },
  //   ],
  // },
  {
    element: <FallbackUI />,
  },

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
];
