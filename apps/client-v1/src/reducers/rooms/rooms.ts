import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
}

export type IInitialState = typeof initialState

export default function roomsReducer(
    state = initialState,
    action?: { type: any; rooms: any; room: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ROOMS_SUCCESS:
        case ActionTypes.GET_JOB_ROOMS_SUCCESS:
            return Object.assign({}, state, action.rooms)
        case ActionTypes.CREATE_ROOM_SUCCESS:
            return Object.assign({}, state, {
                data: [action.room, ...state.data],
                total: state.total + 1,
            })
        default:
            return state
    }
}
