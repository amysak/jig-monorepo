import { ActionTypes } from "./types";

import { Markup } from "entities";
import { ISerializedResponse } from "utilities/utils";

const getOneMarkupRequest = (entity: string, entityId: string) => ({
  type: ActionTypes.GET_ONE_MARKUP_REQUEST,
  entity,
  entityId,
});

const getOneMarkupSuccess = (markup: Markup) => ({
  type: ActionTypes.GET_ONE_MARKUP_SUCCESS,
  markup,
});

const getOneMarkupFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_MARKUP_FAILURE,
  error,
});

const createMarkupRequest = (payload: Partial<Markup>) => ({
  type: ActionTypes.CREATE_MARKUP_REQUEST,
  payload,
});

const createMarkupSuccess = (markup: Markup) => ({
  type: ActionTypes.CREATE_MARKUP_SUCCESS,
  markup,
});

const createMarkupFailure = (error: Error) => ({
  type: ActionTypes.CREATE_MARKUP_FAILURE,
  error,
});

const getDefaultMarkupsRequest = (query: string) => ({
  type: ActionTypes.GET_DEFAULT_MARKUPS_REQUEST,
  query,
});

const getDefaultMarkupsSuccess = (markups: ISerializedResponse<Markup>) => ({
  type: ActionTypes.GET_DEFAULT_MARKUPS_SUCCESS,
  markups,
});

const getDefaultMarkupsFailure = (error: Error) => ({
  type: ActionTypes.GET_DEFAULT_MARKUPS_FAILURE,
  error,
});

const getOneMarkupByIdRequest = (id: string) => ({
  type: ActionTypes.GET_ONE_MARKUP_BY_ID_REQUEST,
  id,
});

const getOneMarkupByIdSuccess = (markup: Markup) => ({
  type: ActionTypes.GET_ONE_MARKUP_BY_ID_SUCCESS,
  markup,
});

const getOneMarkupByIdFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_MARKUP_BY_ID_FAILURE,
  error,
});

const updateMarkupRequest = (id: string, payload: Partial<Markup>) => ({
  type: ActionTypes.UPDATE_MARKUP_REQUEST,
  id,
  payload,
});

const updateMarkupSuccess = (partial: Partial<Markup>) => ({
  type: ActionTypes.UPDATE_MARKUP_SUCCESS,
  partial,
});

const updateMarkupFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_MARKUP_FAILURE,
  error,
});

export {
  getOneMarkupRequest,
  getOneMarkupSuccess,
  getOneMarkupFailure,
  createMarkupRequest,
  createMarkupSuccess,
  createMarkupFailure,
  getDefaultMarkupsRequest,
  getDefaultMarkupsSuccess,
  getDefaultMarkupsFailure,
  getOneMarkupByIdRequest,
  getOneMarkupByIdSuccess,
  getOneMarkupByIdFailure,
  updateMarkupRequest,
  updateMarkupSuccess,
  updateMarkupFailure,
};
