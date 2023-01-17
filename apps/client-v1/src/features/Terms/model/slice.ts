import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import { ClientTermsState, CLIENT_TERMS_SLICE_NAME } from "./types";

import { createTerm, getClientTerm, getTerms, updateTerm } from "./thunk";

const initialClientTermsState: ClientTermsState = {
  term: { data: undefined, isLoading: false },
  terms: { data: undefined, isLoading: false },
  terms_form: { data: undefined, isLoading: false },
};

export const clientTermsSlice = createSlice({
  name: CLIENT_TERMS_SLICE_NAME,
  initialState: initialClientTermsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTerms.pending, (state) => {
        state.term.isLoading = true;
        state.terms.isLoading = true;
      })
      .addCase(getTerms.rejected, (state) => {
        /* #region  term */
        state.term.isLoading = false;
        state.term.error = "Error";
        /* #endregion */
        /* #region  terms */
        state.terms.isLoading = false;
        state.terms.error = "Error";
        /* #endregion */
      })
      .addCase(getTerms.fulfilled, (state, { payload }) => {
        /* #region  term */
        state.term.isLoading = false;
        state.term.error = undefined;
        state.term.data = payload[0];
        /* #endregion */
        /* #region  terms */
        state.terms.isLoading = false;
        state.terms.error = undefined;
        state.terms.data = payload[1];
        /* #endregion */
      })
      .addCase(getClientTerm.pending, (state) => {
        state.term.isLoading = true;
      })
      .addCase(getClientTerm.rejected, (state) => {
        state.term.error = "Error";
        state.term.isLoading = false;
      })
      .addCase(getClientTerm.fulfilled, (state, { payload }) => {
        state.term.isLoading = false;
        state.term.error = undefined;
        state.term.data = payload;
      })
      .addMatcher(isPending(createTerm, updateTerm), (state) => {
        state.terms_form.isLoading = true;
      })
      .addMatcher(isRejected(createTerm, updateTerm), (state) => {
        state.terms_form.isLoading = false;
        state.terms_form.error = "Error";
      })
      .addMatcher(isFulfilled(createTerm, updateTerm), (state) => {
        state.terms_form.isLoading = false;
        state.terms_form.error = undefined;
      });
  },
});
