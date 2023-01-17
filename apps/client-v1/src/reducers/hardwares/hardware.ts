import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function hardwareReducer(
    state = initialState,
    action?: { type: any; hardware: any; partial: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_HARDWARE_SUCCESS:
        case ActionTypes.CREATE_HARDWARE_SUCCESS:
            return Object.assign({}, state, action.hardware)
        case ActionTypes.UPDATE_HARDWARE_SUCCESS:
            return Object.assign({}, state, action.partial)
        default:
            return state
    }
}
