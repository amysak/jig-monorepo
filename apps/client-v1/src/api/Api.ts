import Axios, { AxiosError, AxiosInstance } from "axios";
import { tokenStorage } from "utilities/token-storage";
import { API_BASE_URL, API_BASE_URL_V2 } from "../utilities/envs";

export type QueryResult<T extends (...args: unknown[]) => unknown> = Awaited<
  ReturnType<T>
>;

// TODO: this needs to be redesigned. the way it should look is us importing bunch of stuff
// from files in that directory and joining each individual import (all its contents like `* from`)
// to a field in api object exported from this directory.
// exported object: api: { jobs: { <methods> }, accounts: { <methods> }, ... }
// for example, instead of importing getJobs, we could import `api` object and call:
// const jobs = api.jobs.getJobs();
export default class Api {
  public client: AxiosInstance;
  public pageSize: string | number;
  public current: string | number;

  constructor(client: AxiosInstance) {
    this.client = client;

    const token = tokenStorage.get();

    if (token) {
      client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  async call(url: string, method: string, data?: any) {
    try {
      const resp = await this.client[method](url, data);
      return resp.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }

      console.error("Something went wrong...", error.message);
    }
  }

  async get(url: string) {
    return this.call(url, "get");
  }

  async post(url: string, data) {
    return this.call(url, "post", data);
  }

  async update(url: string, data?: any) {
    return this.call(url, "patch", data);
  }

  async delete(url: string) {
    return this.call(url, "delete");
  }

  setAuthorizationToken(token: string) {
    //@ts-ignore
    this.client.setAuthorizationToken(token);
  }

  // This should be done on back-end
  paginateQuery(config: { pageSize?: 20; current?: 1 }) {
    const { pageSize = 20, current = 1 } = config;
    const skipSize = (current - 1) * pageSize;

    return `skip=${skipSize}&limit=${pageSize}`;
  }

  // This should be done on back-end
  paginateObj(config: { pageSize: number; current: number }) {
    const { pageSize = 20, current = 1 } = config;
    const skipSize = (current - 1) * pageSize;

    return { skip: skipSize, limit: config.pageSize, current, pageSize };
  }
}

console.log("API_BASE_URL => ", API_BASE_URL_V2);

export const client = Axios.create({
  baseURL: API_BASE_URL,
});
export const clientV2 = Axios.create({
  baseURL: API_BASE_URL_V2,
});

function setAuthorizationToken(this: AxiosInstance, token: string) {
  const defaultHeaders = this.defaults.headers.common || {};

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  } else {
    delete defaultHeaders.Authorization;
  }

  return defaultHeaders;
}

export const axios = Object.assign(client, {
  setAuthorizationToken,
});
export const axiosV2 = Object.assign(clientV2, {
  setAuthorizationToken,
});

export const api = new Api(axios);
export const apiV2 = new Api(axiosV2);

// CRINGE
export type AsyncResponse<T> = Promise<T>;
// CRINGE
export type ResponseDataWithCount<T> = [T[], number];
