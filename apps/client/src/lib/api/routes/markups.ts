import { ApiGetResult, Markup } from "type-defs";
import { client } from "../http";

// export const getById = (cabinetId: string): Promise<Cabinet> => {
//   return client.get(`/cabinets/${cabinetId}`);
// };

export const getAll = (
  query?: Record<string, unknown>
): Promise<ApiGetResult<Markup>> => {
  return client.get(`/markups?${client.getQueryString(query)}`);
};

export const deleteById = (fillerId: string | number) => {
  return client.delete(`/markups/${fillerId}`);
};
