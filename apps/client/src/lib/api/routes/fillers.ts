import { LocationGenerics } from "router";
import { ApiGetResult, Filler } from "type-defs";
import { client } from "../http";

// export const getById = (cabinetId: string): Promise<Cabinet> => {
//   return client.get(`/cabinets/${cabinetId}`);
// };

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<ApiGetResult<Filler>> => {
  return client.get(`/fillers?${client.getQueryString(query)}`);
};

export const deleteById = (fillerId: string | number) => {
  return client.delete(`/fillers/${fillerId}`);
};
