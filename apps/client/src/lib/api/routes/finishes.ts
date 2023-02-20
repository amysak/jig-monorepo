import { FinishProcess, Paint, WithCountDto } from "type-defs";
import { client } from "../http";

export const getById = (finishId: number): Promise<FinishProcess> => {
  return client.get(`/finishes/${finishId}`);
};

export const getAll = (
  query?: Record<string, unknown>
): Promise<WithCountDto<FinishProcess>> => {
  return client.get(`/finishes?${client.getQueryString(query)}`);
};

export const getPaints = (
  query?: Record<string, unknown>
): Promise<WithCountDto<Paint>> => {
  return client.get(`/paints?${client.getQueryString(query)}`);
};

// re-exported in barrel at api/
export type GrouppedFinishes = {
  processes: FinishProcess[];
  paints: Paint[];
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
  payload: Partial<FinishProcess>
): Promise<FinishProcess> => {
  return client.update(`/finishes/${id}`, payload);
};

export const deleteById = (finishId: string | number): Promise<any> => {
  return client.delete(`/finishes/${finishId}`);
};
