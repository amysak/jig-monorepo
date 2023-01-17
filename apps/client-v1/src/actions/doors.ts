import { Door } from "entities";
import { ISerializedResponse } from "utilities/utils";
import { ActionTypes } from "./types";

const getDoorsRequest = (query: string, key: string) => ({
  type: ActionTypes.GET_DOORS_REQUEST,
  query,
  key,
});

const getDoorsSuccess = (doors: ISerializedResponse<Door>, key: string) => ({
  type: ActionTypes.GET_DOORS_SUCCESS,
  doors,
  key,
});

const getDoorsFailure = (error: Error) => ({
  type: ActionTypes.GET_DOORS_FAILURE,
  error,
});

const getDoorProfilesRequest = (query: string) => ({
  type: ActionTypes.GET_DOOR_PROFILES_REQUEST,
  query,
});

const getDoorProfilesSuccess = (profiles: ISerializedResponse<Door>) => ({
  type: ActionTypes.GET_DOOR_PROFILES_SUCCESS,
  profiles,
});

const getDoorProfilesFailure = (error: Error) => ({
  type: ActionTypes.GET_DOOR_PROFILES_FAILURE,
  error,
});

export {
  getDoorsRequest,
  getDoorsSuccess,
  getDoorsFailure,
  getDoorProfilesRequest,
  getDoorProfilesSuccess,
  getDoorProfilesFailure,
};
