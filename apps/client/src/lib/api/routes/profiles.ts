import { LocationGenerics } from "router";
import { Profile, WithCountDto } from "type-defs";
import { client } from "../http";

// export const getById = (cabinetId: string): Promise<Cabinet> => {
//   return client.get(`/cabinets/${cabinetId}`);
// };

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<WithCountDto<Profile>> => {
  return client.get(`/profiles?${client.getQueryString(query)}`);
};

export const deleteById = (openingId: string | number) => {
  return client.delete(`/profiles/${openingId}`);
};
