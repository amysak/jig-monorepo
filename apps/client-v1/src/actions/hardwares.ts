import { Accessory, Account } from "entities";
import { ISerializedResponse } from "utilities/utils";
import { ActionTypes } from "./types";

const getDefaultHardwaresRequest = (query: string) => ({
  type: ActionTypes.GET_DEFAULT_HARDWARES_REQUEST,
  query,
});

const getDefaultHardwaresSuccess = (
  hardwares: ISerializedResponse<Accessory>
) => ({
  type: ActionTypes.GET_DEFAULT_HARDWARES_SUCCESS,
  hardwares,
});

const getDefaultHardwaresFailure = (error: Error) => ({
  type: ActionTypes.GET_DEFAULT_HARDWARES_FAILURE,
  error,
});

const getSetupHardwaresRequest = (query: string, key: string) => ({
  type: ActionTypes.GET_SETUP_HARDWARES_REQUEST,
  query,
  key,
});

const getSetupHardwaresSuccess = (
  hardwares: ISerializedResponse<Accessory>,
  key: string
) => ({
  type: ActionTypes.GET_SETUP_HARDWARES_SUCCESS,
  hardwares,
  key,
});

const getSetupHardwaresFailure = (error: Error) => ({
  type: ActionTypes.GET_SETUP_HARDWARES_FAILURE,
  error,
});

const createHardwareRequest = (payload: any) => ({
  type: ActionTypes.CREATE_HARDWARE_REQUEST,
  payload,
});

const createHardwareSuccess = (
  hardware: {
    account: Account;
    room: any;
  } & Accessory
) => ({
  type: ActionTypes.CREATE_HARDWARE_SUCCESS,
  hardware,
});

const createHardwareFailure = (error: Error) => ({
  type: ActionTypes.CREATE_HARDWARE_FAILURE,
  error,
});

const updateHardwareRequest = (hardwareId: string, payload: any) => ({
  type: ActionTypes.UPDATE_HARDWARE_REQUEST,
  hardwareId,
  payload,
});

const updateHardwareSuccess = (partial: any) => ({
  type: ActionTypes.UPDATE_HARDWARE_SUCCESS,
  partial,
});

const updateHardwareFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_HARDWARE_FAILURE,
  error,
});

const getOneHardwareRequest = (hardwareId: string) => ({
  type: ActionTypes.GET_ONE_HARDWARE_REQUEST,
  hardwareId,
});

const getOneHardwareSuccess = (hardware: Accessory) => ({
  type: ActionTypes.GET_ONE_HARDWARE_SUCCESS,
  hardware,
});

const getOneHardwareFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_HARDWARE_FAILURE,
  error,
});

export {
  getDefaultHardwaresRequest,
  getDefaultHardwaresSuccess,
  getDefaultHardwaresFailure,
  getSetupHardwaresRequest,
  getSetupHardwaresSuccess,
  getSetupHardwaresFailure,
  createHardwareRequest,
  createHardwareSuccess,
  createHardwareFailure,
  getOneHardwareRequest,
  getOneHardwareSuccess,
  getOneHardwareFailure,
  updateHardwareRequest,
  updateHardwareSuccess,
  updateHardwareFailure,
};
