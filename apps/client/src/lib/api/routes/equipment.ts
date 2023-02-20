import { Equipment, WithCountDto } from "type-defs";
import { client } from "../http";

export const getById = (equipmentId: number): Promise<Equipment> => {
  return client.get(`/equipment/${equipmentId}`);
};

export const getAll = (
  query?: Record<string, unknown>
): Promise<WithCountDto<Equipment>> => {
  return client.get(`/equipment?${client.getQueryString(query)}`);
};

export const deleteById = (equipmentId: string | number) => {
  return client.delete(`/equipment/${equipmentId}`);
};
