import {
  AnyAction,
  configureStore,
  Dispatch,
  Middleware,
  StateFromReducersMapObject,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { baseApi } from "api/rtkq";
import logger from "redux-logger";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware, { END } from "redux-saga";
import { rootReducer } from "../reducers";

const createStore = () => {
  const rootSaga = createSagaMiddleware();

  const middlewares: Middleware<
    Record<string, unknown>,
    unknown,
    Dispatch<AnyAction>
  >[] = [rootSaga];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares, baseApi.middleware),
  });

  (store as any).runSaga = rootSaga.run;
  (store as any).close = () => store.dispatch(END);

  return store as typeof store & {
    runSaga: typeof rootSaga.run;
    close: () => void;
  };
};

export const store = createStore();

export type TReducer = StateFromReducersMapObject<typeof rootReducer>;

export type RootState = ReturnType<typeof store.getState>;

export const useAppState: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
