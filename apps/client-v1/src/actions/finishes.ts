import { Finishes } from "entities";
import { ISerializedResponse } from "utilities/utils";
import { ActionTypes } from "./types";

const getSetupFinishesRequest = (query: string, key: string) => ({
  type: ActionTypes.GET_SETUP_FINISHES_REQUEST,
  query,
  key,
});

const getSetupFinishesSuccess = (
  finishes: ISerializedResponse<Finishes>,
  key: string
) => ({
  type: ActionTypes.GET_SETUP_FINISHES_SUCCESS,
  finishes,
  key,
});

const getSetupFinishesFailure = (error: Error) => ({
  type: ActionTypes.GET_SETUP_FINISHES_FAILURE,
  error,
});

const updateSetupFinishesRequest = (id: string, payload: any) => ({
  type: ActionTypes.UPDATE_SETUP_FINISHES_REQUEST,
  id,
  payload,
});

const updateSetupFinishesSuccess = (id: string, partial: any) => ({
  type: ActionTypes.UPDATE_SETUP_FINISHES_SUCCESS,
  partial,
  id,
});

const updateSetupFinishesFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_SETUP_FINISHES_FAILURE,
  error,
});

export {
  getSetupFinishesRequest,
  getSetupFinishesSuccess,
  getSetupFinishesFailure,
  updateSetupFinishesRequest,
  updateSetupFinishesSuccess,
  updateSetupFinishesFailure,
};
