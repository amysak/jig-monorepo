import { ActionTypes } from '../../actions/types'

const initialState = {}

export type IInitialState = typeof initialState

export default function materialReducer(
    state = initialState,
    action?: { type: any; material: any; partial: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_MATERIAL_SUCCESS:
            return Object.assign({}, state, action.material)
        case ActionTypes.UPDATE_DEFAULT_MATERIAL_SUCCESS:
            return Object.assign({}, state, action.partial)
        default:
            return state
    }
}
