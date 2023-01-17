import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function letterReducer(
    state = initialState,
    action?: { type: any; letter: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_LETTER_SUCCESS:
            return Object.assign({}, state, action.letter)
        default:
            return state
    }
}
