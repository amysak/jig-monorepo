import { LaborRate } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

export type TGetDefaultLaborRatesData = ResponseDataWithCount<LaborRate>;

async function getDefaultLaborRates(
  query = ""
): AsyncResponse<TGetDefaultLaborRatesData> {
  return api.get(`/defaultsetup/labor-rates${query}`);
}

async function getLaborRate(id: string): AsyncResponse<LaborRate> {
  return api.get(`/laborrates/${id}`);
}

async function updateLaborRate(
  id: string | number,
  payload: undefined
): AsyncResponse<LaborRate> {
  return api.update(`/laborrates/${id}`, payload);
}

async function createLaborRate(payload: any): AsyncResponse<LaborRate[]> {
  return api.post("/laborrates", payload);
}

async function getLaborRateTypes(): AsyncResponse<any> {
  return api.get("/laborrates/types");
}

export {
  getDefaultLaborRates,
  getLaborRate,
  updateLaborRate,
  createLaborRate,
  getLaborRateTypes,
};
