import { call, put, takeEvery } from 'typed-redux-saga'
import {
    createPanelFailure,
    createPanelSuccess,
    getRoomPanelsFailure,
    getRoomPanelsSuccess,
    getSetupPanelsFailure,
    getSetupPanelsSuccess,
} from '../../actions/panels'
import { ActionTypes } from '../../actions/types'
import * as panelSvc from '../../api/panels'
import { serializeResponse } from '../../utilities/utils'

function* getSetupPanelsWorker(action: { query: string }) {
    try {
        const panels = yield* call(panelSvc.getSetupPanels, action.query)

        yield* put(getSetupPanelsSuccess(serializeResponse(panels)))
    } catch (error) {
        yield* put(getSetupPanelsFailure(error))
    }
}

function* getSetupPanelsWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.GET_SETUP_PANELS_REQUEST, getSetupPanelsWorker)
}

function* getRoomPanelsWorker(action: { roomId: any; query: string }) {
    try {
        const panels = yield* call(
            panelSvc.getRoomPanels,
            action.roomId,
            action.query
        )

        yield* put(getRoomPanelsSuccess(serializeResponse(panels)))
    } catch (error) {
        yield* put(getRoomPanelsFailure(error))
    }
}

function* getRoomPanelsWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.GET_ROOM_PANELS_REQUEST, getRoomPanelsWorker)
}

function* createPanelWorker(action: { payload: any }) {
    try {
        const panel = yield* call(panelSvc.createPanel, action.payload)

        yield* put(createPanelSuccess(panel))
    } catch (error) {
        yield* put(createPanelFailure(error))
    }
}

function* createPanelWatcher() {
    // @ts-expect-error TS(2769): No overload matches this call.
    yield* takeEvery(ActionTypes.CREATE_PANEL_REQUEST, createPanelWorker)
}

export { getSetupPanelsWatcher, getRoomPanelsWatcher, createPanelWatcher }
