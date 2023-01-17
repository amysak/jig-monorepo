import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function defaultTrimsReducer(
    state = initialState,
    action?: { type: any; trims: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_DEFAULT_TRIMS_SUCCESS:
            return Object.assign({}, state, action.trims)
        default:
            return state
    }
}
