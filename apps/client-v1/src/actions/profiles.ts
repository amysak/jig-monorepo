import { ActionTypes } from "./types";

import { Profile } from "entities";
import { ISerializedResponse } from "utilities/utils";

const getProfilePanelsRequest = () => ({
  type: ActionTypes.GET_PROFILE_PANELS_REQUEST,
});

const getProfilePanelsSuccess = (panels: ISerializedResponse<Profile>) => ({
  type: ActionTypes.GET_PROFILE_PANELS_SUCCESS,
  panels,
});

const getProfilePanelsFailure = (error: Error) => ({
  type: ActionTypes.GET_PROFILE_PANELS_FAILURE,
  error,
});

const getProfileEdgesRequest = () => ({
  type: ActionTypes.GET_PROFILE_EDGES_REQUEST,
});

const getProfileEdgesSuccess = (edges: ISerializedResponse<Profile>) => ({
  type: ActionTypes.GET_PROFILE_EDGES_SUCCESS,
  edges,
});

const getProfileEdgesFailure = (error: Error) => ({
  type: ActionTypes.GET_PROFILE_EDGES_FAILURE,
  error,
});

const getProfileFramesRequest = () => ({
  type: ActionTypes.GET_PROFILE_FRAMES_REQUEST,
});

const getProfileFramesSuccess = (frames: ISerializedResponse<Profile>) => ({
  type: ActionTypes.GET_PROFILE_FRAMES_SUCCESS,
  frames,
});

const getProfileFramesFailure = (error: Error) => ({
  type: ActionTypes.GET_PROFILE_FRAMES_FAILURE,
  error,
});

export {
  getProfilePanelsRequest,
  getProfilePanelsSuccess,
  getProfilePanelsFailure,
  getProfileEdgesRequest,
  getProfileEdgesSuccess,
  getProfileEdgesFailure,
  getProfileFramesRequest,
  getProfileFramesSuccess,
  getProfileFramesFailure,
};
