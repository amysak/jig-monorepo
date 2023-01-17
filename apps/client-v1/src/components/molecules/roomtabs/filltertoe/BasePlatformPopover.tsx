import React from 'react'
import { Row, Col, Checkbox, Table, Typography, Input, Button } from 'antd'
// TODO: Dead lib btw
import faker from 'faker'

import { shortId } from '../../../../utilities/utils'

const { Title, Text } = Typography
const columns = [
    {
        title: 'Platform Name',
        key: 'platform_name',
        dataIndex: 'platform_name',
        width: 300,
    },
    {
        title: 'Platform Height',
        key: 'platform_height',
        dataIndex: 'platform_height',
    },
    {
        title: 'Platform Depth',
        key: 'platform_depth',
        dataIndex: 'platform_depth',
    },
    {
        title: '# of Sleepers',
        key: 'number_of_sleepness',
        dataIndex: 'number_of_sleepness',
    },
    {
        title: 'Favorite',
        key: 'favorite',
        dataIndex: 'favorite',

        render(checked: boolean) {
            return <Checkbox checked={checked} />
        },
    },
]

const data = Array.from(Array(10)).map(() => ({
    id: shortId(),
    platform_name: faker.commerce.department(),
}))

export default function BasePlatformPopover() {
    return (
        <Row style={{ width: 500, overflow: 'auto' }}>
            <Col span={24}>
                <Title level={4} style={{ textAlign: 'center' }}>
                    Add a Toe Platform
                </Title>
            </Col>

            <Col span={6}>
                <Text strong>1. Search by name</Text>
            </Col>
            <Col span={18}>
                <Input.Search />
            </Col>

            <br />
            <br />
            <br />

            <Col span={24}>
                <Text strong>2. Choose a Filler from the list below</Text>
            </Col>

            <Col span={24}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="small"
                    bordered
                    rowKey="id"
                />
            </Col>

            <Col span={24}>
                <br />
                <br />
                <Button className="jig-button" block>
                    Add Toe Platform
                </Button>
            </Col>
        </Row>
    )
}
