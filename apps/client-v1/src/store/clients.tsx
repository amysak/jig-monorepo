import { Client } from "entities";
import React, { Context, createContext, useReducer } from "react";
import * as clientSvc from "../api/clients";

interface IInitialState {
  clients: [Array<Client>, number];
  client: Client | null;
}

const initialState: IInitialState = {
  clients: [[], 0],
  client: null,
};

const actions = {
  GET_CLIENT: "GET_CLIENT",
  GET_ALL_CLIENTS: "GET_ALL_CLIENTS",
  CREATE_NEW_CLIENT: "CREATE_NEW_CLIENT",
  UPDATE_CLIENT: "UPDATE_CLIENT",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_CLIENT:
      return { ...state, client: action.client };
    case actions.GET_ALL_CLIENTS:
      return { ...state, clients: action.clients };
    case actions.CREATE_NEW_CLIENT:
      return {
        ...state,
        clients: [[action.client, ...state.clients[0]], state.clients[1] + 1],
        client: action.client,
      };
    case actions.UPDATE_CLIENT:
      return { ...state, client: { ...state.client, ...action.partial } };
    default:
      return state;
  }
};

type TClientsContext = typeof initialState & {
  onGetClients: (query: string) => Promise<void>;
  onGetOneCLient: (clientId: any) => Promise<void>;
  onCreateClient: (payload: any) => Promise<void>;
  onUpdateClient: (
    clientId: any,
    partial: undefined,
    live?: boolean
  ) => Promise<void>;
};

export const ClientsContext = createContext(
  initialState
) as Context<TClientsContext>;

export const ClientsContextProvider = (props: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onGetClients = async (query: string) => {
    try {
      const clients = await clientSvc.getClients(query);

      dispatch({
        type: actions.GET_ALL_CLIENTS,
        clients,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onGetOneCLient = async (clientId) => {
    try {
      const client = await clientSvc.getClient(clientId);

      dispatch({
        type: actions.GET_CLIENT,
        client,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onCreateClient = async (payload) => {
    try {
      const client = await clientSvc.createClient(payload);

      dispatch({
        type: actions.CREATE_NEW_CLIENT,
        client,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateClient = async (clientId, partial: undefined, live = false) => {
    try {
      await clientSvc.updateClient(clientId, partial);

      if (live) {
        dispatch({
          type: actions.UPDATE_CLIENT,
          partial,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const value = {
    ...state,
    onGetClients,
    onGetOneCLient,
    onCreateClient,
    onUpdateClient,
  };

  return (
    //@ts-ignore
    <ClientsContext.Provider value={value}>
      {props.children}
    </ClientsContext.Provider>
  );
};
