import { api, apiV2 } from "api/Api";
import React, {
  Context,
  createContext,
  Dispatch,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import * as authSvc from "../api/authentication";
import * as userSvc from "../api/user";
import { tokenStorage } from "../utilities/token-storage";

const initialState = {
  isAuthenticated: false,
  loaded: false,
  user: null,
};

const actions = {
  SIGNIN_USER: "SIGNIN_USER",
  SIGNOUT_USER: "SIGNOUT_USER",
  SET_LOADED: "SET_LOADED",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN_USER:
      return Object.assign({}, state, {
        state: action.user,
        isAuthenticated: true,
        loaded: true,
      });
    case actions.SIGNOUT_USER:
      return Object.assign({}, state, {
        user: null,
        isAuthenticated: false,
        loaded: true,
      });
    case action.SET_LOADED:
      return Object.assign({}, state, { loaded: action.loaded });
    default:
      return state;
  }
};

type TAuthContext = typeof initialState & {
  dispatch: Dispatch<any>;
  onSignIn: (payload: any) => Promise<void>;
  onSignup: (payload: any) => Promise<void>;
  onSignOut: () => void;
  onGetMe: () => Promise<any>;
  onSendOTP: (payload: any) => Promise<any>;
  onVerifyPasswordOTP: (payload: any) => Promise<any>;
};

export const AuthContext = createContext(initialState) as Context<TAuthContext>;

export const AuthProvider = (props: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoState = useMemo(() => state, [state]);

  const setLoaded = useCallback((loaded: boolean) => {
    dispatch({
      type: actions.SET_LOADED,
      loaded,
    });
  }, []);

  const onSignIn = useCallback(
    async (payload) => {
      try {
        const user = await authSvc.signIn(payload);

        api.setAuthorizationToken(user.accessToken);
        apiV2.setAuthorizationToken(user.accessToken);
        tokenStorage.set(user.accessToken);

        dispatch({
          type: actions.SIGNIN_USER,
          user,
        });
      } catch (error) {
        console.log(error);

        throw new Error(error);
      } finally {
        setLoaded(true);
      }
    },
    [setLoaded]
  );

  const onSignup = useCallback(
    async (payload) => {
      try {
        const user = await authSvc.signUp(payload);

        api.setAuthorizationToken(user.accessToken);
        tokenStorage.set(user.accessToken);

        dispatch({
          type: actions.SIGNIN_USER,
          user,
        });
      } catch (error) {
        throw error;
      } finally {
        setLoaded(true);
      }
    },
    [setLoaded]
  );

  const onSignOut = useCallback(() => {
    tokenStorage.clear();

    dispatch({
      type: actions.SIGNOUT_USER,
    });
  }, []);

  const onGetMe = useCallback(async () => {
    return {};
  }, []);

  const onSendOTP = useCallback(async (payload) => {
    return userSvc.sentOTP(payload);
  }, []);

  const onVerifyPasswordOTP = useCallback((payload) => {
    return userSvc.verifyPasswordOTP(payload);
  }, []);

  // const initializeUser = useCallback(() => {
  //   const user = tokenStorage.decode();

  //   if (isEmpty(user)) {
  //     onSignOut();
  //   } else {
  //     dispatch({
  //       type: actions.SIGNIN_USER,
  //       user,
  //     });
  //   }
  // }, [onSignOut]);

  // useEffect(() => {
  //   initializeUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const value = useMemo(
    () => ({
      ...memoState,
      dispatch,
      onSignIn,
      onSignup,
      onSignOut,
      onGetMe,
      onSendOTP,
      onVerifyPasswordOTP,
    }),
    [
      memoState,
      onGetMe,
      onSendOTP,
      onSignIn,
      onSignOut,
      onSignup,
      onVerifyPasswordOTP,
    ]
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
