import Axios, { AxiosError, AxiosInstance } from "axios";

import { tokenStorage } from "utilities/token-storage";
import { API_BASE_URL_V2 } from "../utilities/envs";

export type QueryResult<T extends (...args: unknown[]) => unknown> = Awaited<
  ReturnType<T>
>;

// TODO: this needs to be redesigned. the way it should look is us importing bunch of stuff
// from files in that directory and joining each individual import (all its contents like `* from`)
// to a field in api object exported from this directory.
// exported object: api: { jobs: { <methods> }, accounts: { <methods> }, ... }
// for example, instead of importing getJobs, we could import `api` object and call:
// const jobs = api.jobs.getJobs();
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
}

export const axios = Axios.create({
  baseURL: API_BASE_URL_V2,
});

export const client = new Client(axios);
