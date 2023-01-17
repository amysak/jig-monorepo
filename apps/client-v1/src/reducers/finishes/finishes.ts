import { ActionTypes } from '../../actions/types'

const initialState = {
    total: 0,
    data: [],
    submitted: false,
    finishProcesses: {
        data: [],
        total: 0,
    },
    paintColors: {
        data: [],
        total: 0,
    },
    glazeColors: {
        data: [],
        total: 0,
    },
}

export type IInitialState = typeof initialState

export default function finishesReducer(
    state = initialState,
    action?: { type: any; key: any; finishes: any; id: any }
): IInitialState {
    switch (action.type) {
        case ActionTypes.GET_SETUP_FINISHES_SUCCESS:
            const partial = action.key
                ? { [action.key]: action.finishes }
                : action.finishes

            return Object.assign({}, state, partial)

        case ActionTypes.UPDATE_SETUP_FINISHES_SUCCESS:
            return Object.assign({}, state, {
                data: state.data.map((finish) => {
                    if (finish.id === action.id) {
                        return { ...finish, ...partial }
                    }

                    return finish
                }),
            })
        default:
            return state
    }
}
