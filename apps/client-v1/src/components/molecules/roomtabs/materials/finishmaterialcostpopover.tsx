import React from 'react'
import { Row, Col, Typography, Table } from 'antd'
import faker from 'faker'

import { finishMaterialCostsColumns } from './table-columns'
import { shortId } from '../../../../utilities/utils'

const { Title, Text } = Typography



const data = Array.from(Array(15)).map(() => ({
    id: shortId(),
    type: faker.commerce.department(),
}))

export default function FinishMaterialCostPopver() {
    return (
        <Row>
            <Col span={24}>
                <Title level={4} style={{ textAlign: 'center' }}>
                    Finish Materials Costs
                </Title>
            </Col>

            <Col span={24}>
                <Table
                    dataSource={data}
                    columns={finishMaterialCostsColumns}
                    pagination={false}
                    bordered
                    size="small"
                />

                <Text strong>
                    These are the material cost based on he default materials
                    chosen.
                    <br />
                    Both the in-house manufactured nd the outsourced costs are
                    shown.
                    <br />
                    The Cost used for this job is determined by selecting the
                    Source (in or out) of the item.
                </Text>
            </Col>
        </Row>
    )
}
