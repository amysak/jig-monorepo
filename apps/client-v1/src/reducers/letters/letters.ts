import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function lettersReducer(
    state = initialState,
    action?: { type: any; letters: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_DEFAULT_LETTERS_SUCCESS:
            return Object.assign({}, state, action.letters)
        default:
            return state
    }
}
