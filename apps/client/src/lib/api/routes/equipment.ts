import { LocationGenerics } from "router";
import { CabinetEquipment, WithCountDto } from "type-defs";
import { client } from "../http";

// export const getById = (cabinetId: string): Promise<Cabinet> => {
//   return client.get(`/cabinets/${cabinetId}`);
// };

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<WithCountDto<CabinetEquipment>> => {
  return client.get(`/equipment?${client.getQueryString(query)}`);
};

export const deleteById = (equipmentId: string | number) => {
  return client.delete(`/equipment/${equipmentId}`);
};
