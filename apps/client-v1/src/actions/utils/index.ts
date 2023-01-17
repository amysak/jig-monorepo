import isUndefined from 'lodash/isUndefined'
import { store } from '../../store'
import { sendNotificationRequest } from '../notification'

function onChangeDispatcher(actionCreator: (arg0: any) => any, ...rest: any[]) {
    const payload = rest[rest.length - 1]
    const key = Object.keys(payload)[0]

    // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
    if (!isUndefined(payload[key])) store.dispatch(actionCreator(...rest))
}

function dispatchFormError(notice: { message: string; type: string }) {
    store.dispatch(sendNotificationRequest(notice))
}

export async function onJsonChangeDispatch(
    form: { validateFields: () => any },

    actionCreator,

    dispatchKey,

    errorNotice,

    extra
) {
    try {
        const result = await form.validateFields()

        if (extra)
            onChangeDispatcher(actionCreator, extra, { [dispatchKey]: result })
        else onChangeDispatcher(actionCreator, { [dispatchKey]: result })
    } catch (result) {
        if (result.errorFields.length >= 1) dispatchFormError(errorNotice)
        else console.log('Unaccounted form behaviour')
    }
}
