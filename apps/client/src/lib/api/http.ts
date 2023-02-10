import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { isEmpty } from "lodash-es";

import { API_BASE_URL } from "lib/envs";
import { flattenObject } from "lib/functions";
import { tokenActions } from "lib/store";
import { api } from "lib/api";
import { router } from "app";

export type QueryResult<T extends (...args: unknown[]) => unknown> = Awaited<
  ReturnType<T>
>;

export default class Client {
  constructor(private _client: AxiosInstance) {}

  async call(configOrUrl: AxiosRequestConfig): Promise<any>;
  async call(configOrUrl: string, method: string, data?: unknown): Promise<any>;
  async call(
    configOrUrl: string | AxiosRequestConfig,
    method?: string,
    data?: unknown
  ) {
    if (typeof configOrUrl === "string") {
      const resp = await this._client[method!](configOrUrl, data);
      return resp.data;
    }

    const resp = await this._client(configOrUrl);
    return resp.data;
  }

  async get(url: string) {
    return this.call(url, "get");
  }

  async post(url: string, data: unknown) {
    return this.call(url, "post", data);
  }

  async put(url: string, data?: unknown) {
    return this.call(url, "put", data);
  }

  async update(url: string, data?: unknown) {
    return this.call(url, "patch", data);
  }

  async delete(url: string) {
    return this.call(url, "delete");
  }

  getQueryString(search?: Record<string, unknown>) {
    if (isEmpty(search)) {
      return "";
    }
    // TODO: type
    const flattenedSearch = flattenObject(search);

    const query = new URLSearchParams(flattenedSearch as any);
    // console.log("query => ", query.toString());
    return query.toString();
  }
}

export const axios = Axios.create({
  baseURL: API_BASE_URL,
});

// Handling authorization
axios.interceptors.request.use(
  (config) => {
    const token = tokenActions.get("access");

    if (token) {
      if (!config.headers) config.headers = {};
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      const existingToken = tokenActions.get("refresh");
      if (!existingToken) {
        return router.navigate({ to: "/signin" });
      }

      originalRequest._retry = true;
      try {
        const tokens = await api.auth.updateTokenPair(existingToken);

        tokenActions.set("access", tokens.accessToken);
        tokenActions.set("refresh", tokens.refreshToken);

        return axios(originalRequest);
      } catch (err) {
        console.log("Error persists or unable to update refresh token:");
        console.log(err);

        return router.navigate({ to: "/signin" });
      }
    }

    return router.navigate({ to: "/signin" });
  }
);

export const client = new Client(axios);
