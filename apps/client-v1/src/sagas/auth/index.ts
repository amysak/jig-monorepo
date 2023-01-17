import { call, put, takeEvery, takeLatest } from "typed-redux-saga";

import { ActionTypes } from "../../actions/types";
import * as authenticationSvc from "../../api/authentication";
import { store } from "../../store";
import { tokenStorage } from "../../utilities/token-storage";
import { appSaga } from "../app";

import {
  userDataRequest,
  userSigninSuccess,
  userSignoutFailure,
  userSignoutRequest,
  userSignoutSuccess,
} from "../../actions/user";

function* authStatusWorker() {
  try {
    store.runSaga(appSaga);

    // const user = tokenStorage.decode();

    // if (user) {
    const isLoggedIn = yield* call(authenticationSvc.validateToken);

    if (isLoggedIn.ok) {
      yield* put(userSigninSuccess({} as any));
      yield* put(userDataRequest());
    } else {
      // TODO: Replace with getting refresh token
      yield* put(userSignoutRequest({ message: "Expired token." }));
    }
    // } else {
    //   yield* put(userSignoutRequest({ message: "Missing token." }));
    // }
  } catch (error) {
    throw error;
  }
}

function* authStatusWatcher() {
  yield* takeEvery(ActionTypes.USER_AUTH_STATUS_REQUEST, authStatusWorker);
}

function* signOutWorker() {
  try {
    tokenStorage.clear();

    yield* put(userSignoutSuccess());
  } catch (error) {
    yield* put(userSignoutFailure(new Error("Error while signing out.")));
  }
}

function* singOutWatcher() {
  yield* takeLatest(ActionTypes.USER_SIGNOUT_REQUEST, signOutWorker);
}

export { authStatusWatcher, singOutWatcher };
