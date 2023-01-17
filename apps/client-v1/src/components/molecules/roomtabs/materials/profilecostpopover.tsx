import React from 'react'
import { Row, Col, Typography, Table } from 'antd'
import faker from 'faker'

import { profileCostColumns } from './table-columns'
import { shortId } from '../../../../utilities/utils'

const { Title } = Typography



const data = Array.from(Array(4)).map(() => ({
    id: shortId(),
    type: faker.commerce.department(),
}))

export default function ProfileCostPopver() {
    return (
        <Row>
            <Col span={24}>
                <Title level={4} style={{ textAlign: 'center' }}>
                    Profile Upcharges
                </Title>
            </Col>

            <Col span={24}>
                <Table
                    dataSource={data}
                    columns={profileCostColumns}
                    pagination={false}
                    bordered
                    size="small"
                />
            </Col>
        </Row>
    )
}
