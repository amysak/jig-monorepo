import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getOneRoomRequest } from '../../actions/rooms'
import RoomTabs from '../../components/molecules/roomtabs'
import UILayout from '../../components/templates/uilayout'
import { store } from '../../store'
import RoomPageToolbar from './roomtoolbar'

function RoomPage() {
    const params = useParams<{ id?: string }>()

    useEffect(() => {
        if (params.id) store.dispatch(getOneRoomRequest(params.id))
    }, [])

    return (
        <UILayout ToolbarContent={<RoomPageToolbar />}>
            <RoomTabs />
        </UILayout>
    )
}

export default RoomPage
