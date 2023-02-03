import { LocationGenerics } from "router";
import { ApiGetResult, ToePlatform } from "type-defs";
import { client } from "../http";

// export const getById = (cabinetId: string): Promise<Cabinet> => {
//   return client.get(`/cabinets/${cabinetId}`);
// };

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<ApiGetResult<ToePlatform>> => {
  return client.get(`/toes?${client.getQueryString(query)}`);
};

export const deleteById = (toeId: string | number) => {
  return client.delete(`/toes/${toeId}`);
};
