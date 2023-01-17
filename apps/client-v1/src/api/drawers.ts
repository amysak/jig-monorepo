import { DrawerPart } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetCabinetDrawersPartsData = ResponseDataWithCount<DrawerPart>;

async function getCabinetDrawersParts(
  id: string
): AsyncResponse<TGetCabinetDrawersPartsData> {
  return api.get(`/drawers/cabinets/${id}`);
}

async function createCabinetDrawersParts(
  payload: any
): AsyncResponse<DrawerPart> {
  return api.post(`/drawers/parts`, payload);
}

export { getCabinetDrawersParts, createCabinetDrawersParts };
