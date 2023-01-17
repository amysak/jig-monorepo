import { call, put, takeEvery } from 'typed-redux-saga'
import {
    createHardwareSuccess,
    getDefaultHardwaresFailure,
    getDefaultHardwaresSuccess,
    getOneHardwareFailure,
    getOneHardwareSuccess,
    getSetupHardwaresFailure,
    getSetupHardwaresSuccess,
    updateHardwareFailure,
    updateHardwareSuccess,
} from '../../actions/hardwares'
import { sendNotificationRequest } from '../../actions/notification'
import { updateRoomSuccess } from '../../actions/rooms'
import { ActionTypes } from '../../actions/types'
import * as hardwareSvc from '../../api/hardwares'
import { serializeResponse } from '../../utilities/utils'

function* getDefaultHardwaressWorker(action: { query: string }) {
    try {
        const hardwares = yield* call(
            hardwareSvc.getDefaultHardwares,
            action.query
        )

        yield* put(getDefaultHardwaresSuccess(serializeResponse(hardwares)))
    } catch (error) {
        yield* put(getDefaultHardwaresFailure(error))
    }
}

function* getDefaultHardwaressWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_DEFAULT_HARDWARES_REQUEST,
        getDefaultHardwaressWorker
    )
}

function* getOneHardwareWorker(action: { hardwareId: any }) {
    try {
        const hardware = yield* call(
            hardwareSvc.getOneHardware,
            action.hardwareId
        )

        yield* put(getOneHardwareSuccess(hardware))
    } catch (error) {
        yield* put(getOneHardwareFailure(error))
    }
}

function* getOneHardwareWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.GET_ONE_HARDWARE_REQUEST, getOneHardwareWorker)
}

function* createHardwareWorker(action: { payload: any }) {
    try {
        const hardware = yield* call(hardwareSvc.createHardware, action.payload)

        yield* put(createHardwareSuccess(hardware))
        yield* put(updateRoomSuccess({ accessory: hardware }))
    } catch (error) {
        yield* put(getOneHardwareFailure(error))
    }
}

function* createHardwareWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.CREATE_HARDWARE_REQUEST, createHardwareWorker)
}

function* updateHardwareWorker(action: { hardwareId: any; payload: any }) {
    try {
        yield* call(
            hardwareSvc.updateHardware,
            action.hardwareId,
            action.payload
        )

        yield* put(updateHardwareSuccess(action.payload))
        yield* put(
            sendNotificationRequest({
                message: 'Successfully updates Hardware.',
                type: 'success',
            })
        )
    } catch (error) {
        yield* put(updateHardwareFailure(error))
        yield* put(
            sendNotificationRequest({
                message: 'Failed to update Hardware.',
                type: 'error',
            })
        )
    }
}

function* updateHardwareWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.UPDATE_HARDWARE_REQUEST, updateHardwareWorker)
}

function* getSetupHardwareWorker(action: { query: string; key: any }) {
    try {
        const hardwares = yield* call(
            hardwareSvc.getSetupHardware,
            action.query
        )

        yield* put(
            getSetupHardwaresSuccess(serializeResponse(hardwares), action.key)
        )
    } catch (error) {
        yield* put(getSetupHardwaresFailure(error))
    }
}

function* getSetupHardwareWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_SETUP_HARDWARES_REQUEST,
        getSetupHardwareWorker
    )
}

export {
    getDefaultHardwaressWatcher,
    createHardwareWatcher,
    getOneHardwareWatcher,
    updateHardwareWatcher,
    getSetupHardwareWatcher,
}
