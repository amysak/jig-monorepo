import { call, put, takeEvery, takeLatest } from "typed-redux-saga";
import { sendNotificationRequest } from "../../actions/notification";
import {
  createTermFailure,
  createTermSuccess,
  getDefaultTermsFailure,
  getDefaultTermsSuccess,
  getOneTermFailure,
  getOneTermSuccess,
  updateTermFailure,
  updateTermSuccess,
} from "../../actions/terms";
import { ActionTypes } from "../../actions/types";
import * as termSvc from "../../api/terms";
import { serializeResponse } from "../../utilities/utils";

function* createTermWorker(action: { payload: any }) {
  try {
    const term = yield* call(termSvc.createTerm, action.payload);

    yield* put(createTermSuccess(term));

    yield* put(
      sendNotificationRequest({
        message: "Updated Term.",
        type: "success",
      })
    );
  } catch (error) {
    yield* put(
      sendNotificationRequest({
        message: "Failed to update Term.",
        type: "error",
      })
    );
    yield* put(createTermFailure(error));
  }
}

function* createTermWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.CREATE_TERM_REQUEST, createTermWorker);
}

function* getOneTermWorker(action: { entity: any; entityId: any }) {
  try {
    const term = yield* call(termSvc.getTerm, action.entity, action.entityId);

    yield* put(getOneTermSuccess(term as any));
  } catch (error) {
    yield* put(getOneTermFailure(error));
  }
}

function* getOneTermWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.GET_ONE_TERM_REQUEST, getOneTermWorker);
}

function* getJustOneTermWorker(action: { termId: any }) {
  try {
    const term = yield* call(termSvc.getJustOneTerm, action.termId);

    yield* put(getOneTermSuccess(term));
  } catch (error) {
    yield* put(getOneTermFailure(error));
  }
}

function* getJustOneTermWatcher() {
  yield* takeLatest(
    // @ts-expect-error TS(2769): No overload matches this call.
    ActionTypes.GET_JUST_ONE_TERM_REQUEST,
    getJustOneTermWorker
  );
}

function* getDefaultTermsWorker(action: { query: string }) {
  try {
    const { terms } = yield* call(termSvc.getDefaultTerms, action.query);

    yield* put(getDefaultTermsSuccess(serializeResponse(terms)));
  } catch (error) {
    put(getDefaultTermsFailure(error));
  }
}

function* getDefaultTermsWatcher() {
  yield* takeEvery(
    // @ts-expect-error TS(2769): No overload matches this call.
    ActionTypes.GET_DEFAULT_TERMS_REQUEST,
    getDefaultTermsWorker
  );
}

function* updateTermWorker(action: { termId: any; payload: any }) {
  try {
    // yield* call(termSvc.updateTerm, action.termId, action.payload);

    yield* put(updateTermSuccess(action.payload));
    yield* put(
      sendNotificationRequest({
        type: "success",
        message: "Updated successfully.",
      })
    );
  } catch (error) {
    yield* put(
      sendNotificationRequest({
        type: "error",
        message: "Updated failed.",
      })
    );
    yield* put(updateTermFailure(error));
  }
}

function* updateTermWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.UPDATE_TERM_REQUEST, updateTermWorker);
}

export {
  createTermWatcher,
  getOneTermWatcher,
  getDefaultTermsWatcher,
  getJustOneTermWatcher,
  updateTermWatcher,
};
