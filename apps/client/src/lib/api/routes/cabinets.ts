import { LocationGenerics } from "router";
import { Cabinet, WithCountDto } from "type-defs";
import { client } from "../http";

export const getById = (cabinetId: string): Promise<Cabinet> => {
  return client.get(`/cabinets/${cabinetId}`);
};

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<WithCountDto<Cabinet>> => {
  return client.get(`/cabinets?${client.getQueryString(query)}`);
};

export const create = (payload: { name: string }): Promise<Cabinet> => {
  return client.post("/cabinets", payload);
};

export const updateById = (
  id: string | number,
  payload: Partial<Cabinet>
): Promise<Cabinet> => {
  return client.update(`/cabinets/${id}`, payload);
};

export const deleteById = (clientId: string | number): Promise<any> => {
  return client.delete(`/cabinets/${clientId}`);
};

// function getCabinetByRoom(
//   roomId: string,
//   query = ""
// ): Promise<TGetCabinetByEntityData> {
//   return client.get(`/cabinets/rooms/${roomId}${query}`);
// }

// function getCabinetSpecification(
//   spcificationId: string
// ): Promise<CabinetSpecification> {
//   return client.get(`/cabinetspecifications/${spcificationId}`);
// }

// function getSpecificationByCabinet(
//   cabinetId: string
// ): Promise<CabinetSpecification> {
//   return client.get(`/cabinetspecifications/cabinets/${cabinetId}`);
// }

// function getDefaultCabinetSpecification(): Promise<CabinetSpecification> {
//   return client.get(`/cabinetspecifications/`);
// }

// function updateCabinetSpecification(
//   id: string,
//   payload: undefined
// ): Promise<CabinetSpecification> {
//   return client.update(`/cabinetspecifications/${id}`, payload);
// }

// function createCabinetSpecification(
//   payload: unknown
// ): Promise<CabinetSpecification> {
//   return client.post("/cabinetspecifications", payload);
// }

// function duplicateCabinetSetup(payload: {
//   cabinetId: string;
// }): Promise<Cabinet> {
//   return client.post(`/cabinets/duplicate`, payload);
// }

// function deleteCabinetSetup(id: string): Promise<any> {
//   return client.delete(`/cabinets/${id}`);
// }

// async function uploadCabinetImage(payload: FormData): Promise<any> {
//   return client.post("/cabinets/upload", payload);
// }

export // getDefaultCabinetSpecification,
 {};
