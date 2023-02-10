import { ApiGetResult, HardwareSet } from "type-defs";
import { client } from "../http";

// export const getById = (cabinetId: string): Promise<Cabinet> => {
//   return client.get(`/cabinets/${cabinetId}`);
// };

export const getAll = (
  query?: Record<string, unknown>
): Promise<ApiGetResult<HardwareSet>> => {
  return client.get(`/hardware-sets?${client.getQueryString(query)}`);
};

export const deleteById = (setId: string | number) => {
  return client.delete(`/hardware-sets/${setId}`);
};
