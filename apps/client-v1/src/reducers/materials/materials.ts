import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
    defaultNames: {
        data: [],
        total: 0,
    },
    woods: {
        data: [],
        total: 0,
    },
    interiorExteriors: {
        data: [],
        total: 0,
    },
    backs: {
        data: [],
        total: 0,
    },
    finishEnds: {
        data: [],
        total: 0,
    },
}

export type IInitialState = typeof initialState

export default function materialsReducer(
    state = initialState,
    action?: { type: any; materials: any; key: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_DEFAULT_MATERIALS_SUCCESS:
        case ActionTypes.GET_SETUP_MATERIALS_SUCCESS:
            return Object.assign({}, state, action.materials)
        case ActionTypes.GET_DEFAULT_MATERIALS_NAMES_SUCCESS:
            return Object.assign({}, state, {
                defaultNames: action.materials,
            })
        case ActionTypes.GET_SETUP_MATERIALS_NAMES_SUCCESS:
            const partial = action.key
                ? { [action.key]: action.materials }
                : action.materials

            return Object.assign({}, state, partial)
        default:
            return state
    }
}
