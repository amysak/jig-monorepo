import { ActionTypes } from "./types";

import { Account, Preference } from "entities";

const getCompanyRequest = () => ({ type: ActionTypes.GET_COMPANY_REQUEST });

const getCompanySuccess = (company: Account) => ({
  type: ActionTypes.GET_COMPANY_SUCCESS,
  company,
});

const getCompanyFailure = (error: Error) => ({
  type: ActionTypes.GET_COMPANY_FAILURE,
  error,
});

const updateAccountRequest = (payload: any) => ({
  type: ActionTypes.UPDATE_ACCOUNT_REQUEST,
  payload,
});

const updateAccountSuccess = (payload: Account) => ({
  type: ActionTypes.UPDATE_ACCOUNT_SUCCESS,
  payload,
});

const updateAccountFailure = (payload: Error) => ({
  type: ActionTypes.UPDATE_ACCOUNT_FAILURE,
  payload,
});

const getAccountUsersRequest = () => ({
  type: ActionTypes.GET_ACCOUNT_USERS_REQUEST,
});

const getAccountUsersSuccess = (users: { data: any; total: any }) => ({
  type: ActionTypes.GET_ACCOUNT_USERS_SUCCESS,
  users,
});
const getAccountUsersFailure = () => ({
  type: ActionTypes.GET_ACCOUNT_USERS_FAILURE,
});

const getAccountPreferenceRequest = () => ({
  type: ActionTypes.GET_ACCOUNT_PREFERENCES_REQUEST,
});

const getAccountPreferenceSuccess = (preference: Preference) => ({
  type: ActionTypes.GET_ACCOUNT_PREFERENCES_SUCCESS,
  preference,
});

const getAccountPreferenceFailure = (error: Error) => ({
  type: ActionTypes.GET_ACCOUNT_PREFERENCES_FAILURE,
  error,
});

const updateAccountPreferenceRequest = (payload: any) => ({
  type: ActionTypes.UPDATE_ACCOUNT_PREFERENCE_REQUEST,
  payload,
});

const updateAccountPreferenceSuccess = (partial: any) => ({
  type: ActionTypes.UPDATE_ACCOUNT_PREFERENCE_SUCCESS,
  partial,
});

const updateAccountPreferenceFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_ACCOUNT_PREFERENCE_FAILURE,
  error,
});

export {
  getCompanyRequest,
  getCompanySuccess,
  getCompanyFailure,
  updateAccountRequest,
  updateAccountSuccess,
  updateAccountFailure,
  getAccountUsersRequest,
  getAccountUsersSuccess,
  getAccountUsersFailure,
  getAccountPreferenceRequest,
  getAccountPreferenceSuccess,
  getAccountPreferenceFailure,
  updateAccountPreferenceRequest,
  updateAccountPreferenceSuccess,
  updateAccountPreferenceFailure,
};
