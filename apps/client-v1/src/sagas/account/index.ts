import { call, put, takeLatest } from 'typed-redux-saga'

import { ActionTypes } from '../../actions/types'
import * as accountSvc from '../../api/account'

import {
    getAccountPreferenceFailure,
    getAccountPreferenceSuccess,
    getAccountUsersSuccess,
    getCompanyFailure,
    getCompanySuccess,
    updateAccountFailure,
    updateAccountPreferenceFailure,
    updateAccountPreferenceSuccess,
    updateAccountSuccess,
} from '../../actions/account'

import { sendNotificationRequest } from '../../actions/notification'
import { userSignoutRequest } from '../../actions/user'
import { serializeResponse } from '../../utilities/utils'

function* getCompanyWorker(action: { accountId: any }) {
    try {
        //@ts-ignore
        const company = yield* call(accountSvc.getCompany, action.accountId)

        yield* put(getCompanySuccess(company))
    } catch (error) {
        yield* put(userSignoutRequest())
        yield* put(getCompanyFailure(error))
    }
}

function* getCompanyWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeLatest(ActionTypes.GET_COMPANY_REQUEST, getCompanyWorker)
}

function* updateAccountWorker(action: { payload: any }) {
    try {
        const account = yield* call(accountSvc.updateAccount, action.payload)

        yield* put(updateAccountSuccess(account))
        yield* put(
            sendNotificationRequest({
                message: 'Account updated.',
                type: 'success',
            })
        )
    } catch (error) {
        yield* put(
            sendNotificationRequest({
                message: 'Account update failed.',
                type: 'error',
            })
        )
        yield* put(updateAccountFailure(error))
    }
}

function* updateAccountWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeLatest(ActionTypes.UPDATE_ACCOUNT_REQUEST, updateAccountWorker)
}

function* getAccountUsersWorker() {
    try {
        const users = yield* call(accountSvc.getAccountUsers)

        yield* put(getAccountUsersSuccess(serializeResponse(users)))
    } catch (error) {}
}

function* getAccountUsersWatcher() {
    yield* takeLatest(
        ActionTypes.GET_ACCOUNT_USERS_REQUEST,
        getAccountUsersWorker
    )
}

function* getAccountPreferenceWorker() {
    try {
        const preference = yield* call(accountSvc.getAccountPreference)

        yield* put(getAccountPreferenceSuccess(preference))
    } catch (error) {
        yield* put(getAccountPreferenceFailure(error))
    }
}

function* getAccountPreferenceWatcher() {
    yield* takeLatest(
        ActionTypes.GET_ACCOUNT_PREFERENCES_REQUEST,
        getAccountPreferenceWorker
    )
}

function* updateAccountPreferenceWorker(action: { payload: any }) {
    try {
        yield* call(accountSvc.updateAccountPreference, action.payload)

        yield* put(updateAccountPreferenceSuccess(action.payload))
        yield* put(
            sendNotificationRequest({
                type: 'success',
                message: 'Successfully updates Account Preference.',
            })
        )
    } catch (error) {
        yield* put(
            sendNotificationRequest({
                type: 'error',
                message: 'Failed to update Account Preference.',
            })
        )
        yield* put(updateAccountPreferenceFailure(error))
    }
}

function* updateAccountPreferenceWatcher() {
    yield* takeLatest(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.UPDATE_ACCOUNT_PREFERENCE_REQUEST,
        updateAccountPreferenceWorker
    )
}

export {
    getCompanyWatcher,
    updateAccountWatcher,
    getAccountUsersWatcher,
    getAccountPreferenceWatcher,
    updateAccountPreferenceWatcher,
}
