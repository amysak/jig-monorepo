import { ActionTypes } from '../../actions/types'

const initialState = {
    type: '',
    message: '',
}

export type IInitialState = typeof initialState

export default function notificationReducer(
    state = initialState,
    action?: { type: any; notification: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.SEND_NOTIFICATION_REQUEST:
            return Object.assign({}, state, action.notification)
        default:
            return state
    }
}
