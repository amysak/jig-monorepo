import { call, put, takeEvery, takeLatest } from "typed-redux-saga";

import { ActionTypes } from "../../actions/types";
import * as roomSvc from "../../api/rooms";
import { serializeResponse } from "../../utilities/utils";

import { createClientJobFailure } from "../../actions/jobs";
import { sendNotificationRequest } from "../../actions/notification";
import {
  createRoomSuccess,
  getJobRoomsFailure,
  getJobRoomsSuccess,
  getOneRoomFailure,
  getOneRoomSuccess,
  getRoomsFailure,
  getRoomsSuccess,
  updateRoomFailure,
} from "../../actions/rooms";

function* getRoomsWorker(action: { query: string }) {
  try {
    const { rooms } = yield* call(roomSvc.getRooms, action.query);

    yield* put(getRoomsSuccess(serializeResponse(rooms)));
  } catch (error) {
    yield* put(getRoomsFailure(error));
  }
}

function* getRoomsWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.GET_ROOMS_REQUEST, getRoomsWorker);
}

function* getOneRoomWorker(action: { roomId: any }) {
  try {
    const room = yield* call(roomSvc.getRoom, action.roomId);

    yield* put(getOneRoomSuccess(room));
  } catch (error) {
    yield* put(getOneRoomFailure(error));
  }
}

function* getOneRoomWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.GET_ONE_ROOM_REQUEST, getOneRoomWorker);
}

function* getJobRoomsWorker(action: { jobId: any }) {
  try {
    const rooms = yield* call(roomSvc.getRoomsByJobId, action.jobId);

    yield* put(getJobRoomsSuccess(serializeResponse(rooms)));
  } catch (error) {
    yield* put(getJobRoomsFailure(error));
  }
}

function* getJobRoomsWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.GET_JOB_ROOMS_REQUEST, getJobRoomsWorker);
}

function* createRoomWorker(action: { payload: any }) {
  try {
    const room = yield* call(roomSvc.createRoom, action.payload);

    yield* put(createRoomSuccess(room));
    yield* put(
      sendNotificationRequest({
        message: "Successfully created Room.",
        type: "success",
      })
    );
  } catch (error) {
    yield* put(createClientJobFailure(error));
    yield* put(
      sendNotificationRequest({
        message: "Failed to create Room.",
        type: "error",
      })
    );
  }
}

function* createRoomWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeEvery(ActionTypes.CREATE_ROOM_REQUEST, createRoomWorker);
}

function* updateRoomWorker(action: { roomId: any; payload: any }) {
  try {
    yield* call(roomSvc.updateRoom, action.roomId, action.payload);
    yield* put(
      sendNotificationRequest({
        message: "Updates Room successfully.",
        type: "success",
      })
    );
  } catch (error) {
    yield* put(
      sendNotificationRequest({
        message: "Updates Room failed.",
        type: "error",
      })
    );
    yield* put(updateRoomFailure(error));
  }
}

function* updateRoomWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeEvery(ActionTypes.UPDATE_ROOM_REQUEST, updateRoomWorker);
}

export {
  getRoomsWatcher,
  getOneRoomWatcher,
  getJobRoomsWatcher,
  createRoomWatcher,
  updateRoomWatcher,
};
