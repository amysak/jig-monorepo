import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function markupReducer(
    state = initialState,
    action?: { type: any; markup: any; partial: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_MARKUP_SUCCESS:
        case ActionTypes.CREATE_MARKUP_SUCCESS:
        case ActionTypes.GET_ONE_MARKUP_BY_ID_SUCCESS:
            return Object.assign({}, state, action.markup)
        case ActionTypes.UPDATE_MARKUP_SUCCESS:
            return Object.assign({}, state, action.partial)
        default:
            return state
    }
}
