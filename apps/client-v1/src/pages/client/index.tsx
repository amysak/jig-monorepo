import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ClientTab from '../../components/molecules/clientstabs'

import NewClientFormPopover from '../../components/molecules/clientlist/NewClientForm'
import { PageHeader } from '../../components/molecules/pageheader'
import UILayout from '../../components/templates/uilayout'
import { ClientsContext } from '../../store/clients'
import { cleanParam } from '../../utilities'

const initial = {
    title: 'Clients',
    path: '/clients',
}

function Client() {
    const params = useParams<{ id?: string; tabName?: string }>()
    const clientCtx = useContext(ClientsContext)

    React.useEffect(() => {
        clientCtx.onGetOneCLient(params.id)
    }, [])

    const parent = {
        label: clientCtx.client?.name ?? '',
        path: `/${clientCtx.client?.id ?? ''}`,
    }

    return (
        <UILayout
            ToolbarContent={
                <PageHeader
                    label={cleanParam(params.tabName ?? '')}
                    initial={initial}
                    parent={parent}
                    component={<NewClientFormPopover />}
                />
            }
        >
            <ClientTab />
        </UILayout>
    )
}

export default Client
