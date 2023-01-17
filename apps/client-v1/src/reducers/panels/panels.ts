import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function panelsReducer(
    state = initialState,
    action?: { type: any; panel: any; panels: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.CREATE_PANEL_SUCCESS:
            return Object.assign({}, state, {
                data: [action.panel, ...state.data],
                total: state.total + 1,
            })
        case ActionTypes.GET_ROOM_PANELS_SUCCESS:
            return Object.assign({}, state, action.panels)
        default:
            return state
    }
}
