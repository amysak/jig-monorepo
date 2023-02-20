import { Cabinet, DeepPartial, WithCountDto } from "type-defs";
import { client } from "../http";

export const getById = (cabinetId: number): Promise<Cabinet> => {
  return client.get(`/cabinets/${cabinetId}`);
};

export const getAll = (
  query?: Record<string, unknown>
): Promise<WithCountDto<Cabinet>> => {
  return client.get(`/cabinets?${client.getQueryString(query)}`);
};

export const create = (payload: { name: string }): Promise<Cabinet> => {
  return client.post("/cabinets", payload);
};

export const updateById = (
  id: number,
  payload: DeepPartial<Cabinet>
): Promise<Cabinet> => {
  return client.update(`/cabinets/${id}`, payload);
};

export const deleteById = (clientId: number): Promise<any> => {
  return client.delete(`/cabinets/${clientId}`);
};
