import { LinearInchPrice } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetAllLinearInchPriceData = ResponseDataWithCount<LinearInchPrice>;

async function getAllLinearInchPrice(): AsyncResponse<TGetAllLinearInchPriceData> {
  return await api.get("/linearinchprices");
}

async function updateOneLinearInchPrice(
  id: string,
  payload: any
): AsyncResponse<LinearInchPrice> {
  return await api.update(`/linearinchprices/${id}`, payload);
}

async function createOneLinearInchPrice(
  payload?: any
): AsyncResponse<LinearInchPrice> {
  return await api.post("/linearinchprices", payload);
}

async function deleteOneLinearInchPrice(id: string): AsyncResponse<any> {
  return await api.delete(`/linearinchprices/${id}`);
}

export {
  getAllLinearInchPrice,
  updateOneLinearInchPrice,
  createOneLinearInchPrice,
  deleteOneLinearInchPrice,
};
