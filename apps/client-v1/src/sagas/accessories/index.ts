import { call, put, takeEvery } from 'typed-redux-saga'

import {
    createRoomAccessoryFailure,
    createRoomAccessorySuccess,
    getAccessoriesFailure,
    getAccessoriesSuccess,
    getDefaultAccessoriesFailure,
    getDefaultAccessoriesSuccess,
    getRoomAccessoriesFailure,
    getRoomAccessoriesSuccess,
} from '../../actions/accessories'
import { ActionTypes } from '../../actions/types'
import * as accessSvc from '../../api/accessories'
import { serializeResponse } from '../../utilities/utils'

function* getAccessoriesWorker() {
    try {
        const accessories = yield* call(accessSvc.getDefaultAccessories)

        yield* put(getAccessoriesSuccess(serializeResponse(accessories)))
    } catch (error) {
        yield* put(getAccessoriesFailure(error))
    }
}

function* getAccessoriesWatcher() {
    yield* takeEvery(ActionTypes.GET_ACCESSORIES_REQUEST, getAccessoriesWorker)
}

function* getDefaultAccessoriesWorker(action: { query: string; key: any }) {
    try {
        const accessories = yield* call(
            accessSvc.getDefaultAccessories,
            action.query
        )

        yield* put(getDefaultAccessoriesSuccess(serializeResponse(accessories)))
    } catch (error) {
        yield* put(getDefaultAccessoriesFailure(error))
    }
}

function* getDefaultAccessoriesWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_DEFAULT_ACCESSORIES_REQUEST,
        getDefaultAccessoriesWorker
    )
}

function* getRoomAccessoriesWorker(action: { roomId: any; query: string }) {
    try {
        const accessories = yield* call(
            accessSvc.getRoomAccessories,
            action.roomId,
            action.query
        )

        yield* put(getRoomAccessoriesSuccess(serializeResponse(accessories)))
    } catch (error) {
        yield* put(getRoomAccessoriesFailure(error))
    }
}

function* getRoomAccessoriesWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_ROOM_ACCESSORIES_REQUEST,
        getRoomAccessoriesWorker
    )
}

function* createRoomAccessoryWorker(action: { payload: any }) {
    try {
        const accessory = yield* call(
            accessSvc.createRoomAccessory,
            action.payload
        )

        yield* put(createRoomAccessorySuccess(accessory))
    } catch (error) {
        yield* put(createRoomAccessoryFailure(error))
    }
}

function* createRoomAccessoryWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.CREATE_ROOM_ACCESSORY_REQUEST,
        createRoomAccessoryWorker
    )
}

export {
    getAccessoriesWatcher,
    getRoomAccessoriesWatcher,
    getDefaultAccessoriesWatcher,
    createRoomAccessoryWatcher,
}
