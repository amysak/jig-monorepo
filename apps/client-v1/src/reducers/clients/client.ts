import { ActionTypes } from '../../actions/types'

const initialState = {
    mailing_address: {},
    physical_address: {},
    second_contact: {},
    first_contact: {},
    preferred_contact: '',
}

export type IInitialState = typeof initialState

export default function clientReducer(
    state = initialState,
    action?: { type: any; client: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ONE_CLIENT_SUCCESS:
        case ActionTypes.CREATE_CLIENT_SUCCESS:
            return Object.assign({}, state, action.client)
        default:
            return state
    }
}
