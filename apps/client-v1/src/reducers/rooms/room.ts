import { ActionTypes } from '../../actions/types'

const initialState = {
    material: {},
}

export type IInitialState = typeof initialState

export default function roomReducer(
    state = initialState,
    action?: { type: any; room: any; partial: any; material: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_ROOM_SUCCESS:
            return Object.assign({}, state, { ...action.room })
        case ActionTypes.UPDATE_ROOM_SUCCESS:
            return Object.assign({}, state, action.partial)
        case ActionTypes.GET_ROOM_MATERIAL_SUCCESS:
            return Object.assign({}, state, {
                material: action.material,
            })
        default:
            return state
    }
}
