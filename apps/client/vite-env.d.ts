/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_API_HOST: string;
  readonly APP_API_HOST_V2: string;
  readonly APP_TOKEN_KEY: string;
  readonly APP_STRIPE_PK: string; // Needs to be hidden later via Vite env templates
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*&imagetools" {
  interface OutputMetadata {
    src: string; // URL of the generated image
    width: number; // Width of the image
    height: number; // Height of the image
    format: string; // Format of the generated image

    // The following options are the same as sharps input options
    space: string; // Name of colour space interpretation
    channels: number; // Number of bands e.g. 3 for sRGB, 4 for CMYK
    density: number; //  Number of pixels per inch
    depth: string; // Name of pixel depth format
    hasAlpha: boolean; // presence of an alpha transparency channel
    hasProfile: boolean; // presence of an embedded ICC profile
    isProgressive: boolean; // indicating whether the image is interlaced using a progressive scan
  }

  const output: OutputMetadata;
  export default output;
}

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & { title?: string }
  >;

  export = ReactComponent;
}
