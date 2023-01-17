import { ActionTypes } from '../../actions/types'

const initialState = {
    client: { name: '' },
}

export type IInitialState = typeof initialState

export default function jobReducer(
    state = initialState,
    action?: { type: any; job: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_JOB_SUCCESS:
        case ActionTypes.CREATE_CLIENT_JOB_SUCCESS:
            return Object.assign({}, state, action.job)
        default:
            return state
    }
}
