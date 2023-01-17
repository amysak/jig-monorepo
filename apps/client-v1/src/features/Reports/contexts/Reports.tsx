import React, { Context, createContext, useReducer } from 'react'

const initialState = {
    job: null,
}

enum Actions {
    GET_JOBS = 'GET_JOBS',
}

type ActionType = { type: Actions.GET_JOBS; payload: number }

const reducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case Actions.GET_JOBS:
            return { ...state, job: action.payload }

        default:
            return state
    }
}

type IReportsContext = typeof initialState & {
    onGetOneJob: (jobId: any) => Promise<void>
}

export const ReportsContext = createContext(
    initialState
) as Context<IReportsContext>

export const JobContextProvider = (props: { children: any }) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const [state, dispatch] = useReducer(reducer, initialState)

    const onGetOneJob = async () => {
        try {
            // const job = await jobSvc.getJob(jobId)
            // dispatch({
            //     type: actions.GET_JOB,
            //     job,
            // })
        } catch (error) {
            throw new Error(error)
        }
    }

    const value = {
        ...state,
        onGetOneJob,
    }

    return (
        <ReportsContext.Provider value={value}>
            {props.children}
        </ReportsContext.Provider>
    ) as JSX.Element
}
