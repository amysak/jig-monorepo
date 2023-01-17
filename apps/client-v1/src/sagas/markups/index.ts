import { call, put, takeEvery, takeLatest } from "typed-redux-saga";
import {
  createMarkupFailure,
  createMarkupSuccess,
  getDefaultMarkupsFailure,
  getDefaultMarkupsSuccess,
  getOneMarkupByIdFailure,
  getOneMarkupByIdSuccess,
  getOneMarkupFailure,
  getOneMarkupSuccess,
  updateMarkupFailure,
  updateMarkupSuccess,
} from "../../actions/markups";
import { sendNotificationRequest } from "../../actions/notification";
import { ActionTypes } from "../../actions/types";
import * as markupSvc from "../../api/markups";
import { serializeResponse } from "../../utilities/utils";

function* createMarkupWorker(action: { payload: { id: any } }) {
  try {
    //@ts-ignore
    const markup = yield* call(markupSvc.createMarkup, action.payload);

    if (!action.payload.id) yield* put(createMarkupSuccess(markup as any));

    yield* put(
      sendNotificationRequest({
        message: "Updates Markup.",
        type: "success",
      })
    );
  } catch (error) {
    yield* put(
      sendNotificationRequest({
        message: "Failed to update Markup.",
        type: "error",
      })
    );
    yield* put(createMarkupFailure(error));
  }
}

function* createMarkupWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeEvery(ActionTypes.CREATE_MARKUP_REQUEST, createMarkupWorker);
}

function* getOneMarkupWorker(action: { entity: any; entityId: any }) {
  try {
    const markup = yield* call(
      markupSvc.getMarkup,
      action.entity,
      action.entityId
    );
    yield* put(getOneMarkupSuccess(markup));
  } catch (error) {
    yield* put(getOneMarkupFailure(error));
  }
}

function* getOneMarkupWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeEvery(ActionTypes.GET_ONE_MARKUP_REQUEST, getOneMarkupWorker);
}

function* getDefaultMarkupsWorker(action: { query: string }) {
  try {
    const markups = yield* call(markupSvc.getDefaultMarkups, action.query);

    yield* put(getDefaultMarkupsSuccess(serializeResponse(markups)));
  } catch (error) {
    yield* put(getDefaultMarkupsFailure(error));
  }
}

function* getDefaultMarkupsWatcher() {
  yield* takeEvery(
    // @ts-expect-error TS(2769): No overload matches this call.
    ActionTypes.GET_DEFAULT_MARKUPS_REQUEST,
    getDefaultMarkupsWorker
  );
}

function* getOneMarkupByIdWorker(action: { id: any }) {
  try {
    const markup = yield* call(markupSvc.getMarkupById, action.id);

    yield* put(getOneMarkupByIdSuccess(markup));
  } catch (error) {
    yield* put(getOneMarkupByIdFailure(error));
  }
}

function* getOneMarkupByIdWatcher() {
  yield* takeLatest(
    // @ts-expect-error TS(2769): No overload matches this call.
    ActionTypes.GET_ONE_MARKUP_BY_ID_REQUEST,
    getOneMarkupByIdWorker
  );
}

function* updateMarkupRequest(action: { id: any; payload: any }) {
  try {
    yield* call(markupSvc.updateMarkup, action.id, action.payload);

    yield* put(updateMarkupSuccess(action.payload));
    yield* put(
      sendNotificationRequest({
        type: "success",
        message: "Successfully updates Markup.",
      })
    );
  } catch (error) {
    yield* put(updateMarkupFailure(error));
    yield* put(
      sendNotificationRequest({
        type: "error",
        message: "Failed to updates Markup.",
      })
    );
  }
}

function* updateMarkupWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.UPDATE_MARKUP_REQUEST, updateMarkupRequest);
}

export {
  getOneMarkupWatcher,
  createMarkupWatcher,
  getDefaultMarkupsWatcher,
  getOneMarkupByIdWatcher,
  updateMarkupWatcher,
};
