import React, {
  Context,
  createContext,
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Action } from "redux";

import * as accountSVC from "../api/account";

type TAction = Action<string>;

type TActionPayload = TAction & IInitialState;

interface IInitialState {
  loaded: boolean;
  name: string;
  users: {
    data: any[];
    total: number;
  };
  preference: Record<string, any>;
  settings: Record<string, any>;
  subscription: Record<string, any>;
  image_url: string;
  account: { stripe_customer_id?: string; hasCard?: boolean };
  subscriptionCard: null;
  loading: boolean;
}

const initialState: IInitialState = {
  loaded: false,
  name: "",
  users: {
    data: [],
    total: 0,
  },
  preference: {},
  settings: {},
  subscription: {},
  image_url: "",
  account: {},
  subscriptionCard: null,
  loading: false,
};

const actions = {
  SET_ACCOUNT: "SET_ACCOUNT",
  SET_ACCOUNT_USERS: "SET_ACCOUNT_USERS",
  SET_ACCOUNT_PREFERENCES: "SET_ACCOUNT_PREFERENCES",
  SET_LOADING: "SET_LOADING",
  SET_PAYMENT_CARD: "SET_PAYMENT_CARD",
  SET_LOADED: "SET_LOADED",
};

const reducer = (state = initialState, action: Partial<TActionPayload>) => {
  switch (action.type) {
    case actions.SET_LOADED:
      return Object.assign({}, state, {
        loaded: action.loaded,
      });
    case actions.SET_PAYMENT_CARD:
      return Object.assign({}, state, {
        subscriptionCard: action.subscriptionCard,
      });
    case actions.SET_ACCOUNT:
      return Object.assign({}, state, {
        account: action.account,
      });
    case actions.SET_ACCOUNT_USERS:
      return Object.assign({}, state, {
        users: action.users,
      });
    case actions.SET_ACCOUNT_PREFERENCES:
      return Object.assign({}, state, {
        preference: { ...state.preference, ...action.preference },
      });
    case actions.SET_LOADING:
      return Object.assign({}, state, { loading: action.loading });
    default:
      return state;
  }
};

type TAccountContext = typeof initialState & {
  dispatch: Dispatch<Partial<TActionPayload>>;
  getAccount: () => Promise<void>;
  updateAccount: (payload: undefined) => Promise<void>;
  getAccountUsers: () => Promise<void>;
  updateAccountPreferences: (payload: undefined) => Promise<void>;
  getSubscriptionCard: () => Promise<void>;
  getAccountPreferences: () => Promise<void>;
};

export const AccountContext = createContext(
  initialState
) as Context<TAccountContext>;

export const AccountProvider = (props: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoState = useMemo(() => state, [state]);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({
      type: actions.SET_LOADING,
      loading,
    });
  }, []);

  const setLoaded = useCallback((loaded: boolean) => {
    dispatch({
      type: actions.SET_LOADED,
      loaded,
    });
  }, []);

  const getAccount = useCallback(async () => {
    try {
      setLoading(true);
      setLoaded(false);

      const account = await accountSVC.getCompany();

      dispatch({
        type: actions.SET_ACCOUNT,
        account,
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  }, [setLoaded, setLoading]);

  const updateAccount = useCallback(async (payload: undefined) => {
    try {
      const account = await accountSVC.updateAccount(payload);

      dispatch({
        type: actions.SET_ACCOUNT,
        account: { ...account, hasCard: true },
      });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const getAccountUsers = useCallback(async () => {
    try {
      const users = await accountSVC.getAccountUsers();

      dispatch({
        type: actions.SET_ACCOUNT_USERS,
        //@ts-ignore
        users,
      });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const getSubscriptionCard = useCallback(async () => {
    try {
      const subscriptionCard = await accountSVC.getSubscriptionCard();

      dispatch({
        type: actions.SET_PAYMENT_CARD,
        subscriptionCard,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getAccountPreferences = useCallback(async () => {
    try {
      const preference = await accountSVC.getAccountPreference();

      dispatch({
        type: actions.SET_ACCOUNT_PREFERENCES,
        preference,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateAccountPreferences = useCallback(async (payload: undefined) => {
    try {
      await accountSVC.updateAccountPreference(payload);
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  useEffect(() => {
    getAccountPreferences();
  }, []);

  const value = useMemo(
    () => ({
      ...memoState,
      dispatch,
      getAccount,
      updateAccount,
      getAccountUsers,
      getAccountPreferences,
      updateAccountPreferences,
      getSubscriptionCard,
    }),
    [
      getAccount,
      getAccountPreferences,
      getAccountUsers,
      getSubscriptionCard,
      memoState,
      updateAccount,
      updateAccountPreferences,
    ]
  );

  return (
    <AccountContext.Provider value={value}>
      {props.children}
    </AccountContext.Provider>
  );
};
