import { call, put, takeLatest } from 'typed-redux-saga'
import {
    createCabinetSpecificationFailure,
    createCabinetSpecificationSuccess,
    getOneCabinetSpecificationFailure,
    getOneCabinetSpecificationSuccess,
    updateCabinetSpecificationFailure,
    updateCabinetSpecificationSuccess,
} from '../../actions/cabinets'
import { sendNotificationRequest } from '../../actions/notification'
import { ActionTypes } from '../../actions/types'
import * as cabinetSvc from '../../api/cabinets'

function* getCabinetSpecificationWorker(action: { id: any }) {
    try {
        const specification = yield* call(
            cabinetSvc.getCabinetSpecification,
            action.id
        )

        yield* put(getOneCabinetSpecificationSuccess(specification))
    } catch (error) {
        yield* put(getOneCabinetSpecificationFailure(error))
    }
}

function* getCabinetSpecificationWatcher() {
    yield* takeLatest(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_ONE_CABINET_SPECIFICATION_REQUEST,
        getCabinetSpecificationWorker
    )
}

function* updateCabinetSpecificationWorker(action: { id: any; payload: any }) {
    try {
        yield* call(
            cabinetSvc.updateCabinetSpecification,
            action.id,
            action.payload
        )

        yield* put(updateCabinetSpecificationSuccess(action.payload))
        yield* put(
            sendNotificationRequest({ type: 'success', message: 'Success.' })
        )
    } catch (error) {
        yield* put(updateCabinetSpecificationFailure(error))
    }
}

function* updateCabinetSpecificationWatcher() {
    yield* takeLatest(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.UPDATE_CABINET_SPECIFICATION_REQUEST,
        updateCabinetSpecificationWorker
    )
}

function* createCabinetSpecificationWorker(action: { payload: any }) {
    try {
        const specification = yield* call(
            cabinetSvc.createCabinetSpecification,
            action.payload
        )

        yield* put(createCabinetSpecificationSuccess(specification))
    } catch (error) {
        yield* put(createCabinetSpecificationFailure(error))
    }
}

function* createCabinetSpecificationWatcher() {
    yield* takeLatest(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.CREATE_CABINET_SPECIFICATION_REQUEST,
        createCabinetSpecificationWorker
    )
}

export {
    getCabinetSpecificationWatcher,
    updateCabinetSpecificationWatcher,
    createCabinetSpecificationWatcher,
}
