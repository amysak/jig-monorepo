import { Delivery } from "entities";
import { api, AsyncResponse } from "./Api";

function createDelivery(payload: [job: string]): AsyncResponse<Delivery> {
  return api.post("/deliveries", payload);
}

function updateDelivery(
  deliveryId: string,
  payload: any
): AsyncResponse<Delivery> {
  return api.update(`/deliveries/${deliveryId}`, payload);
}

function getDeliveryByEntity(
  entity: string,
  entityId: string
): AsyncResponse<Delivery> {
  return api.get(`/deliveries/${entity}/${entityId}`);
}

export { createDelivery, updateDelivery, getDeliveryByEntity };
