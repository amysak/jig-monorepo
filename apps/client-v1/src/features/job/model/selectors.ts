import { createSelector } from '@reduxjs/toolkit'

import { JobsState, JOBS_SLICE_NAME } from './types'

type RootState = { [JOBS_SLICE_NAME]: JobsState }

export const jobSelector = (state: RootState): JobsState =>
    state[JOBS_SLICE_NAME]

/* #region  jobTerm */
export const selectJob = createSelector(
    jobSelector,
    (store: JobsState) => store.job
)
/* #endregion */

/* #region  jobTerm */
export const selectJobs = createSelector(
    jobSelector,
    (store: JobsState) => store.jobs
)
/* #endregion */
