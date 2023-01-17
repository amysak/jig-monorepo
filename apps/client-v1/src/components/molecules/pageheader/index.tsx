import { Row } from 'antd'
import React from 'react'
import Toolbar from '../../../pages/cabinetsetup/Toolbar'

interface PageHeaderProps {
    initial: { title: string; path: string }
    component?: Element | JSX.Element
    label?: string | any
    parent?: { label: any; path: string }
}

export function PageHeader({
    initial,
    parent,
    label,
    component,
}: PageHeaderProps) {
    return (
        <Row justify="space-between">
            <>
                <Toolbar initial={initial} label={label} parent={parent} />

                {component}
            </>
        </Row>
    )
}

PageHeader.defaultProps = {
    label: '',
    allowAlter: false,
    component: null,
}
