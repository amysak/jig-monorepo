import { rootNode } from "main";
import { useEffect, useState } from "react";

export function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const onError = (errorEvent: ErrorEvent) => {
    setHasError(true);
    console.error(errorEvent);
  };

  useEffect(() => {
    rootNode.addEventListener("error", onError);

    return () => rootNode.removeEventListener("error", onError);
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
}
