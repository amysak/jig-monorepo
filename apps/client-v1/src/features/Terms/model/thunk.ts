import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createTerm as _createTerm,
  getDefaultTerms,
  getTerm,
  TGetDefaultTerms,
  updateTerms as _updateTerms,
} from "api/terms";
import { Terms } from "entities";

import { CLIENT_TERMS_SLICE_NAME } from "./types";

/* #region  getTerms */
const GET_TERMS_ACTION = "GET_TERMS_ACTION";

export const getTerms = createAsyncThunk<[Terms, TGetDefaultTerms], string>(
  `${CLIENT_TERMS_SLICE_NAME}/${GET_TERMS_ACTION}`,
  async (clientId: string): Promise<[Terms, TGetDefaultTerms]> =>
    Promise.all([await getTerm(clientId), await getDefaultTerms()]) as any
);
/* #endregion */

/* #region getClientTerm  */
const GET_CLIENTS_TERM_ACTION = "GET_CLIENTS_TERM_ACTION";

export const getClientTerm = createAsyncThunk<Terms, string>(
  `${CLIENT_TERMS_SLICE_NAME}/${GET_CLIENTS_TERM_ACTION}`,
  async (clientId: string): Promise<Terms> => getTerm(clientId) as any
);
/* #endregion */

/* #region createTerm */
const CREATE_TERMS_ACTION = "CREATE_TERMS_ACTION";

export interface ICreateTerm {
  is_default: boolean;
  status: any;
  client: string;
}

export const createTerm = createAsyncThunk<Terms, ICreateTerm>(
  `${CLIENT_TERMS_SLICE_NAME}/${CREATE_TERMS_ACTION}`,
  async (params) =>
    _createTerm({
      ...params,
    })
);
/* #endregion */

/* #region createTerm */
const UPDATE_TERMS_ACTION = "UPDATE_TERMS_ACTION";

export interface IUpdateTerm {
  termId: string;
  payload: { is_default: boolean; status: any };
}

export const updateTerm = createAsyncThunk<Terms, IUpdateTerm>(
  `${CLIENT_TERMS_SLICE_NAME}/${UPDATE_TERMS_ACTION}`,
  async (params) => _updateTerms(params.termId, params.payload as any)
);
/* #endregion */
