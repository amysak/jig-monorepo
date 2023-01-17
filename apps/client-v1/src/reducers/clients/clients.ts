import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    loading: true,
}

export type IInitialState = typeof initialState

export default function clientsReducer(
    state = initialState,
    action?: { type: any; clients: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_CLIENTS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                ...action.clients,
            })
        default:
            return state
    }
}
