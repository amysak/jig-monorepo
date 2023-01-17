import { Row, Typography } from 'antd'
import React from 'react'

import './context-header.scss'

const { Title } = Typography

function ContextHeader({ title }: { title: React.ReactNode }) {
    return (
        <Row className="contextheader">
            <Title level={4}>{title}</Title>
        </Row>
    )
}

export default ContextHeader
