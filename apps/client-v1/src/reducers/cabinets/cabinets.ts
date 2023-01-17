import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
}

export type IInitialState = typeof initialState

export default function cabinetsReducer(
    state = initialState,
    action?: { type: any; cabinets: any; cabinet: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_CABINETS_SUCCESS:
            return Object.assign({}, state, action.cabinets)
        case ActionTypes.CREATE_CABINET_SUCCESS:
            return Object.assign({}, state, {
                submitted: true,
                data: [action.cabinet, ...state.data],
                total: state.total + 1,
            })
        default:
            return state
    }
}
