import { Finish, WithCountDto } from "type-defs";
import { client } from "../http";

export const getById = (finishId: number): Promise<Finish> => {
  return client.get(`/finishes/${finishId}`);
};

export const getAll = (
  query?: Record<string, unknown>
): Promise<WithCountDto<Finish>> => {
  return client.get(`/finishes?${client.getQueryString(query)}`);
};

// re-exported in barrel at api/
export type GrouppedFinishes = {
  count: number;
  colors: Omit<Finish, "price" | "discount">[];
  processes: Finish[];
};

export const getGroupped = (
  query?: Record<string, unknown>
): Promise<GrouppedFinishes> => {
  return client.get(
    `/finishes?${client.getQueryString({ ...query, group: true })}`
  );
};

// export const create = (payload: { name: string }): Promise<Material> => {
//   return client.post("/finishes", payload);
// };

export const updateById = (
  id: string | number,
  payload: Partial<Finish>
): Promise<Finish> => {
  return client.update(`/finishes/${id}`, payload);
};

export const deleteById = (finishId: string | number): Promise<any> => {
  return client.delete(`/finishes/${finishId}`);
};
