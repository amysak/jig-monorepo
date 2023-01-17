import { Row } from 'antd'
import React from 'react'
import Toolbar from '../../Toolbar'
import NewLaborRateFormPopover from '../NewLaborRate'

interface PageHeaderProps {
    label: any | string
    parent?: { label: string; path: string }
}

export function PageHeader({ parent, label }: PageHeaderProps) {
    return (
        <Row justify="space-between">
            <Toolbar label={label} parent={parent} />

            <div>
                <NewLaborRateFormPopover />
            </div>
        </Row>
    )
}
