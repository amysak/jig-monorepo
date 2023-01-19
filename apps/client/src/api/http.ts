import Axios, { AxiosError, AxiosInstance } from "axios";

import { LocationGenerics } from "router";
import { PaginationDto } from "type-defs";

import { tokenStorage } from "utilities/token-storage";
import { API_BASE_URL } from "../utilities/envs";

export type QueryResult<T extends (...args: unknown[]) => unknown> = Awaited<
  ReturnType<T>
>;

export default class Client {
  constructor(private _client: AxiosInstance) {
    const token = tokenStorage.get();

    if (token) {
      this.setAuthorizationToken(token);
    }
  }

  async call(url: string, method: string, data?: any) {
    try {
      const resp = await this._client[method](url, data);
      return resp.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Something went wrong...",
          error.message || error.response?.data
        );

        throw error.response?.data;
      }
    }
  }

  async get(url: string) {
    return this.call(url, "get");
  }

  async post(url: string, data: any) {
    return this.call(url, "post", data);
  }

  async update(url: string, data?: any) {
    return this.call(url, "patch", data);
  }

  async delete(url: string) {
    return this.call(url, "delete");
  }

  setAuthorizationToken(token: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    this._client.defaults.headers.common = headers;
  }

  getQueryString(search?: LocationGenerics["Search"]) {
    const query = new URLSearchParams(search as any);

    console.log("query.toString() => ", query.toString());

    return query.toString();
  }
}

export const axios = Axios.create({
  baseURL: API_BASE_URL,
});

export const client = new Client(axios);
