import { call, put, takeEvery } from 'typed-redux-saga'

import {
    getDefaultLettersFailure,
    getDefaultLettersSuccess,
    getOneLetterFailure,
    getOneLetterSuccess,
    updateLetterFailure,
} from '../../actions/letters'
import { sendNotificationRequest } from '../../actions/notification'
import { ActionTypes } from '../../actions/types'
import * as letterSvc from '../../api/letters'
import { serializeResponse } from '../../utilities/utils'

function* getDefaultLettersWorker(action: { query: string }) {
    try {
        const letters = yield* call(letterSvc.getDefaultLetters, action.query)

        yield* put(getDefaultLettersSuccess(serializeResponse(letters)))
    } catch (error) {
        yield* put(getDefaultLettersFailure(error))
    }
}

function* getDefaultLettersWatcher() {
    yield* takeEvery(
        // @ts-expect-error TS(2769): No overload matches this call.
        ActionTypes.GET_DEFAULT_LETTERS_REQUEST,
        getDefaultLettersWorker
    )
}

function* getOneLetterWorker(action: { letterId: any }) {
    try {
        const letter = yield* call(letterSvc.getOneLetter, action.letterId)

        yield* put(getOneLetterSuccess(letter))
    } catch (error) {
        yield* put(getOneLetterFailure(error))
    }
}

function* getOneLetterWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.GET_ONE_LETTER_REQUEST, getOneLetterWorker)
}

function* updateLetterWorker(action: { letterId: any; payload: any }) {
    try {
        yield* call(letterSvc.updateLetter, action.letterId, action.payload)

        yield* put(
            sendNotificationRequest({
                type: 'success',
                message: 'Successfully updates.',
            })
        )
    } catch (error) {
        yield* put(
            sendNotificationRequest({
                type: 'error',
                message: 'Update failed.',
            })
        )
        yield* put(updateLetterFailure(error))
    }
}

function* updateLetterWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.UPDATE_LETTER_REQUEST, updateLetterWorker)
}

export { getDefaultLettersWatcher, getOneLetterWatcher, updateLetterWatcher }
