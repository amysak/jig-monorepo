import { ActionTypes } from '../../actions/types'

interface IInitialState {
    total: number
    data: any[]
    submitted: boolean
}

const initialState: IInitialState = {
    total: 0,
    data: [],
    submitted: false,
}

export default function defaultAccessoriesReducer(
    state = initialState,

    action?: { type: string; accessories: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_DEFAULT_ACCESSORIES_SUCCESS:
            return Object.assign({}, state, action.accessories)
        default:
            return state
    }
}
