import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function deliveryReducer(
    state = initialState,
    action?: { type: any; delivery: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_DELIVERY_SUCCESS:
        case ActionTypes.CREATE_DELIVERY_SUCCESS:
            return Object.assign({}, state, action.delivery)
        default:
            return state
    }
}
