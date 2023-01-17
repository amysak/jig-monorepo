import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
    panels: {
        data: [],
        total: 0,
    },
    edges: {
        data: [],
        total: 0,
    },
    frames: {
        data: [],
        total: 0,
    },
}

export type IInitialState = typeof initialState

export default function profilesReducer(
    state = initialState,
    action?: { type: any; panels: any; edges: any; frames: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_PROFILE_PANELS_SUCCESS:
            return Object.assign({}, state, {
                panels: action.panels,
            })
        case ActionTypes.GET_PROFILE_EDGES_SUCCESS:
            return Object.assign({}, state, {
                edges: action.edges,
            })
        case ActionTypes.GET_PROFILE_FRAMES_SUCCESS:
            return Object.assign({}, state, {
                frames: action.frames,
            })
        default:
            return state
    }
}
