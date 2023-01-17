export const API_BASE_URL = import.meta.env.APP_API_HOST;
export const API_BASE_URL_V2 = import.meta.env.DEV
  ? "http://localhost:5050"
  : import.meta.env.APP_API_HOST_V2;
export const TOKEN_KEY = import.meta.env.APP_TOKEN_KEY || "TOKEN";
