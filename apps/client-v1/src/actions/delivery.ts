import { Delivery } from "entities";
import { ActionTypes } from "./types";

const createDeliveryRequest = (payload: any) => ({
  type: ActionTypes.CREATE_DELIVERY_REQUEST,
  payload,
});

const createDeliverySuccess = (delivery: Delivery) => ({
  type: ActionTypes.CREATE_DELIVERY_SUCCESS,
  delivery,
});

const createDeliveryFailure = (error: Error) => ({
  type: ActionTypes.CREATE_DELIVERY_FAILURE,
  error,
});

const updateDeliveryRequest = (deliveryId: string, payload: any) => ({
  type: ActionTypes.UPDATE_DELIVERY_REQUEST,
  deliveryId,
  payload,
});

const updateDeliverySuccess = (delivery: any) => ({
  type: ActionTypes.UPDATE_DELIVERY_SUCCESS,
  delivery,
});

const updateDeliveryFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_DELIVERY_FAILURE,
  error,
});

const getOneDeliveryRequest = (entity: string, entityId: string) => ({
  type: ActionTypes.GET_ONE_DELIVERY_REQUEST,
  entity,
  entityId,
});

const getOneDeliverySuccess = (delivery: Delivery) => ({
  type: ActionTypes.GET_ONE_DELIVERY_SUCCESS,
  delivery,
});

const getOneDeliveryFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_DELIVERY_FAILURE,
  error,
});

export {
  createDeliveryRequest,
  createDeliverySuccess,
  createDeliveryFailure,
  updateDeliveryRequest,
  updateDeliverySuccess,
  updateDeliveryFailure,
  getOneDeliveryRequest,
  getOneDeliverySuccess,
  getOneDeliveryFailure,
};
