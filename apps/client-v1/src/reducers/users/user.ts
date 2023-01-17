import { ActionTypes } from '../../actions/types'

export interface IUserState {
    isAuthenticated: boolean
    loaded: boolean
}

const initialState: IUserState = {
    isAuthenticated: false,
    loaded: false,
}

export default function userReducer(
    state = initialState,
    action?: { type: any; user: any }
): IUserState {
    switch (action.type) {
        case ActionTypes.USER_SIGNIN_SUCCESS:
        case ActionTypes.USER_SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                ...action.user,
                isAuthenticated: true,
                loaded: true,
            })
        case ActionTypes.USER_SIGNIN_FAILURE:
        case ActionTypes.USER_SIGNOUT_SUCCESS:
            return Object.assign(
                {},
                {
                    isAuthenticated: false,
                    loaded: false,
                }
            )
        default:
            return state
    }
}
