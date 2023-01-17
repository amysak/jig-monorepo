import { call, put, takeEvery } from 'typed-redux-saga'
import {
    getDoorProfilesFailure,
    getDoorProfilesSuccess,
    getDoorsFailure,
    getDoorsSuccess,
} from '../../actions/doors'
import { ActionTypes } from '../../actions/types'
import * as doorSvc from '../../api/doors'
import { serializeResponse } from '../../utilities/utils'

function* getDoorProfilesWorker(action: { query: string }) {
    try {
        const profiles = yield* call(doorSvc.getDoorProfiles, action.query)

        yield* put(getDoorProfilesSuccess(serializeResponse(profiles)))
    } catch (error) {
        yield* put(getDoorProfilesFailure(error))
    }
}

function* getDoorProfilesWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_DOOR_PROFILES_REQUEST,
        getDoorProfilesWorker
    )
}

function* getDoorsWorker(action: { query: string; key: any }) {
    try {
        const doors = yield* call(doorSvc.getDoorsDrawers, action.query)

        yield* put(getDoorsSuccess(serializeResponse(doors), action.key))
    } catch (error) {
        yield* put(getDoorsFailure(error))
    }
}

function* getDoorWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.GET_DOORS_REQUEST, getDoorsWorker)
}

export { getDoorProfilesWatcher, getDoorWatcher }
