import { call, put, takeEvery } from 'typed-redux-saga'

import {
    createDeliveryFailure,
    createDeliverySuccess,
    getOneDeliveryFailure,
    getOneDeliverySuccess,
    updateDeliveryFailure,
    updateDeliverySuccess,
} from '../../actions/delivery'
import { sendNotificationRequest } from '../../actions/notification'
import { ActionTypes } from '../../actions/types'
import * as deliverySvc from '../../api/delivery'

function* createDeliveryWorker(action: { payload: { id: any } }) {
    try {
        //@ts-ignore
        const delivery = yield* call(deliverySvc.createDelivery, action.payload)

        if (!action.payload.id)
            yield* put(createDeliverySuccess(delivery as any))

        yield* put(
            sendNotificationRequest({
                message: 'Updates Delivery.',
                type: 'success',
            })
        )
    } catch (error) {
        yield* put(
            sendNotificationRequest({
                message: 'Failed to update Delivery.',
                type: 'error',
            })
        )
        yield* put(createDeliveryFailure(error))
    }
}

function* createDeliveryWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.CREATE_DELIVERY_REQUEST, createDeliveryWorker)
}

function* updateDeliveryWorker(action: { deliveryId: any; payload: any }) {
    try {
        yield* call(
            deliverySvc.updateDelivery,
            action.deliveryId,
            action.payload
        )

        yield* put(updateDeliverySuccess(action.payload))

        yield* put(
            sendNotificationRequest({
                message: 'Updates Delivery.',
                type: 'success',
            })
        )
    } catch (error) {
        yield* put(
            sendNotificationRequest({
                message: 'Failed to update Delivery.',
                type: 'error',
            })
        )
        yield* put(updateDeliveryFailure(error))
    }
}

function* updateDeliveryWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.UPDATE_DELIVERY_REQUEST, updateDeliveryWorker)
}

function* getOneDeliveryWorker(action: { entity: any; entityId: any }) {
    try {
        const delivery = yield* call(
            deliverySvc.getDeliveryByEntity,
            action.entity,
            action.entityId
        )

        yield* put(getOneDeliverySuccess(delivery))
    } catch (error) {
        yield* put(getOneDeliveryFailure(error))
    }
}

function* getOneDeliveryWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.GET_ONE_DELIVERY_REQUEST, getOneDeliveryWorker)
}

export { createDeliveryWatcher, getOneDeliveryWatcher, updateDeliveryWatcher }
