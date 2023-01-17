import { DoubleRightOutlined, HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import { shortId } from '../../utilities/utils'
interface ToolbarProps {
    initial?: { title: string; path: string }
    label: any
    parent?: { label: any; path: string }
}

export default function Toolbar({ initial, label, parent }: ToolbarProps) {
    const paths: { path: string; label: any }[] = []

    if (parent) {
        paths.push({
            path: `${initial.path}${parent.path}`,
            label: parent.label,
        })
    }

    return (
        <Breadcrumb
            className="cabinetsetup-breadcrumb"
            separator={<DoubleRightOutlined />}
        >
            <Breadcrumb.Item key={shortId()}>
                <Link to="/dashboard">
                    <HomeOutlined style={{ fontSize: '14px' }} />
                </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item key={shortId()}>
                {parent ? (
                    <Link to={initial.path}>{initial.title}</Link>
                ) : (
                    initial.title
                )}
            </Breadcrumb.Item>

            {paths.map((path) => (
                <Breadcrumb.Item key={shortId()}>
                    <Link to={path.path}>{path.label + 'dd'}</Link>
                </Breadcrumb.Item>
            ))}

            <Breadcrumb.Item>{label}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

Toolbar.defaultProps = {
    label: '',
    initial: {
        title: 'Cabinet Setup',
        path: '/cabinet-setup',
    },
}
