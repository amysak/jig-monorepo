import { User } from "entities";
import { ActionTypes } from "./types";

const userAuthStatusRequest = () => ({
  type: ActionTypes.USER_AUTH_STATUS_REQUEST,
});

const userSigninRequest = (payload: string) => ({
  type: ActionTypes.USER_SIGNIN_REQUEST,
  payload,
});

const userSigninSuccess = (user: any) => ({
  type: ActionTypes.USER_SIGNIN_SUCCESS,
  user,
});

const userSigninFailure = (error: Error) => ({
  type: ActionTypes.USER_SIGNIN_FAILURE,
  error,
});

const userSignupRequest = (payload: string) => ({
  type: ActionTypes.USER_SIGNUP_REQUEST,
  payload,
});

const userSignupSuccess = (user: any) => ({
  type: ActionTypes.USER_SIGNUP_SUCCESS,
  user,
});

const userSignupFailure = (error: Error) => ({
  type: ActionTypes.USER_SIGNUP_FAILURE,
  error,
});

const userSignoutRequest = (payload?: { message: string }) => ({
  type: ActionTypes.USER_SIGNOUT_REQUEST,
  message: payload.message,
});
const userSignoutSuccess = () => ({ type: ActionTypes.USER_SIGNOUT_SUCCESS });

const userSignoutFailure = (error: Error) => ({
  type: ActionTypes.USER_SIGNOUT_FAILURE,
  error,
});

const userDataRequest = () => ({ type: ActionTypes.USER_DATA_REQUEST });

const userDataSuccess = (user: User) => ({
  type: ActionTypes.USER_DATA_SUCCESS,
  user,
});

const userDataFailure = (error: Error) => ({
  type: ActionTypes.USER_DATA_FAILURE,
  error,
});

export {
  userAuthStatusRequest,
  userSigninRequest,
  userSigninSuccess,
  userSigninFailure,
  userSignupRequest,
  userSignupSuccess,
  userSignupFailure,
  userSignoutRequest,
  userSignoutSuccess,
  userSignoutFailure,
  userDataRequest,
  userDataSuccess,
  userDataFailure,
};
