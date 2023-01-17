import { useEffect, useState } from "react";

import { rootNode } from "main";

export function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const onError = (errorEvent: ErrorEvent) => {
    setHasError(true);
    console.error("React Error Boundary: ", errorEvent);
  };

  useEffect(() => {
    if (!rootNode) {
      return;
    }

    rootNode.addEventListener("error", onError);

    return () => rootNode!.removeEventListener("error", onError);
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
}
