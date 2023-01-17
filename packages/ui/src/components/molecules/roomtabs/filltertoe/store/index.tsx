import React, { createContext, useReducer } from 'react'
import { useParams } from 'react-router'
import {
    createCabinet,
    deleteCabinetSetup,
    getCabinetByRoom,
    updateCabinet,
} from '../../../../../api/cabinets'

const initialState = {
    cabinets: [[], 0],
    loading: false,
}

const actions = {
    SET_CABINETS: 'SET_CABINETS',
    SET_LOADING: 'SET_LOADING',
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_CABINETS:
            return { ...state, cabinets: action.cabinets }
        case actions.SET_LOADING:
            return { ...state, loading: action.loading }
        default:
            return state
    }
}

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
export const FillerToeContext = createContext()

FillerToeContext.displayName = 'FillerToeContext'

export function FillerToeProvider(props: { children: any }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const params = useParams<{ id?: string }>()

    const onChange = (name, row: { id: any }) => {
        return async (value) => {
            try {
                await updateCabinet(row.id, { [name]: value })

                const list = state.cabinets[0]?.map((cabinet: { id: any }) => {
                    if (cabinet.id === row.id) {
                        return { ...cabinet, [name]: value }
                    }

                    return cabinet
                })

                dispatch({
                    cabinets: [list, list.length],
                    type: actions.SET_CABINETS,
                })
            } catch (error) {
                console.error(error)
            }
        }
    }

    const onCreate = async (payload) => {
        try {
            const created = await createCabinet({
                ...payload,
                is_default: false,
            })
            const list = [...state.cabinets[0], created]

            dispatch({
                cabinets: [list, list.length],
                type: actions.SET_CABINETS,
            })
        } catch (error) {
            console.error(error)
        }
    }

    const onDelete = (row: { id: any }) => {
        return async () => {
            try {
                await deleteCabinetSetup(row.id)

                const list = state.cabinets[0].filter(
                    (cabinet: { id: any }) => {
                        return cabinet.id !== row.id
                    }
                )

                dispatch({
                    cabinets: [list, list.length],
                    type: actions.SET_CABINETS,
                })
            } catch (error) {
                console.error(error)
            }
        }
    }

    const getRoomCabinetsData = async (category) => {
        try {
            const cabinets = await getCabinetByRoom(
                params.id,
                `?category=${category}`
            )

            dispatch({
                cabinets,
                type: actions.SET_CABINETS,
            })
        } catch (error) {
            console.error(error)
        }
    }

    const value = {
        ...state,
        onChange,
        onCreate,
        onDelete,
        getRoomCabinetsData,
    }

    return (
        <FillerToeContext.Provider value={value}>
            {props.children}
        </FillerToeContext.Provider>
    )
}
