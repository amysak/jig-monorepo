import { ActionTypes } from '../../actions/types'

const initialState = {
    drawer_rollout_guides: {
        data: [],
        total: 0,
    },
    hinges: {
        data: [],
        total: 0,
    },
    legs: {
        data: [],
        total: 0,
    },
    surface_hardware: {
        data: [],
        total: 0,
    },
    doors_and_drawers: {
        data: [],
        total: 0,
    },
    suspension_rails: {
        data: [],
        total: 0,
    },
    suspension_blocks: {
        data: [],
        total: 0,
    },
    data: [],
    total: 0,
}

export type IInitialState = typeof initialState

export default function hardwaresSetupReducer(
    state = initialState,
    action?: { type: any; key: any; hardwares: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_SETUP_HARDWARES_SUCCESS:
            const partial = action.key
                ? { [action.key]: action.hardwares }
                : action.hardwares

            return Object.assign({}, state, partial)
        default:
            return state
    }
}
