import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function cabinetsSetupReducer(
    state = initialState,
    action?: { type: any; cabinets: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_SETUP_CABINETS_SUCCESS:
            return Object.assign({}, state, action.cabinets)
        default:
            return state
    }
}
