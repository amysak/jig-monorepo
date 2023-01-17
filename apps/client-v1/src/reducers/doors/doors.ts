import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
    tray: {
        data: [],
        total: 0,
    },
    drawerFront: {
        data: [],
        total: 0,
    },
    drawer_box: {
        data: [],
        total: 0,
    },
}

export type IInitialState = typeof initialState

export default function doorsReducer(
    state = initialState,
    action?: { type: any; key: any; doors: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_DOORS_SUCCESS:
            const partial = action.key
                ? { [action.key]: action.doors }
                : action.doors

            return Object.assign({}, state, partial)
        default:
            return state
    }
}
