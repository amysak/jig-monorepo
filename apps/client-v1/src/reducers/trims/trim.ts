import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function trimReducer(
    state = initialState,
    action?: { type: any; trim: any; partial: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_TRIM_MOLDING_SUCCESS:
            return Object.assign({}, state, action.trim)
        case ActionTypes.UPDATE_TRIM_MOLDING_SUCCESS:
            return Object.assign({}, state, action.partial)
        default:
            return state
    }
}
