import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
    classifications: [],
    subclassifications: [],
}

export type IInitialState = typeof initialState

export default function trimsReducer(
    state = initialState,
    action?: {
        type: any
        trimMoldings: any
        trimMolding: any
        classifications: any
        subclassifications: any
    }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_TRIMS_SUCCESS:
        case ActionTypes.GET_ROOM_TRIM_MOLDINGS_SUCCESS:
            return Object.assign({}, state, action.trimMoldings)
        case ActionTypes.CREATE_TRIM_MOLDING_SUCCESS:
            return Object.assign({}, state, {
                data: [action.trimMolding, ...state.data],
                total: state.total + 1,
            })
        case ActionTypes.GET_TRIM_MOLDING_CLASSIFICATIONS_SUCCESS:
            return Object.assign({}, state, {
                classifications: action.classifications,
            })
        case ActionTypes.GET_TRIM_MOLDING_SUBCLASSIFICATIONS_SUCCESS:
            return Object.assign({}, state, {
                subclassifications: action.subclassifications,
            })
        default:
            return state
    }
}
