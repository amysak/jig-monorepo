import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function setupPanelsReducer(
    state = initialState,
    action?: { type: any; panels: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_SETUP_PANELS_SUCCESS:
            return Object.assign({}, state, action.panels)
        default:
            return state
    }
}
