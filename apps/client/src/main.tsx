import { hydrate } from "react-dom";
import { createRoot } from "react-dom/client";

import { App } from "app";

import "assets/styles/index.scss";

export const rootNode = document.getElementById("root");
if (!rootNode) {
  throw new Error("No root node available in the index.html document.");
}
const root = createRoot(rootNode);

if (rootNode.hasChildNodes()) {
  hydrate(<App />, rootNode);
} else {
  root.render(<App />);
}
