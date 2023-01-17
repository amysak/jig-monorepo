import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function markupsReducer(
    state = initialState,
    action?: { type: any; markups: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_DEFAULT_MARKUPS_SUCCESS:
            return Object.assign({}, state, action.markups)
        default:
            return state
    }
}
