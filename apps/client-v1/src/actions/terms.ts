import { ActionTypes } from "./types";

import { Terms } from "entities";

import { ISerializedResponse } from "utilities/utils";

import { TENTITIES_KEYS } from "../utilities/constants";

const createTermRequest = (payload: Terms) => ({
  type: ActionTypes.CREATE_TERM_REQUEST,
  payload,
});

const createTermSuccess = (term: Terms) => ({
  type: ActionTypes.CREATE_TERM_SUCCESS,
  term,
});

const createTermFailure = (error: Error) => ({
  type: ActionTypes.CREATE_TERM_FAILURE,
  error,
});

const getJustOneTermRequest = (termId: string) => ({
  type: ActionTypes.GET_JUST_ONE_TERM_REQUEST,
  termId,
});

const getOneTermRequest = (entity: TENTITIES_KEYS, entityId: string) => ({
  type: ActionTypes.GET_ONE_TERM_REQUEST,
  entity,
  entityId,
});

const getOneTermSuccess = (term: Terms) => ({
  type: ActionTypes.GET_ONE_TERM_SUCCESS,
  term,
});

const getOneTermFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_TERM_FAILURE,
  error,
});

const getDefaultTermsRequest = (query: string) => ({
  type: ActionTypes.GET_DEFAULT_TERMS_REQUEST,
  query,
});

const getDefaultTermsSuccess = (terms: ISerializedResponse<Terms>) => ({
  type: ActionTypes.GET_DEFAULT_TERMS_SUCCESS,
  terms,
});

const getDefaultTermsFailure = (error: Error) => ({
  type: ActionTypes.GET_DEFAULT_TERMS_FAILURE,
  error,
});

const updateTermRequest = (termId: string, payload: Partial<Terms>) => ({
  type: ActionTypes.UPDATE_TERM_REQUEST,
  termId,
  payload,
});

const updateTermSuccess = (partial: Terms) => ({
  type: ActionTypes.UPDATE_TERM_SUCCESS,
  partial,
});

const updateTermFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_TERM_FAILURE,
  error,
});

export {
  createTermRequest,
  createTermSuccess,
  createTermFailure,
  getJustOneTermRequest,
  getOneTermRequest,
  getOneTermSuccess,
  getOneTermFailure,
  getDefaultTermsRequest,
  getDefaultTermsSuccess,
  getDefaultTermsFailure,
  updateTermRequest,
  updateTermSuccess,
  updateTermFailure,
};
