import { message } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'

import { updateClient as _updateClient } from 'api/clients'
import { Option, Select } from 'components/atoms'
import { Client, IActiveInActiveStatuses } from 'entities'
import { ACTIVE_INACTIVE_STATUSES_OPTIONS } from 'utilities/constants'
import { IFetchResponse } from 'utilities/types'
import { shortId } from 'utilities/utils'

interface ITableActions {
    clientId: string
    status: IActiveInActiveStatuses
    onClientUpdate: (clientId: string, payload: Partial<Client>) => void
}

export const TableActions: FC<ITableActions> = ({
    clientId,
    status,
    onClientUpdate,
}) => {
    type TClientsState = IFetchResponse<Partial<Client>>

    const [client, setClient] = useState<TClientsState>({
        data: { status, id: clientId },
        isLoading: false,
        error: undefined,
    })

    const handleClientChange = useCallback(
        (newState: Partial<TClientsState>) =>
            setClient((oldState) => ({ ...oldState, ...newState })),
        []
    )

    useEffect(
        () =>
            handleClientChange({
                data: { status, id: clientId },
            }),
        [clientId, handleClientChange, status]
    )

    const updateClient = useCallback(
        async (
            _clientId: string,
            payload: { status: IActiveInActiveStatuses }
        ) => {
            try {
                handleClientChange({
                    isLoading: true,
                    data: { id: clientId, status: payload.status },
                })
                return await _updateClient(_clientId, payload)
            } catch (error) {
                handleClientChange({
                    error: 'Error',
                    data: { id: clientId, status },
                })
                message.error(`Update client status error`)
                throw new Error('Error')
            } finally {
                handleClientChange({ isLoading: false })
            }
        },
        [clientId, handleClientChange, status]
    )

    const handleSelect = async (value: IActiveInActiveStatuses) => {
        const newStatus = { status: value }
        try {
            await updateClient(clientId, newStatus)
            onClientUpdate(clientId, newStatus)
        } catch (error) {}
    }

    return (
        <Select
            onChange={handleSelect}
            value={client.data?.status}
            style={{ width: '100%' }}
            loading={client.isLoading}
        >
            {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
                <Option key={shortId()} value={status.value}>
                    {status.label}
                </Option>
            ))}
        </Select>
    )
}
