import { Client, Pagination, WithCountDto } from "type-defs";

import { client } from "../http";

export const getById = (clientId: string): Promise<Client> => {
  return client.get(`/clients/${clientId}`);
};

export const getAll = (
  query?: Record<string, unknown>
): Promise<WithCountDto<Client>> => {
  return client.get(`/clients?${client.getQueryString(query)}`);
};

export const create = (payload: { name: string }): Promise<Client> => {
  return client.post("/clients", payload);
};

export const updateById = (
  id: string | number,
  payload: Partial<Client>
): Promise<Client> => {
  return client.update(`/clients/${id}`, payload);
};

export const deleteById = (clientId: string | number): Promise<any> => {
  return client.delete(`/clients/${clientId}`);
};
