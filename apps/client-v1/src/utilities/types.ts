import { Dispatch, SetStateAction } from "react";
import { Action as ReduxAction } from "redux";

/* #region  store */
export type ReactDispatch<T> = Dispatch<SetStateAction<T>>;

export interface Action<T, P> {
  type: ReduxAction<T>["type"];
  payload: P;
}
/* #endregion */

export interface IFetchResponse<T> {
  data: T;
  error?: string;
  isLoading?: boolean;
}
