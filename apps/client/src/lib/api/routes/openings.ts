import { CabinetOpening, WithCountDto } from "type-defs";
import { client } from "../http";

export const getById = (openingId: number): Promise<CabinetOpening> => {
  return client.get(`/openings/${openingId}`);
};

export const getAll = (
  query?: Record<string, unknown>
): Promise<WithCountDto<CabinetOpening>> => {
  return client.get(`/openings?${client.getQueryString(query)}`);
};

export const getModels = (): Promise<string[]> => {
  return client.get("/openings/models");
};

export const deleteById = (openingId: string | number) => {
  return client.delete(`/openings/${openingId}`);
};
