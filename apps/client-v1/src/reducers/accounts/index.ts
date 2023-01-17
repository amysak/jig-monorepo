import { ActionTypes } from '../../actions/types'

const initialState = {
    loaded: false,
    name: '',
    users: {
        data: [],
        total: 0,
    },
    preference: {},
    subscription: {},
}

export type IInitialState = typeof initialState

export default function accountReducer(
    state = initialState,
    action?: {
        type: any
        company: any
        users: any
        preference: any
        partial: any
    }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                ...action.company,
                loaded: true,
            })
        case ActionTypes.GET_ACCOUNT_USERS_SUCCESS:
            return Object.assign({}, state, {
                users: action.users,
            })
        case ActionTypes.GET_ACCOUNT_PREFERENCES_SUCCESS:
            return Object.assign({}, state, {
                preference: action.preference,
            })
        case ActionTypes.UPDATE_ACCOUNT_PREFERENCE_SUCCESS:
            return Object.assign({}, state, {
                preference: { ...state.preference, ...action.partial },
            })
        default:
            return state
    }
}
