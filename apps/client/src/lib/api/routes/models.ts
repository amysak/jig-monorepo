import { Model } from "type-defs";
import { client } from "../http";

export const getById = (modelId: number): Promise<Model> => {
  return client.get(`/models/${modelId}`);
};

export const getAll = (): Promise<Model[]> => {
  return client.get(`/models`);
};

export const deleteById = (modelId: string | number) => {
  return client.delete(`/models/${modelId}`);
};
