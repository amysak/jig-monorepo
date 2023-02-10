import { Profile, WithCountDto } from "type-defs";
import { client } from "../http";

export const getById = (profileId: number): Promise<Profile> => {
  return client.get(`/profiles/${profileId}`);
};

export const getAll = (
  query?: Record<string, unknown>
): Promise<WithCountDto<Profile>> => {
  return client.get(`/profiles?${client.getQueryString(query)}`);
};

export const deleteById = (openingId: string | number) => {
  return client.delete(`/profiles/${openingId}`);
};
