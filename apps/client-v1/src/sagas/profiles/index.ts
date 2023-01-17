import {
    getProfileEdgesFailure,
    getProfileEdgesSuccess,
    getProfileFramesFailure,
    getProfileFramesSuccess,
    getProfilePanelsFailure,
    getProfilePanelsSuccess,
} from '../../actions/profiles'
import { ActionTypes } from '../../actions/types'
import * as profileSvc from '../../api/profiles'
import { serializeResponse } from '../../utilities/utils'

import { call, put, takeEvery } from 'typed-redux-saga'

function* getProfilePanelsWorker() {
    try {
        const panels = yield* call(profileSvc.getProfilePanels)

        yield* put(getProfilePanelsSuccess(serializeResponse(panels)))
    } catch (error) {
        yield* put(getProfilePanelsFailure(error))
    }
}

function* getProfilePanelsWatcher() {
    yield* takeEvery(
        ActionTypes.GET_PROFILE_PANELS_REQUEST,
        getProfilePanelsWorker
    )
}

function* getProfileEdgesWorker() {
    try {
        const edges = yield* call(profileSvc.getProfileEdges)

        yield* put(getProfileEdgesSuccess(serializeResponse(edges)))
    } catch (error) {
        yield* put(getProfileEdgesFailure(error))
    }
}

function* getProfileEdgesWatcher() {
    yield* takeEvery(
        ActionTypes.GET_PROFILE_EDGES_REQUEST,
        getProfileEdgesWorker
    )
}

function* getProfileFramesWorker() {
    try {
        const frames = yield* call(profileSvc.getProfileFrames)

        yield* put(getProfileFramesSuccess(serializeResponse(frames)))
    } catch (error) {
        yield* put(getProfileFramesFailure(error))
    }
}

function* getProfileFramesWatcher() {
    yield* takeEvery(
        ActionTypes.GET_PROFILE_FRAMES_REQUEST,
        getProfileFramesWorker
    )
}

export {
    getProfilePanelsWatcher,
    getProfileEdgesWatcher,
    getProfileFramesWatcher,
}
