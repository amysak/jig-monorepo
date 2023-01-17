import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function cabinetSpecificationReducer(
    state = initialState,

    action?: { type: any; specification: any; partial: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_CABINET_SPECIFICATION_SUCCESS:
        case ActionTypes.CREATE_CABINET_SPECIFICATION_SUCCESS:
            return Object.assign({}, state, action.specification)
        case ActionTypes.UPDATE_CABINET_SPECIFICATION_SUCCESS:
            return Object.assign({}, state, action.partial)
        default:
            return state
    }
}
