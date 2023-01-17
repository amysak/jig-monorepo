import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function cabinetReducer(
    state = initialState,
    action?: { type: any; cabinet: any; partial: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_CABINET_SUCCESS:
        case ActionTypes.CREATE_CABINET_SUCCESS:
        case ActionTypes.GET_ONE_CABINET_BY_ID_SUCCESS:
            return Object.assign({}, state, action.cabinet)
        case ActionTypes.UPDATE_CABINET_SUCCESS:
            return Object.assign({}, state, action.partial)
        default:
            return state
    }
}
