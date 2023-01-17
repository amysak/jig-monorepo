import { ActionTypes } from '../../actions/types';

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function hardwaresReducer(
    state = initialState,
    action?: { type: any; hardwares: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_DEFAULT_HARDWARES_SUCCESS:
            return Object.assign({}, state, action.hardwares)
        default:
            return state
    }
}
