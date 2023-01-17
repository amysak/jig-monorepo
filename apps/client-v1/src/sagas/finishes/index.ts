import { call, put, takeEvery } from 'typed-redux-saga'

import {
    getSetupFinishesFailure,
    getSetupFinishesSuccess,
    updateSetupFinishesFailure,
    updateSetupFinishesSuccess,
} from '../../actions/finishes'
import { ActionTypes } from '../../actions/types'
import * as finishesSvc from '../../api/finishes'
import { serializeResponse } from '../../utilities/utils'

function* getSetupFinishesWorker(action: { query: string; key: any }) {
    try {
        const finishes = yield* call(finishesSvc.getSetupFinishes, action.query)

        yield* put(
            getSetupFinishesSuccess(serializeResponse(finishes), action.key)
        )
    } catch (error) {
        yield* put(getSetupFinishesFailure(error))
    }
}

function* getSetupFinishesWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_SETUP_FINISHES_REQUEST,
        getSetupFinishesWorker
    )
}

function* updateSetlupFinishWorker(action: { id: any; payload: any }) {
    try {
        yield* call(finishesSvc.updateFinish, action.id, action.payload)

        yield* put(updateSetupFinishesSuccess(action.id, action.payload))
    } catch (error) {
        yield* put(updateSetupFinishesFailure(error))
    }
}

function* updateSetupFinishWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.UPDATE_SETUP_FINISHES_REQUEST,
        updateSetlupFinishWorker
    )
}

export { getSetupFinishesWatcher, updateSetupFinishWatcher }
