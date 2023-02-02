import { LocationGenerics } from "router";
import { CabinetOpening, WithCountDto } from "type-defs";
import { client } from "../http";

// export const getById = (cabinetId: string): Promise<Cabinet> => {
//   return client.get(`/cabinets/${cabinetId}`);
// };

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<WithCountDto<CabinetOpening>> => {
  return client.get(`/openings?${client.getQueryString(query)}`);
};

export const deleteById = (openingId: string | number) => {
  return client.delete(`/openings/${openingId}`);
};
