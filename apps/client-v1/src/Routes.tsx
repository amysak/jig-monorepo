import { lazy, ReactNode, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import FallbackUI from "components/organisms/fallbackui";
import { useAuthorization } from "hooks";
import { shortId } from "utilities/utils";

const Reports = lazy(() => import("features/Reports"));
const NotFoundPage = lazy(() => import("pages/404"));
const AccountPage = lazy(() => import("pages/account"));
const Dashboard = lazy(() => import("pages/dashboard"));
const GettingStarted = lazy(() => import("pages/getting-started"));
const Home = lazy(() => import("pages/home"));
const Job = lazy(() => import("pages/job"));
const Jobs = lazy(() => import("pages/jobs"));
const PasswordReset = lazy(() => import("pages/password-reset"));
const SigninPage = lazy(() => import("pages/signin"));
const Signout = lazy(() => import("pages/signout"));
const SignupPage = lazy(() => import("pages/signup"));

const ProtectedRoute = ({ children }) => {
  const { data, isLoading } = useAuthorization();

  if (isLoading) {
    return <FallbackUI />;
  }

  if (!data?.account) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }

  return children;
};

const AppRoutes = () => {
  const SuspenseRoute = ({ children }: { children: ReactNode }) => (
    <Suspense fallback={<FallbackUI />}>{children}</Suspense>
  );

  return (
    <Routes>
      <Route
        key={shortId()}
        path={"/signin"}
        element={
          <Suspense>
            <SigninPage />
          </Suspense>
        }
      />
      <Route
        key={shortId()}
        path={"/signup"}
        element={
          <Suspense>
            <SignupPage />
          </Suspense>
        }
      />
      <Route
        key={shortId()}
        path={"/password-reset"}
        element={
          <Suspense>
            <PasswordReset />
          </Suspense>
        }
      />
      <Route
        key={shortId()}
        path={"/"}
        element={
          <SuspenseRoute>
            <Home />
          </SuspenseRoute>
        }
      />
      <Route
        key={shortId()}
        path={"/dashboard"}
        element={
          <SuspenseRoute>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </SuspenseRoute>
        }
      />
      {/* <Route key={shortId()} path={"/start-bid"} element={<StartBid />} />
      <Route key={shortId()} path={"/clients"} element={<Clients />} />
      <Route
        key={shortId()}
        path={"/clients/:id/:tabName?"}
        element={<Home />}
      /> */}
      <Route
        key={shortId()}
        path={"/jobs"}
        element={
          <Suspense>
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        key={shortId()}
        path={"/jobs/:id/:tabName?"}
        element={
          <Suspense>
            <ProtectedRoute>
              <Job />
            </ProtectedRoute>
          </Suspense>
        }
      />
      {/* <Route key={shortId()} path={"/rooms"} element={<RoomsPage />} />
      <Route
        key={shortId()}
        path={"/rooms/:id/:tabName?/:subTab?"}
        element={<Home />}
      />
      <Route
        key={shortId()}
        path={"/cabinet-setup"}
        element={<CabinetSetupPage />}
      />
      <Route
        key={shortId()}
        path={"/default-setup"}
        element={<DefaultSetupPage />}
      /> */}
      <Route
        key={shortId()}
        path={"/reports"}
        element={
          <Suspense>
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route key={shortId()} path={"/account/signout"} element={<Signout />} />
      <Route
        key={shortId()}
        path={"/account/:tabName?"}
        element={
          <Suspense>
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        key={shortId()}
        path={"/getting-started"}
        element={
          <Suspense>
            <ProtectedRoute>
              <GettingStarted />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        key={shortId()}
        path={"*"}
        element={
          <Suspense>
            <ProtectedRoute>
              <NotFoundPage />
            </ProtectedRoute>
          </Suspense>
        }
      />
    </Routes>
  );
};

export { AppRoutes as Routes };

export default AppRoutes;
