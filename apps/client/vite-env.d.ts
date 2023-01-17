/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly APP_API_HOST: string;
  readonly APP_API_HOST_V2: string;
  readonly APP_TOKEN_KEY: string;
  readonly APP_STRIPE_PK: string; // Needs to be hidden later via Vite env templates
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & { title?: string }
  >;

  export = ReactComponent;
}
