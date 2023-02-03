import { LocationGenerics } from "router";
import { Material, WithCountDto } from "type-defs";
import { client } from "../http";

export const getById = (materialId: string): Promise<Material> => {
  return client.get(`/materials/${materialId}`);
};

export const getAll = (
  query?: LocationGenerics["Search"]
): Promise<WithCountDto<Material>> => {
  return client.get(`/materials?${client.getQueryString(query)}`);
};

export const getTypes = (): Promise<string[]> => {
  return client.get("/materials/types");
};

// export const create = (payload: { name: string }): Promise<Material> => {
//   return client.post("/materials", payload);
// };

export const updateById = (
  id: string | number,
  payload: Partial<Material>
): Promise<Material> => {
  return client.update(`/materials/${id}`, payload);
};

export const deleteById = (materialId: string | number): Promise<any> => {
  return client.delete(`/materials/${materialId}`);
};
