import { ActionTypes } from "./types";

import { Accessory, Account, Room } from "entities";
import { ISerializedResponse } from "utilities/utils";

const getRoomsRequest = (query: string) => ({
  type: ActionTypes.GET_ROOMS_REQUEST,
  query,
});

const getRoomsSuccess = (rooms: ISerializedResponse<Room>) => ({
  type: ActionTypes.GET_ROOMS_SUCCESS,
  rooms,
});

const getRoomsFailure = (error: Error) => ({
  type: ActionTypes.GET_ROOMS_FAILURE,
  error,
});

const getOneRoomRequest = (roomId: string) => ({
  type: ActionTypes.GET_ONE_ROOM_REQUEST,
  roomId,
});

const getOneRoomSuccess = (room: Room) => ({
  type: ActionTypes.GET_ONE_ROOM_SUCCESS,
  room,
});

const getOneRoomFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_ROOM_FAILURE,
  error,
});

const getJobRoomsRequest = (jobId: string) => ({
  type: ActionTypes.GET_JOB_ROOMS_REQUEST,
  jobId,
});

const getJobRoomsSuccess = (rooms: ISerializedResponse<Room>) => ({
  type: ActionTypes.GET_JOB_ROOMS_SUCCESS,
  rooms,
});

const getJobRoomsFailure = (error: Error) => ({
  type: ActionTypes.GET_JOB_ROOMS_FAILURE,
  error,
});

const createRoomRequest = (payload: Partial<Room>) => ({
  type: ActionTypes.CREATE_ROOM_REQUEST,
  payload,
});

const createRoomSuccess = (room: Room) => ({
  type: ActionTypes.CREATE_ROOM_SUCCESS,
  room,
});

const createRoomFailure = (error: Error) => ({
  type: ActionTypes.CREATE_ROOM_FAILURE,
  error,
});

const updateRoomRequest = (roomId: string, payload: Partial<Room>) => ({
  type: ActionTypes.UPDATE_ROOM_REQUEST,
  roomId,
  payload,
});

const updateRoomSuccess = (partial: {
  accessory: {
    account: Account;
    room: any;
  } & Accessory;
}) => ({
  type: ActionTypes.UPDATE_ROOM_SUCCESS,
  partial,
});

const updateRoomFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_ROOM_FAILURE,
  error,
});

export {
  getRoomsRequest,
  getRoomsSuccess,
  getRoomsFailure,
  getOneRoomRequest,
  getOneRoomSuccess,
  getOneRoomFailure,
  getJobRoomsRequest,
  getJobRoomsSuccess,
  getJobRoomsFailure,
  createRoomRequest,
  createRoomSuccess,
  createRoomFailure,
  updateRoomRequest,
  updateRoomSuccess,
  updateRoomFailure,
};
