import { createSlice } from '@reduxjs/toolkit'

import { EstimateProposalsState, ESTIMATE_PROPOSALS_SLICE_NAME } from './types'

import { getInfoThunk } from './thunk'

const initialUserState: EstimateProposalsState = {
    jobs: { data: undefined, isLoading: false },
    rooms: { data: undefined, isLoading: false },
}

export const estimateProposalsSlice = createSlice({
    name: ESTIMATE_PROPOSALS_SLICE_NAME,
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInfoThunk.pending, (state) => {
                state.jobs.isLoading = true
                state.rooms.isLoading = true
            })
            .addCase(getInfoThunk.fulfilled, (state, { payload }) => {
                state.jobs.isLoading = false
                state.rooms.isLoading = false

                state.rooms.data = payload[0]
                state.jobs.data = payload[1]
            })
    },
})
