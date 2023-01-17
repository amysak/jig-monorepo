import React from 'react'
import { Checkbox } from 'antd'

const panelsPopoverColumns = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
    },
    {
        title: '# of panels',
        key: 'number_of_panels',
        dataIndex: 'number_of_panels',
    },
    {
        title: 'Favorite',
        key: 'favorite',
        dataIndex: 'favorite',

        render(checked) {
            return <Checkbox checked={!!checked} />
        },
    },
]

export default panelsPopoverColumns
