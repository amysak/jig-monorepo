import { Client } from "entities";
import { ISerializedResponse } from "utilities/utils";
import { ActionTypes } from "./types";

const getClientsRequest = (query: string) => ({
  type: ActionTypes.GET_CLIENTS_REQUEST,
  query,
});

const getClientsSuccess = (clients: ISerializedResponse<Client>) => ({
  type: ActionTypes.GET_CLIENTS_SUCCESS,
  clients,
});

const getClientsFailure = (error: Error) => ({
  type: ActionTypes.GET_CLIENTS_FAILURE,
  error,
});

const getOneClientRequest = (clientId: string) => ({
  type: ActionTypes.GET_ONE_CLIENT_REQUEST,
  clientId,
});

const getOneClientSuccess = (client: Client) => ({
  type: ActionTypes.GET_ONE_CLIENT_SUCCESS,
  client,
});

const getOneClientFailure = (error: Error) => ({
  type: ActionTypes.GET_ONE_CLIENT_FAILURE,
  error,
});

const updateClientRequest = (clientId: string, payload: Partial<Client>) => ({
  type: ActionTypes.UPDATE_CLIENT_REQUEST,
  clientId,
  payload,
});

const updateClientSuccess = (partial: Client) => ({
  type: ActionTypes.UPDATE_CLIENT_SUCCESS,
  partial,
});

const updateClientFailure = (error: Error) => ({
  type: ActionTypes.UPDATE_CLIENT_FAILURE,
  error,
});

const createClientRequest = (payload: Client) => ({
  type: ActionTypes.CREATE_CLIENT_REQUEST,
  payload,
});

const createClientSuccess = (client: Client) => ({
  type: ActionTypes.CREATE_CLIENT_SUCCESS,
  client,
});

const createClientFailure = (error: Error) => ({
  type: ActionTypes.CREATE_CLIENT_FAILURE,
  error,
});

export {
  getClientsRequest,
  getClientsSuccess,
  getClientsFailure,
  getOneClientRequest,
  getOneClientSuccess,
  getOneClientFailure,
  updateClientRequest,
  updateClientSuccess,
  updateClientFailure,
  createClientRequest,
  createClientSuccess,
  createClientFailure,
};
