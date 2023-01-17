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

export default function accessoriesReducer(
    state = initialState,
    action?: { type: string; accessories: any; accessory: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_ACCESSORIES_SUCCESS:
        case ActionTypes.GET_ROOM_ACCESSORIES_SUCCESS:
            return Object.assign({}, state, action.accessories)
        case ActionTypes.CREATE_ROOM_ACCESSORY_SUCCESS:
            return Object.assign({}, state, {
                data: [action.accessory, ...state.data],
                total: state.total + 1,
            })
        default:
            return state
    }
}
