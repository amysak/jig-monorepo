import { call, put, takeEvery, takeLatest } from 'typed-redux-saga'
import { sendNotificationRequest } from '../../actions/notification'
import {
    createTaxFailure,
    createTaxSuccess,
    getOneTaxFailure,
    getOneTaxSuccess,
    updateTaxFailure,
    updateTaxSuccess,
} from '../../actions/taxes'
import { ActionTypes } from '../../actions/types'
import * as taxSvc from '../../api/taxes'

function* createTaxWorker(action: { payload: any }) {
    try {
        const tax = yield* call(taxSvc.createTax, action.payload)

        yield* put(createTaxSuccess(tax))
        yield* put(
            sendNotificationRequest({
                message: 'Updated Tax.',
                type: 'success',
            })
        )
    } catch (error) {
        yield* put(
            sendNotificationRequest({
                message: 'Failed to update Tax.',
                type: 'error',
            })
        )
        yield* put(createTaxFailure(error))
    }
}

function* createTaxWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.CREATE_TAX_REQUEST, createTaxWorker)
}

function* updateTaxWorker(action: { taxId: any; payload: any }) {
    try {
        yield* call(taxSvc.updateTax, action.taxId, action.payload)

        yield* put(updateTaxSuccess(action.payload))
        yield* put(
            sendNotificationRequest({
                message: 'Updated Tax.',
                type: 'success',
            })
        )
    } catch (error) {
        yield* put(
            sendNotificationRequest({
                message: 'Failed to update Tax.',
                type: 'error',
            })
        )
        yield* put(updateTaxFailure(error))
    }
}

function* updateTaxWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.UPDATE_TAX_REQUEST, updateTaxWorker)
}

function* getOneTaxWorker(action: { entity: any; entityId: any }) {
    try {
        const term = yield* call(
            taxSvc.getTaxByEntity,
            action.entity,
            action.entityId
        )

        yield* put(getOneTaxSuccess(term))
    } catch (error) {
        yield* put(getOneTaxFailure(error))
    }
}

function* getOneTaxWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeLatest(ActionTypes.GET_ONE_TAX_REQUEST, getOneTaxWorker)
}

export { createTaxWatcher, getOneTaxWatcher, updateTaxWatcher }
