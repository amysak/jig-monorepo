import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
    loading: true,
}

export type IInitialState = typeof initialState

export default function jobsReducer(
    state = initialState,
    action?: { type: any; jobs: any; job: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_JOBS_SUCCESS:
            return Object.assign({}, state, {
                ...action.jobs,
                loading: false,
            })
        case ActionTypes.GET_CLIENT_JOBS_SUCCESS:
            return Object.assign({}, state, {
                ...action.jobs,
                loading: false,
            })

        case ActionTypes.CREATE_CLIENT_JOB_SUCCESS:
            return Object.assign({}, state, {
                total: state.total + 1,
                data: [...state.data, action.job],
                submitted: true,
            })
        default:
            return state
    }
}
