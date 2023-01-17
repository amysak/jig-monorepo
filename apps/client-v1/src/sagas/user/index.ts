import { call, put, takeLatest } from "typed-redux-saga";

import { api } from "api/Api";
import { ActionTypes } from "../../actions/types";
import * as authSvc from "../../api/authentication";
import * as userSvc from "../../api/user";
import { tokenStorage } from "../../utilities/token-storage";

import {
  userDataFailure,
  userDataSuccess,
  userSigninFailure,
  userSigninSuccess,
  userSignupFailure,
  userSignupSuccess,
} from "../../actions/user";

import { getCompanyRequest } from "../../actions/account";
import { sendNotificationRequest } from "../../actions/notification";

function* signInWorker(action: { payload: any }) {
  try {
    const user = yield* call(authSvc.signIn, action.payload);

    yield* call(api.setAuthorizationToken.bind(api), user.accessToken);
    yield* call(tokenStorage.set.bind(tokenStorage), user.accessToken);
    yield* put(userSigninSuccess(user));
    yield* put(getCompanyRequest());

    yield* put(
      sendNotificationRequest({
        message: "Successfully signed in.",
        type: "success",
      })
    );
  } catch (error) {
    yield* put(
      sendNotificationRequest({
        message: "Failed to sign in.",
        type: "error",
      })
    );
    yield* put(userSigninFailure(error));
  }
}

function* signInWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.USER_SIGNIN_REQUEST, signInWorker);
}

function* signUpWorker(action: { payload: any }) {
  try {
    const user = yield* call(authSvc.signUp, action.payload);

    yield* call(api.setAuthorizationToken.bind(api), user.accessToken);
    yield* call(tokenStorage.set.bind(tokenStorage), user.accessToken);
    yield* put(userSignupSuccess(user));
    yield* put(getCompanyRequest());
    yield* put(
      sendNotificationRequest({
        message: "Successfully signed up.",
        type: "success",
      })
    );
  } catch (error) {
    yield* put(
      sendNotificationRequest({
        message: "Failed to sign up.",
        type: "error",
      })
    );
    yield* put(userSignupFailure(error));
  }
}

function* signUpWatcher() {
  // @ts-expect-error TS(2769): No overload matches this call.
  yield* takeLatest(ActionTypes.USER_SIGNUP_REQUEST, signUpWorker);
}

function* userDataWorker() {
  try {
    // const user = yield* call(userSvc.getMe);
    // yield* put(userDataSuccess(user));
  } catch (error) {
    yield* put(userDataFailure(error));
  }
}

function* userDataWatcher() {
  yield* takeLatest(ActionTypes.USER_DATA_REQUEST, userDataWorker);
}

export { signInWatcher, signUpWatcher, userDataWatcher };
