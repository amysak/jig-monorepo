import React from 'react'
import { Col, Divider, Form, InputNumber, Row, Table, Typography } from 'antd'
import { range, shortId } from '../../../utilities/utils'

const { Title } = Typography
const layout = {
    wrapperCol: { span: 6 },
    labelCol: { span: 12 },
}

export default function DrawerBoxSqaureFeet() {
    const drawerFrontHeightsCols = [
        {
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Drawer 1',
            dataIndex: 'drawer_one',
            key: 'drawer_one',

            render(_value) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            title: 'Drawer 2',
            dataIndex: 'drawer_two',
            key: 'drawer_two',

            render(_value) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            title: 'Drawer 3',
            dataIndex: 'drawer_three',
            key: 'drawer_three',

            render(_value) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            title: 'Drawer 4',
            dataIndex: 'drawer_four',
            key: 'drawer_four',

            render(_value) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            title: 'Drawer 5',
            dataIndex: 'drawer_five',
            key: 'drawer_five',

            render(_value) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            key: 'total',
            dataIndex: 'total',
        },
    ]

    const drawerFrontHeightsData = range(1).map(() => ({
        id: shortId(),
        title: 'Total of Drawer Front Heights',
        drawer_one: 6.4,
    }))

    const sidePartHeightsCols = [
        {
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Drawer 1',
            dataIndex: 'drawer_one',
            key: 'drawer_one',

            render(value, record: { title: string }) {
                if (record.title === 'Drawer Side Height') {
                    return (
                        <Form.Item help="x 2 sides">
                            <InputNumber />
                        </Form.Item>
                    )
                }

                return value
            },
        },
        {
            title: 'Drawer 2',
            dataIndex: 'drawer_two',
            key: 'drawer_two',

            render(value, record: { title: string }) {
                if (record.title === 'Drawer Side Height') {
                    return (
                        <Form.Item help="x 2 sides">
                            <InputNumber />
                        </Form.Item>
                    )
                }

                return value
            },
        },
        {
            title: 'Drawer 3',
            dataIndex: 'drawer_three',
            key: 'drawer_three',

            render(value, record: { title: string }) {
                if (record.title === 'Drawer Side Height') {
                    return (
                        <Form.Item help="x 2 sides">
                            <InputNumber />
                        </Form.Item>
                    )
                }

                return value
            },
        },
        {
            title: 'Drawer 4',
            dataIndex: 'drawer_four',
            key: 'drawer_four',

            render(value, record: { title: string }) {
                if (record.title === 'Drawer Side Height') {
                    return (
                        <Form.Item help="x 2 sides">
                            <InputNumber />
                        </Form.Item>
                    )
                }

                return value
            },
        },
        {
            title: 'Drawer 5',
            dataIndex: 'drawer_five',
            key: 'drawer_five',

            render(value, record: { title: string }) {
                if (record.title === 'Drawer Side Height') {
                    return (
                        <Form.Item help="x 2 sides">
                            <InputNumber />
                        </Form.Item>
                    )
                }

                return value
            },
        },
    ]

    const sidePartHeightsData = [
        'Drawer Depth',
        'Drawer Side Height',
        'Drawer Side Sq. Ft.',
    ].map((title) => ({
        title,
        drawer_one: 24,
        drawer_two: 24,
        drawer_three: 24,
        drawer_four: 24,
        drawer_five: 24,
    }))

    const horizontalPartHeightsCols = [
        {
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Drawer 1',
            dataIndex: 'drawer_one',
            key: 'drawer_one',

            render(_value, _record) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            title: 'Drawer 2',
            dataIndex: 'drawer_two',
            key: 'drawer_two',

            render(_value, _record) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            title: 'Drawer 3',
            dataIndex: 'drawer_three',
            key: 'drawer_three',

            render(_value, _record) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            title: 'Drawer 4',
            dataIndex: 'drawer_four',
            key: 'drawer_four',

            render(_value, _record) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            title: 'Drawer 5',
            dataIndex: 'drawer_five',
            key: 'drawer_five',

            render(_value, _record) {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
    ]

    const horizontalPartHeightsData = [
        'Drawer Front',
        'Drawer Bottom',
        'Drawer Back',
        'stacked height of horiz. drawer box parts',
        'Cabinet Width (inches)',
        'Horizontal ',
    ].map((title) => ({
        title,
        drawer_one: 24,
        drawer_two: 24,
        drawer_three: 24,
        drawer_four: 24,
        drawer_five: 24,
    }))

    return (
        <Form {...layout}>
            <Row>
                <Col span={4}>
                    <Form.Item label="Drawer Qty">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="# of box parts">2</Form.Item>
                </Col>

                <Col span={20}>
                    <Title level={4}>Drawer Front Heights</Title>

                    <Table
                        columns={drawerFrontHeightsCols}
                        dataSource={drawerFrontHeightsData}
                        pagination={false}
                        rowKey="id"
                    />

                    <br />
                    <br />

                    <Title level={4}>Drawer Depth</Title>

                    <Form.Item label="Cabinet Depth">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Drawer Depth Difference">
                        <InputNumber />
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Drawer Depth">24</Form.Item>

                    <br />
                    <br />

                    <Title level={4}>Height of Side Parts</Title>

                    <Table
                        columns={sidePartHeightsCols}
                        dataSource={sidePartHeightsData}
                        pagination={false}
                        rowKey="id"
                    />

                    <br />
                    <br />

                    <Title level={4}>Height of Horizontal Parts</Title>

                    <Table
                        columns={horizontalPartHeightsCols}
                        dataSource={horizontalPartHeightsData}
                        pagination={false}
                        rowKey="id"
                        size="small"
                    />
                </Col>
            </Row>
        </Form>
    )
}
