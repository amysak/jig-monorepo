import { call, put, takeEvery } from 'typed-redux-saga'
import {
    createRoomMaterialFailure,
    getDefaultMaterialsFailure,
    getDefaultMaterialsNamesFailure,
    getDefaultMaterialsNamesSuccess,
    getDefaultMaterialsSuccess,
    getOneMaterialFailure,
    getOneMaterialSuccess,
    getRoomMaterialFailure,
    getRoomMaterialSuccess,
    getSetupMaterialsFailure,
    getSetupMaterialsNamesFailure,
    getSetupMaterialsNamesSuccess,
    getSetupMaterialsSuccess,
    updateDefaultMaterialFailure,
    updateDefaultMaterialSuccess,
} from '../../actions/materials'
import { sendNotificationRequest } from '../../actions/notification'
import { ActionTypes } from '../../actions/types'
import * as materialTypesSvc from '../../api/material-types'
import * as materialSvc from '../../api/materials'
import { serializeResponse } from '../../utilities/utils'

function* getDefaultMaterialsWorker(action: { query: string }) {
    try {
        const materials = yield* call(
            materialSvc.getDefaultMaterials,
            action.query
        )

        yield* put(getDefaultMaterialsSuccess(serializeResponse(materials)))
    } catch (error) {
        yield* put(getDefaultMaterialsFailure(error))
    }
}

function* getDefaultMaterialsWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_DEFAULT_MATERIALS_REQUEST,
        getDefaultMaterialsWorker
    )
}

function* getSetupMaterialsWorker(action: { query: string }) {
    try {
        const materials = yield* call(
            materialSvc.getSetupMaterials,
            action.query
        )

        yield* put(getSetupMaterialsSuccess(serializeResponse(materials)))
    } catch (error) {
        yield* put(getSetupMaterialsFailure(error))
    }
}

function* getSetupMaterialsWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_SETUP_MATERIALS_REQUEST,
        getSetupMaterialsWorker
    )
}

function* getOneMaterialWorker(action: { materialId: any }) {
    try {
        const material = yield* call(
            materialSvc.getOneMaterial,
            action.materialId
        )

        yield* put(getOneMaterialSuccess(material))
    } catch (error) {
        yield* put(getOneMaterialFailure(error))
    }
}

function* getOneMaterialWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.GET_ONE_MATERIAL_REQUEST, getOneMaterialWorker)
}

function* updateMaterialWorker(action: { materialId: any; payload: any }) {
    try {
        yield* call(
            materialSvc.updateMaterial,
            action.materialId,
            action.payload
        )

        yield* put(
            updateDefaultMaterialSuccess({
                id: action.materialId,
                ...action.payload,
            })
        )
        yield* put(
            sendNotificationRequest({
                message: 'Successfully updated Material',
                type: 'success',
            })
        )
    } catch (error) {
        yield* put(updateDefaultMaterialFailure(error))
        yield* put(
            sendNotificationRequest({
                message: 'Failed to update Material.',
                type: 'error',
            })
        )
    }
}

function* updateMaterialWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.UPDATE_DEFAULT_MATERIAL_REQUEST,
        updateMaterialWorker
    )
}

function* getDefaultMaterialNamesWorker() {
    try {
        const defaultMaterialNames = yield* call(
            materialSvc.getDefaultMaterialsNames
        )

        yield* put(
            getDefaultMaterialsNamesSuccess(
                serializeResponse(defaultMaterialNames)
            )
        )
    } catch (error) {
        yield* put(getDefaultMaterialsNamesFailure(error))
    }
}

function* getDefaultMaterialNamesWatcher() {
    yield* takeEvery(
        ActionTypes.GET_DEFAULT_MATERIALS_NAMES_REQUEST,
        getDefaultMaterialNamesWorker
    )
}

function* getSetupMaterialNamesWorker(action: { query: string; key: any }) {
    try {
        const setupMaterialNames = yield* call(
            materialTypesSvc.getMaterialTypes,
            action.query
        )

        yield* put(
            getSetupMaterialsNamesSuccess(
                serializeResponse(setupMaterialNames),
                action.key
            )
        )
    } catch (error) {
        yield* put(getSetupMaterialsNamesFailure(error))
    }
}

function* getSetupMaterialNamesWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_SETUP_MATERIALS_NAMES_REQUEST,
        getSetupMaterialNamesWorker
    )
}

function* getRoomMaterialWorker(action: { roomId: any }) {
    try {
        const material = yield* call(materialSvc.getRoomMaterial, action.roomId)

        yield* put(getOneMaterialSuccess(material))
        yield* put(getRoomMaterialSuccess(material))
    } catch (error) {
        yield* put(getRoomMaterialFailure(error))
    }
}

function* getRoomMaterialWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_ROOM_MATERIAL_REQUEST,
        getRoomMaterialWorker
    )
}

function* createRoomMaterialWorker(action: { roomId: any; payload: any }) {
    try {
        const material = yield* call(
            materialSvc.createRoomMaterial,
            action.roomId,
            action.payload
        )

        yield* put(getOneMaterialSuccess(material))
        yield* put(getRoomMaterialSuccess(material))
    } catch (error) {
        yield* put(createRoomMaterialFailure(error))
    }
}

function* createRoomMaterialWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.CREATE_ROOM_MATERIAL_REQUEST,
        createRoomMaterialWorker
    )
}

export {
    getDefaultMaterialsWatcher,
    getSetupMaterialsWatcher,
    getOneMaterialWatcher,
    updateMaterialWatcher,
    getDefaultMaterialNamesWatcher,
    getSetupMaterialNamesWatcher,
    getRoomMaterialWatcher,
    createRoomMaterialWatcher,
}
