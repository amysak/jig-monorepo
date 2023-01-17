import { call, put, takeLatest } from "typed-redux-saga";

import { ActionTypes } from "../../actions/types";
import * as clientSvc from "../../api/clients";
import { serializeResponse } from "../../utilities/utils";

import {
  createClientFailure,
  createClientSuccess,
  getClientsFailure,
  getClientsSuccess,
  getOneClientFailure,
  getOneClientSuccess,
  updateClientFailure,
  updateClientSuccess,
} from "../../actions/clients";
import {
  sendNotificationFailure,
  sendNotificationRequest,
} from "../../actions/notification";

function* getClientsWorker(action: { query: string }) {
  try {
    const { clients } = yield* call(clientSvc.getClients, action.query);

    yield* put(getClientsSuccess(serializeResponse(clients)));
  } catch (error) {
    yield* put(getClientsFailure(error));
  }
}

function* getClientsWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.GET_CLIENTS_REQUEST, getClientsWorker);
}

function* getOneClientWorker(action: { clientId: any }) {
  try {
    const client = yield* call(clientSvc.getClient, action.clientId);

    yield* put(getOneClientSuccess(client));
  } catch (error) {
    yield* put(getOneClientFailure(error));
  }
}

function* getOneClientWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.GET_ONE_CLIENT_REQUEST, getOneClientWorker);
}

function* updateClientWorker(action: { clientId: any; payload: any }) {
  try {
    yield* call(clientSvc.updateClient, action.clientId, action.payload);
    yield* put(updateClientSuccess(action.payload));
    yield* put(
      sendNotificationRequest({
        type: "success",
        message: "Updated client.",
      })
    );
  } catch (error) {
    yield* put(updateClientFailure(error));
  }
}

function* updateClientWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.UPDATE_CLIENT_REQUEST, updateClientWorker);
}

function* createClientWorker(action: { payload: any }) {
  try {
    const client = yield* call(clientSvc.createClient, action.payload);

    yield* put(createClientSuccess(client));
    yield* put(
      sendNotificationRequest({
        type: "success",
        message: "New Client created.",
      })
    );
  } catch (error) {
    yield* put(createClientFailure(error));
    yield* put(
      // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
      sendNotificationFailure({
        type: "error",
        message: "Failed to create Client.",
      })
    );
  }
}

function* createClientWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.CREATE_CLIENT_REQUEST, createClientWorker);
}

export {
  getClientsWatcher,
  getOneClientWatcher,
  updateClientWatcher,
  createClientWatcher,
};
