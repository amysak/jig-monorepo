import { ActionTypes } from "./types";

import { Panel } from "entities";
import { ISerializedResponse } from "utilities/utils";

const getSetupPanelsRequest = (query: string) => ({
  type: ActionTypes.GET_SETUP_PANELS_REQUEST,
  query,
});

const getSetupPanelsSuccess = (panels: ISerializedResponse<Panel>) => ({
  type: ActionTypes.GET_SETUP_PANELS_SUCCESS,
  panels,
});

const getSetupPanelsFailure = (error: Error) => ({
  type: ActionTypes.GET_SETUP_PANELS_FAILURE,
  error,
});

const getRoomPanelsRequest = (roomId: string, query: string) => ({
  type: ActionTypes.GET_ROOM_PANELS_REQUEST,
  roomId,
  query,
});

const getRoomPanelsSuccess = (panels: ISerializedResponse<Panel>) => ({
  type: ActionTypes.GET_ROOM_PANELS_SUCCESS,
  panels,
});

const getRoomPanelsFailure = (error: Error) => ({
  type: ActionTypes.GET_ROOM_PANELS_FAILURE,
  error,
});

const createPanelRequest = (payload: Partial<Panel>) => ({
  type: ActionTypes.CREATE_PANEL_REQUEST,
  payload,
});

const createPanelSuccess = (panel: Panel) => ({
  type: ActionTypes.CREATE_PANEL_SUCCESS,
  panel,
});

const createPanelFailure = (error: Error) => ({
  type: ActionTypes.CREATE_PANEL_FAILURE,
  error,
});

export {
  getSetupPanelsRequest,
  getSetupPanelsSuccess,
  getSetupPanelsFailure,
  getRoomPanelsRequest,
  getRoomPanelsSuccess,
  getRoomPanelsFailure,
  createPanelRequest,
  createPanelSuccess,
  createPanelFailure,
};
