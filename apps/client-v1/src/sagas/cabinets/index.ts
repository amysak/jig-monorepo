import { Cabinet } from 'entities'
import { call, put, takeEvery, takeLatest } from 'typed-redux-saga'
import {
    createCabinetFailure,
    createCabinetSuccess,
    getCabinetsByRoomFailure,
    getCabinetsByRoomSuccess,
    getOneCabinetByIdFailure,
    getOneCabinetByIdSuccess,
    getOneCabinetFailure,
    getOneCabinetSuccess,
    getSetupCabinetsFailure,
    getSetupCabinetsSuccess,
    updateCabinetFailure,
    updateCabinetSuccess,
} from '../../actions/cabinets'
import { sendNotificationRequest } from '../../actions/notification'
import { ActionTypes } from '../../actions/types'
import * as cabinetSvc from '../../api/cabinets'
import { serializeResponse } from '../../utilities/utils'

function* getOneCabinetWorker(action: { entity: any; entityId: any }) {
    try {
        const cabinet: [Cabinet[], number] = yield* call(
            cabinetSvc.getCabinetByEntity,
            action.entity,
            action.entityId
        )

        yield* put(getOneCabinetSuccess(cabinet))
    } catch (error) {
        yield* put(getOneCabinetFailure(error))
    }
}

function* getOneCabinetWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.GET_ONE_CABINET_REQUEST, getOneCabinetWorker)
}

function* createCabinetWorker(action: { payload: any }) {
    try {
        const cabinet = yield* call(cabinetSvc.createCabinet, action.payload)

        yield* put(createCabinetSuccess(cabinet))

        yield* put(
            sendNotificationRequest({
                message: 'Updated Cabinet.',
                type: 'success',
            })
        )
    } catch (error) {
        yield* put(createCabinetFailure(error))
        yield* put(
            sendNotificationRequest({
                message: 'Failed to updated Cabinet.',
                type: 'error',
            })
        )
    }
}

function* createCabinetWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.CREATE_CABINET_REQUEST, createCabinetWorker)
}

function* getDefaultCabinetsWorker(action: { query: string }) {
    try {
        const cabinets = yield* call(cabinetSvc.getSetupCabinets, action.query)

        yield* put(getSetupCabinetsSuccess(serializeResponse(cabinets)))
    } catch (error) {
        yield* put(getSetupCabinetsFailure(error))
    }
}

function* getSetupCabinetsWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_SETUP_CABINETS_REQUEST,
        getDefaultCabinetsWorker
    )
}

function* getCabinetsByRoomWorker(action: { roomId: any; query: string }) {
    try {
        const cabinets = yield* call(
            cabinetSvc.getCabinetByRoom,
            action.roomId,
            action.query
        )

        yield* put(getCabinetsByRoomSuccess(serializeResponse(cabinets)))
    } catch (error) {
        yield* put(getCabinetsByRoomFailure(error))
    }
}

function* getCabinetsByRoomWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.GET_CABINETS_REQUEST, getCabinetsByRoomWorker)
}

function* getOneCabinetByIdWorker(action: { id: string }) {
    try {
        const cabinet = yield* call(cabinetSvc.getOneCabinet, action.id)

        yield* put(getOneCabinetByIdSuccess(cabinet))
    } catch (error) {
        yield* put(getOneCabinetByIdFailure(error))
    }
}

function* getOneCabinetByIdWatcher() {
    yield* takeLatest(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_ONE_CABINET_BY_ID_REQUEST,
        getOneCabinetByIdWorker
    )
}

function* updateCabinetWorker(action: { id: any; payload: any }) {
    try {
        yield* call(cabinetSvc.updateCabinet, action.id, action.payload)

        yield* put(updateCabinetSuccess(action.payload))
        yield* put(
            sendNotificationRequest({
                type: 'success',
                message: 'Successfully updates Cabinet.',
            })
        )
    } catch (error) {
        yield* put(updateCabinetFailure(error))
        yield* put(
            sendNotificationRequest({
                type: 'error',
                message: 'Failed to update Cabinet.',
            })
        )
    }
}

function* updateCabinetWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeLatest(ActionTypes.UPDATE_CABINET_REQUEST, updateCabinetWorker)
}

export {
    getOneCabinetWatcher,
    createCabinetWatcher,
    getSetupCabinetsWatcher,
    getCabinetsByRoomWatcher,
    getOneCabinetByIdWatcher,
    updateCabinetWatcher,
}
