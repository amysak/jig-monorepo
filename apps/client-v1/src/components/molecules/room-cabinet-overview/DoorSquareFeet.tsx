import React from 'react'
import {
    Form,
    Row,
    Col,
    Table,
    Select,
    InputNumber,
    Typography,
    Divider,
} from 'antd'
import { range, shortId } from '../../../utilities/utils'

const { Title } = Typography

const layout = {
    wrapperCol: { span: 6 },
    labelCol: { span: 12 },
}

export default function DoorSquareFeet() {
    const doorCols = [
        {
            title: '',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Door Height',
            key: 'door_height',
            dataIndex: 'door_height',
        },
        {
            title: 'Cabinet Width',
            key: 'cabinet_width',
            dataIndex: 'cabinet_width',

            render(value) {
                return <p>{value} &nbsp; &nbsp; &nbsp; / 144</p>
            },
        },
        {
            title: 'Door Sq Ft per Cabinet',
            key: 'door_square_feet_per_cabinet',
            dataIndex: 'door_square_feet_per_cabinet',
        },
        {
            title: 'Cabinet Qty',
            key: 'cabinet_quantity',
            dataIndex: 'cabinet_quantity',
            render() {
                return (
                    <Form.Item>
                        <InputNumber />
                    </Form.Item>
                )
            },
        },
        {
            title: 'Total Sq Ft. Doors',
            key: 'total_sqare_feet_doors',
            dataIndex: 'total_sqare_feet_doors',
        },
        {
            title: 'Door Sq Ft per Cabinet',
            key: 'door_square_feet_per_cabinet',
            dataIndex: 'door_square_feet_per_cabinet',
        },
        {
            title: '# of Finished Sides',
            key: 'number_of_finished_sides',
            dataIndex: 'number_of_finished_sides',

            render(value) {
                return (
                    <Select value={value}>
                        {[1, 2].map((val) => (
                            <Select.Option key={shortId()} value={val}>
                                {val}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
        {
            title: 'Finished Sq Ft per cabinet',
            key: 'finished_square_feet_per_cabinet',
            dataIndex: 'finished_square_feet_per_cabinet',
        },
    ]

    const doorData = [
        {
            title: 'Base Door',
        },
        {
            title: 'Upper Door',
        },
    ].map((title) => ({
        title,
        door_height: 12.5,
        cabinet_width: 30,
        door_square_feet_per_cabinet: 5.3,
        cabinet_quantity: 1,
        number_of_finished_sides: 2,
        finished_square_feet_per_cabinet: 10.5,
    }))

    return (
        <Form {...layout}>
            <Row>
                <Table
                    columns={doorCols}
                    dataSource={doorData}
                    pagination={false}
                />
            </Row>

            <Row style={{ marginTop: '15px' }}>
                <Col span={8}>
                    <Title level={4}>Cabinet Sides</Title>
                    <Form.Item label="Floor to top of Cabinet">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Floor to bottom of Cabinet">
                        <InputNumber />
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Cabinet Height">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Toe Kick">
                        <InputNumber />
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Cabinet Side Height">
                        <InputNumber />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Title level={4}>Drawer Front Heights</Title>
                    <Form.Item label="Drawer 1">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Drawer 2">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Drawer 3">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Drawer 4">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Drawer 5">
                        <InputNumber />
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Total of Drawer Front Height">
                        <InputNumber />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Title level={4}>Door and Drawer Reveal</Title>

                    <Form.Item label="Door and Drawer Reveal" help="X">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="# of Drawer Front" help="per cabinet +">
                        5
                    </Form.Item>

                    <Form.Item label="Reveal between Doors" help="Tall Only">
                        2
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Total Door Allowance">50</Form.Item>
                </Col>
            </Row>

            <Row style={{ marginTop: '15px' }}>
                <Col span={8}>
                    <Title level={4}>Door Heights</Title>

                    <Form.Item label="Cabinet Side Height">12</Form.Item>

                    <Form.Item label="Drawer Heights">12</Form.Item>

                    <Form.Item label="Total Allowance">12</Form.Item>

                    <Divider />

                    <Form.Item label="Upper Door Height">12</Form.Item>
                    <Form.Item label="Base Door Height">12</Form.Item>
                </Col>
                <Col span={8}>
                    <Title level={4}> </Title>
                    {range(5).map(() => (
                        <Form.Item label=""></Form.Item>
                    ))}

                    <Form.Item label="Override Upper Door Height">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Override Base Door Height">
                        <InputNumber />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
