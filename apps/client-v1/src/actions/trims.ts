import { Trim } from "entities";
import { ActionTypes } from "./types";

import { ISerializedResponse } from "utilities/utils";

// import { TENTITIES_KEYS } from '../utilities/constants'

const getTrimsRequest = (query: string) => ({
  type: ActionTypes.GET_TRIMS_REQUEST,
  query,
});

const getTrimsSuccess = (trimMoldings: ISerializedResponse<Trim>) => ({
  type: ActionTypes.GET_TRIMS_SUCCESS,
  trimMoldings,
});

const getTrimsFailure = (error: Error) => ({
  type: ActionTypes.GET_TRIMS_FAILURE,
  error,
});

const getDefaultTrimsRequest = (query: string) => ({
  type: ActionTypes.GET_DEFAULT_TRIMS_REQUEST,
  query,
});

const getDefaultTrimsSuccess = (trims: ISerializedResponse<Trim>) => ({
  type: ActionTypes.GET_DEFAULT_TRIMS_SUCCESS,
  trims,
});

const getDefaultTrimsFailure = (error: Error) => ({
  type: ActionTypes.GET_DEFAULT_TRIMS_FAILURE,
  error,
});

const getOneTrimMoldingRequest = (trimMoldingId: string) => ({
  type: ActionTypes.GET_ONE_TRIM_MOLDING_REQUEST,
  trimMoldingId,
});

const getOneTrimMoldingSuccess = (trim: Trim) => ({
  type: ActionTypes.GET_ONE_TRIM_MOLDING_SUCCESS,
  trim,
});

const getOneTrimMoldingFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_TRIM_MOLDING_FAILURE,
  error,
});

const getTrimMoldingClassificationRequest = () => ({
  type: ActionTypes.GET_TRIM_MOLDING_CLASSIFICATIONS_REQUEST,
});

const getTrimMoldingClassificationSuccess = (classifications: any) => ({
  type: ActionTypes.GET_TRIM_MOLDING_CLASSIFICATIONS_SUCCESS,
  classifications,
});

const getTrimMoldingClassificationFailure = (error: Error) => ({
  type: ActionTypes.GET_TRIM_MOLDING_CLASSIFICATIONS_FAILURE,
  error,
});

const getTrimMoldingSubclassificationRequest = () => ({
  type: ActionTypes.GET_TRIM_MOLDING_SUBCLASSIFICATIONS_REQUEST,
});

const getTrimMoldingSubclassificationSuccess = (subclassifications: any) => ({
  type: ActionTypes.GET_TRIM_MOLDING_SUBCLASSIFICATIONS_SUCCESS,
  subclassifications,
});

const getTrimMoldingSubclassificationFailure = (error: Error) => ({
  type: ActionTypes.GET_TRIM_MOLDING_SUBCLASSIFICATIONS_FAILURE,
  error,
});

const updateTrimMoldingRequest = (trimMoldingId: string, payload: any) => ({
  type: ActionTypes.UPDATE_TRIM_MOLDING_REQUEST,
  trimMoldingId,
  payload,
});

const updateTrimMoldingSuccess = (partial: Trim) => ({
  type: ActionTypes.UPDATE_TRIM_MOLDING_SUCCESS,
  partial,
});

const updateTrimMoldingFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_TRIM_MOLDING_FAILURE,
  error,
});

const createTrimMoldingRequest = (payload: string) => ({
  type: ActionTypes.CREATE_TRIM_MOLDING_REQUEST,
  payload,
});

const createTrimMoldingSuccess = (trimMolding: Trim) => ({
  type: ActionTypes.CREATE_TRIM_MOLDING_SUCCESS,
  trimMolding,
});

const createTrimMoldingFailure = (error: Error) => ({
  type: ActionTypes.CREATE_TRIM_MOLDING_FAILURE,
  error,
});

const getRoomTrimMoldingsRequest = (roomId: string, query: string) => ({
  type: ActionTypes.GET_ROOM_TRIM_MOLDINGS_REQUEST,
  roomId,
  query,
});

const getRoomTrimMoldingsSuccess = (
  trimMoldings: ISerializedResponse<Trim>
) => ({
  type: ActionTypes.GET_ROOM_TRIM_MOLDINGS_SUCCESS,
  trimMoldings,
});

const getRoomTrimMoldingsFailure = (error: Error) => ({
  type: ActionTypes.GET_ROOM_TRIM_MOLDINGS_FAILURE,
  error,
});

export {
  getTrimsRequest,
  getTrimsSuccess,
  getTrimsFailure,
  getDefaultTrimsRequest,
  getDefaultTrimsSuccess,
  getDefaultTrimsFailure,
  getOneTrimMoldingRequest,
  getOneTrimMoldingSuccess,
  getOneTrimMoldingFailure,
  getTrimMoldingClassificationRequest,
  getTrimMoldingClassificationSuccess,
  getTrimMoldingClassificationFailure,
  getTrimMoldingSubclassificationRequest,
  getTrimMoldingSubclassificationSuccess,
  getTrimMoldingSubclassificationFailure,
  updateTrimMoldingRequest,
  updateTrimMoldingSuccess,
  updateTrimMoldingFailure,
  createTrimMoldingRequest,
  createTrimMoldingSuccess,
  createTrimMoldingFailure,
  getRoomTrimMoldingsRequest,
  getRoomTrimMoldingsSuccess,
  getRoomTrimMoldingsFailure,
};
