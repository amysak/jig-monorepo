import { call, put, takeEvery } from 'typed-redux-saga'
import { sendNotificationRequest } from '../../actions/notification'
import * as trimsSvc from '../../api/trims'

import {
    createTrimMoldingFailure,
    createTrimMoldingSuccess,
    getDefaultTrimsFailure,
    getDefaultTrimsSuccess,
    getOneTrimMoldingFailure,
    getOneTrimMoldingSuccess,
    getRoomTrimMoldingsFailure,
    getRoomTrimMoldingsSuccess,
    getTrimMoldingClassificationFailure,
    getTrimMoldingClassificationSuccess,
    getTrimMoldingSubclassificationFailure,
    getTrimMoldingSubclassificationSuccess,
    getTrimsFailure,
    getTrimsSuccess,
    updateTrimMoldingFailure,
    updateTrimMoldingSuccess,
} from '../../actions/trims'

import { serializeResponse } from '../../utilities/utils'

import { ActionTypes } from '../../actions/types'

function* getTrimsWorker(action: {
    query: string | Parameters<any> | Parameters<any>
}) {
    try {
        const trims = yield* call(trimsSvc.getTrims, action.query)

        yield* put(getTrimsSuccess(serializeResponse(trims)))
    } catch (error) {
        yield* put(getTrimsFailure(error))
    }
}

function* getTrimsWatcher() {
    //@ts-ignore
    yield* takeEvery(ActionTypes.GET_TRIMS_REQUEST, getTrimsWorker)
}

function* getDefaultTrimsWorker(action: {
    query: string | Parameters<any> | Parameters<any>
}) {
    try {
        const trims = yield* call(trimsSvc.getDefaultTrims, action.query)

        yield* put(getDefaultTrimsSuccess(serializeResponse(trims)))
    } catch (error) {
        yield* put(getDefaultTrimsFailure(error))
    }
}

function* getDefaultTrimsWatcher() {
    yield* takeEvery(
        //@ts-ignore
        ActionTypes.GET_DEFAULT_TRIMS_REQUEST,
        getDefaultTrimsWorker
    )
}

function* getOneTrimMoldingWorker(action: { trimMoldingId: any }) {
    try {
        const trimMolding = yield* call(
            trimsSvc.getOneTrimMolding,
            action.trimMoldingId
        )

        yield* put(getOneTrimMoldingSuccess(trimMolding))
    } catch (error) {
        yield* put(getOneTrimMoldingFailure(error))
    }
}

function* getOneTrimMoldingWatcher() {
    yield* takeEvery(
        //@ts-ignore
        ActionTypes.GET_ONE_TRIM_MOLDING_REQUEST,
        getOneTrimMoldingWorker
    )
}

function* getTrimMoldingClassificationWorker() {
    try {
        const classifications = yield* call(
            trimsSvc.getTrimMoldingClassifications
        )

        yield* put(getTrimMoldingClassificationSuccess(classifications))
    } catch (error) {
        yield* put(getTrimMoldingClassificationFailure(error))
    }
}

function* getTrimMoldingClassificationWatcher() {
    yield* takeEvery(
        ActionTypes.GET_TRIM_MOLDING_CLASSIFICATIONS_REQUEST,
        getTrimMoldingClassificationWorker
    )
}

function* getTrimMoldingSubclassificationWorker() {
    try {
        const subclassifications = yield* call(
            // @ts-expect-error TS(2769): No overload matches this call.
            trimsSvc.getTrimMoldingSublassifications
        )

        yield* put(getTrimMoldingSubclassificationSuccess(subclassifications))
    } catch (error) {
        yield* put(getTrimMoldingSubclassificationFailure(error))
    }
}

function* getTrimMoldingSubclassificationWatcher() {
    yield* takeEvery(
        ActionTypes.GET_TRIM_MOLDING_SUBCLASSIFICATIONS_REQUEST,
        getTrimMoldingSubclassificationWorker
    )
}

function* updateTrimMoldingWorker(action: {
    trimMoldingId: any
    payload: any
}) {
    try {
        yield* call(
            trimsSvc.updateTrimMolding,
            action.trimMoldingId,
            action.payload
        )

        yield* put(updateTrimMoldingSuccess(action.payload))
        yield* put(
            sendNotificationRequest({
                type: 'success',
                message: 'Updated successfully.',
            })
        )
    } catch (error) {
        yield* put(updateTrimMoldingFailure(error))
        yield* put(
            sendNotificationRequest({
                type: 'failed',
                message: 'Failed to update.',
            })
        )
    }
}

function* updateTrimMoldingWatcher() {
    yield* takeEvery(
        //@ts-ignore
        ActionTypes.UPDATE_TRIM_MOLDING_REQUEST,
        updateTrimMoldingWorker
    )
}

function* createTrimMoldingWorker(action: { payload: any }) {
    try {
        const trimMolding = yield* call(
            trimsSvc.createTrimMolding,
            action.payload
        )

        yield* put(createTrimMoldingSuccess(trimMolding))
    } catch (error) {
        yield* put(createTrimMoldingFailure(error))
        yield* put(
            sendNotificationRequest({
                type: 'failed',
                message: 'Failed to update.',
            })
        )
    }
}

function* createTrimMoldingWatcher() {
    yield* takeEvery(
        //@ts-ignore
        ActionTypes.CREATE_TRIM_MOLDING_REQUEST,
        createTrimMoldingWorker
    )
}

function* getRoomTrimMoldingsWorker(action: { roomId: any; query: any }) {
    try {
        const trimMoldings = yield* call(
            trimsSvc.getRoomTrimsMolding,
            action.roomId,
            action.query
        )

        yield* put(getRoomTrimMoldingsSuccess(serializeResponse(trimMoldings)))
    } catch (error) {
        yield* put(getRoomTrimMoldingsFailure(error))
    }
}

function* getRoomTrimMoldingsWatcher() {
    yield* takeEvery(
        //@ts-ignore
        ActionTypes.GET_ROOM_TRIM_MOLDINGS_REQUEST,
        getRoomTrimMoldingsWorker
    )
}

export {
    getTrimsWatcher,
    getDefaultTrimsWatcher,
    updateTrimMoldingWatcher,
    getOneTrimMoldingWatcher,
    getTrimMoldingClassificationWatcher,
    getTrimMoldingSubclassificationWatcher,
    createTrimMoldingWatcher,
    getRoomTrimMoldingsWatcher,
}
