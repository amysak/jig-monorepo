// import Notification from './components/organisms/notification'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "components/organisms/error";
import { theme } from "utilities/theme";

import Routes from "./Routes";
import { queryClient } from "./main";
import { useEffect, useState } from "react";
import FallbackUI from "components/organisms/fallbackui";

export const RootApp = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const onPageLoad = () => {
    setIsInitialLoading(false);
  };

  // This will run one time after the component mounts
  useEffect(() => {
    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  if (isInitialLoading) {
    return <FallbackUI />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <ConfigProvider theme={theme} componentSize="small">
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default RootApp;
