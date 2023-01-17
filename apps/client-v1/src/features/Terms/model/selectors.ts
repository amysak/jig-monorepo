import { createSelector } from '@reduxjs/toolkit'

import { ClientTermsState, CLIENT_TERMS_SLICE_NAME } from './types'

type RootState = { [CLIENT_TERMS_SLICE_NAME]: ClientTermsState }

export const clientTermSelector = (state: RootState): ClientTermsState =>
    state[CLIENT_TERMS_SLICE_NAME]

/* #region  clientTerm */
export const selectClientTerm = createSelector(
    clientTermSelector,
    (store: ClientTermsState) => store.term
)
/* #endregion */

/* #region  defaultTerms */
export const selectDefaultTermByClientTermId = createSelector(
    clientTermSelector,
    (store: ClientTermsState) =>
        store.terms?.data?.[0]?.find(({ id }) => store.term?.data?.name === id)
)

export const selectClientTerms = createSelector(
    clientTermSelector,
    (store: ClientTermsState) => store.terms
)
/* #endregion */

/* #region  clientTermForm */
export const selectClientTermForm = createSelector(
    clientTermSelector,
    (store: ClientTermsState) => store.terms_form
)

/* #endregion */
