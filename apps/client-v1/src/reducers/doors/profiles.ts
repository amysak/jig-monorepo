import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function doorProfilesReducer(
    state = initialState,
    action?: { type: any; profiles: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_DOOR_PROFILES_SUCCESS:
            return Object.assign({}, state, action.profiles)
        default:
            return state
    }
}
