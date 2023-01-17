import { ActionTypes } from "./types";

import { Tax } from "entities";

const getOneTaxRequest = (entity: string, entityId: string) => ({
  type: ActionTypes.GET_ONE_TAX_REQUEST,
  entity,
  entityId,
});

const getOneTaxSuccess = (tax: Tax) => ({
  type: ActionTypes.GET_ONE_TAX_SUCCESS,
  tax,
});

const getOneTaxFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_TAX_FAILURE,
  error,
});

const createTaxRequest = (payload: Tax) => ({
  type: ActionTypes.CREATE_TAX_REQUEST,
  payload,
});

const createTaxSuccess = (tax: Tax) => ({
  type: ActionTypes.CREATE_TAX_SUCCESS,
  tax,
});

const createTaxFailure = (error: Error) => ({
  type: ActionTypes.CREATE_TAX_FAILURE,
  error,
});

const updateTaxRequest = (taxId: string, payload: Partial<Tax>) => ({
  type: ActionTypes.UPDATE_TAX_REQUEST,
  taxId,
  payload,
});

const updateTaxSuccess = (tax: Tax) => ({
  type: ActionTypes.UPDATE_TAX_SUCCESS,
  tax,
});

const updateTaxFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_TAX_FAILURE,
  error,
});

export {
  getOneTaxRequest,
  getOneTaxSuccess,
  getOneTaxFailure,
  createTaxRequest,
  createTaxSuccess,
  createTaxFailure,
  updateTaxRequest,
  updateTaxSuccess,
  updateTaxFailure,
};
