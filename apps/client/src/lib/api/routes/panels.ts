import { LocationGenerics } from "router";
import { ApiGetResult, Panel } from "type-defs";
import { client } from "../http";

// export const getById = (cabinetId: string): Promise<Cabinet> => {
//   return client.get(`/cabinets/${cabinetId}`);
// };

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<ApiGetResult<Panel>> => {
  return client.get(`/panels?${client.getQueryString(query)}`);
};

export const deleteById = (toeId: string | number) => {
  return client.delete(`/panels/${toeId}`);
};
