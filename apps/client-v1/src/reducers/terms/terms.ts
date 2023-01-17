import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function termsReducer(
    state = initialState,
    action?: { type: any; terms: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_DEFAULT_TERMS_SUCCESS:
            return Object.assign({}, state, action.terms)
        default:
            return state
    }
}
