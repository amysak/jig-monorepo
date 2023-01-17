import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function termReducer(
    state = initialState,
    action?: { type: any; term: any; partial: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_TERM_SUCCESS:
        case ActionTypes.CREATE_TERM_SUCCESS:
            return Object.assign({}, state, action.term)
        case ActionTypes.UPDATE_TERM_SUCCESS:
            return Object.assign({}, state, action.partial)
        default:
            return state
    }
}
