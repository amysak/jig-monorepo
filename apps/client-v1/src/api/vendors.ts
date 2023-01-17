import { Vendor } from "entities";
import { api, AsyncResponse, ResponseDataWithCount } from "./Api";

function updateVendor(
  id: string,
  payload: { [x: number]: any }
): AsyncResponse<Vendor> {
  //@ts-ignore
  return api.update(`/vendors/${id}`, payload);
}

export type TGetVendorsData = ResponseDataWithCount<Vendor>;

function getVendors(query = ""): AsyncResponse<TGetVendorsData> {
  return api.get(`/vendors${query}`);
}

function createVendor(payload: any): AsyncResponse<Vendor> {
  return api.post(`/vendors`, payload);
}

function deleteVendor(vendorId: string): AsyncResponse<any> {
  return api.delete(`/vendors/${vendorId}`);
}

export { updateVendor, getVendors, createVendor, deleteVendor };
