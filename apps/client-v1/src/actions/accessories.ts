import { ActionTypes } from "./types";

const getAccessoriesRequest = () => ({
  type: ActionTypes.GET_ACCESSORIES_REQUEST,
});

const getAccessoriesSuccess = (accessories: { data: any; total: any }) => ({
  type: ActionTypes.GET_ACCESSORIES_SUCCESS,
  accessories,
});

const getAccessoriesFailure = (error: any) => ({
  type: ActionTypes.GET_ACCESSORIES_FAILURE,
  error,
});

const getDefaultAccessoriesRequest = (query: any, key: any) => ({
  type: ActionTypes.GET_DEFAULT_ACCESSORIES_REQUEST,
  query,
  key,
});

const getDefaultAccessoriesSuccess = (accessories: {
  data: any;
  total: any;
}) => ({
  type: ActionTypes.GET_DEFAULT_ACCESSORIES_SUCCESS,
  accessories,
});

const getDefaultAccessoriesFailure = (error: any) => ({
  type: ActionTypes.GET_DEFAULT_ACCESSORIES_FAILURE,
  error,
});

const getRoomAccessoriesRequest = (roomId: any, query: any) => ({
  type: ActionTypes.GET_ROOM_ACCESSORIES_REQUEST,
  roomId,
  query,
});

const getRoomAccessoriesSuccess = (accessories: { data: any; total: any }) => ({
  type: ActionTypes.GET_ROOM_ACCESSORIES_SUCCESS,
  accessories,
});

const getRoomAccessoriesFailure = (error: any) => ({
  type: ActionTypes.GET_ROOM_ACCESSORIES_FAILURE,
  error,
});

const createRoomAccessoryRequest = (payload: any) => ({
  type: ActionTypes.CREATE_ROOM_ACCESSORY_REQUEST,
  payload,
});

const createRoomAccessorySuccess = (accessory: any) => ({
  type: ActionTypes.CREATE_ROOM_ACCESSORY_SUCCESS,
  accessory,
});

const createRoomAccessoryFailure = (error: any) => ({
  type: ActionTypes.CREATE_ROOM_ACCESSORY_FAILURE,
  error,
});

export {
  getAccessoriesRequest,
  getAccessoriesSuccess,
  getAccessoriesFailure,
  getRoomAccessoriesRequest,
  getRoomAccessoriesSuccess,
  getRoomAccessoriesFailure,
  getDefaultAccessoriesRequest,
  getDefaultAccessoriesSuccess,
  getDefaultAccessoriesFailure,
  createRoomAccessoryRequest,
  createRoomAccessorySuccess,
  createRoomAccessoryFailure,
};
