import { createSelector } from '@reduxjs/toolkit'
import { EstimateProposalsState, ESTIMATE_PROPOSALS_SLICE_NAME } from './types'

type RootState = { [ESTIMATE_PROPOSALS_SLICE_NAME]: EstimateProposalsState }

export const estimateProposalsSelector = (
    state: RootState
): EstimateProposalsState => state[ESTIMATE_PROPOSALS_SLICE_NAME]

export const selectEPJobs = createSelector(
    estimateProposalsSelector,
    (estimateProposals: EstimateProposalsState) => estimateProposals.jobs
)
export const selectEPRooms = createSelector(
    estimateProposalsSelector,
    (estimateProposals: EstimateProposalsState) => estimateProposals.rooms
)
