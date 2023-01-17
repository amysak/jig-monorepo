import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function taxReducer(
    state = initialState,
    action?: { type: any; tax: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_TAX_SUCCESS:
        case ActionTypes.CREATE_TAX_SUCCESS:
            return Object.assign({}, state, action.tax)
        default:
            return state
    }
}
