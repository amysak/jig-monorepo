import React from 'react'
import {
    Checkbox,
    Col,
    Divider,
    Form,
    InputNumber,
    Row,
    Select,
    Table,
    Typography,
} from 'antd'

import {
    CABINET_POSITION_METHODS_OPTIONS,
    CABINET_BASE_STYLES,
} from '../../../utilities/constants'
import { capitalize, range, shortId } from '../../../utilities/utils'

import './styles.scss'

const selectStyle = {
    width: '100%',
}
const { Title } = Typography

const layout = {}

const inlineLayout = {}

const inputStyle = {
    width: '44px',
}

const partSqCols = [
    {
        key: 'title',
        dataIndex: 'title',
    },
    {
        key: 'width_clearance',
        dataIndex: 'width_clearance',
    },
    {
        title: 'Quantity',
        key: 'quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Depth Diff',
        key: 'depth_diff',
        dataIndex: 'depth_diff',
    },
    {
        title: 'Individual Part Height/Depth',
        key: 'part_height',
        dataIndex: 'part_height',

        render(value) {
            return <InputNumber value={value} />
        },
    },
    {
        title: '# of Finish Sides',
        key: 'number_of_finish_sides',
        dataIndex: 'number_of_finish_sides',

        render(v) {
            return (
                <Select value={v}>
                    {[1, 2].map((value) => (
                        <Select.Option value={value} key={shortId()}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            )
        },
    },
    {
        title: 'Width',
        key: 'width',
        dataIndex: 'width',
    },
    {
        title: 'Sq. Ft.',
        key: 'square_feet',
        dataIndex: 'square_feet',
    },
    {
        title: 'Sq. Ft. Finished',
        key: 'square_feet_finished',
        dataIndex: 'square_feet_finished',
    },
]

const parSqData = range(12).map(() => ({
    id: shortId(),
    title: 'Top Front Stretcher',
    width_clearance: true,
    quantity: 2,
    depth_diff: 0,
    part_height: 12,
    number_of_finish_sides: 1,
    width: 22.5,
    square_feet: 0.012,
    square_feet_finished: 1.875,
}))

const cabPartFinSidesCols = [
    {
        title: '',
        key: 'title',
        dataIndex: 'title',
    },
    {
        title: 'Backs',
        key: 'backs',
        dataIndex: 'backs',
    },
    {
        title: 'Sides and Vertical',
        key: 'sides_and_vertical',
        dataIndex: 'sides_and_vertical',
    },
    {
        title: 'Horizontal Interior',
        key: 'horizontal_interior',
        dataIndex: 'horizontal_interior',
    },
    {
        title: 'Total',
        key: 'total',
        dataIndex: 'total',
    },
]

const cabPartFinSidesData = [
    '# of Finished Sides',
    '# of Parts',
    '# of Parts requiring edgebanding',
    'Length of Edgebanding (Feet)',
].map((title) => ({
    id: shortId(),
    title,
}))

export default function SquareFeet() {
    return (
        <Form {...layout} layout="horizontal">
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="Back Position">
                                <Select style={selectStyle}>
                                    {CABINET_POSITION_METHODS_OPTIONS.map(
                                        (option) => (
                                            <Select.Option value={option.value}>
                                                {option.label}
                                            </Select.Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12} className="padded-content-left">
                            <Form.Item label="Base Style">
                                <Select style={selectStyle}>
                                    {CABINET_BASE_STYLES.map((option) => (
                                        <Select.Option value={option}>
                                            {capitalize(option)}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>

                <Col span={12} className="padded-content-left">
                    <Row justify="space-between">
                        <Form.Item label="Cabinet Depth" {...inlineLayout}>
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Material Thickness" {...inlineLayout}>
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Material Thickness" {...inlineLayout}>
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                    </Row>

                    <Row justify="space-between">
                        <Form.Item label="Back Thickness">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Dado Depth">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Rabbet Width">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                    </Row>

                    <Divider />

                    <Row justify="space-between">
                        <Form.Item label="Side Depth">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Dado Clearance">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Rabbet Clearance">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                    </Row>
                </Col>

                <Col span={6}>
                    <div className="bordered-row">
                        <Title level={4}>Cabinet Width</Title>

                        <Form.Item label="Total Linear Footage">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Total Qty of Cabinets">3</Form.Item>

                        <Divider />
                        <Form.Item label="Individual Cabinet Width">
                            24
                        </Form.Item>

                        <Form.Item label="Side Rabbet Adjustment">3</Form.Item>
                        <Form.Item label="Back Corner Adjustment">3</Form.Item>
                        <Divider />
                        <Form.Item label="Back Width">3</Form.Item>
                    </div>

                    <div className="bordered-row">
                        <Title level={4}>Backs</Title>

                        <Form.Item label="Number of Backs">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Cabinet Height">3</Form.Item>

                        <Divider />
                        <Form.Item label="Toe Kick">24</Form.Item>

                        <Form.Item label="Bottom Dado Clearance">3</Form.Item>
                        <Form.Item label="Top Dado Clearance">3</Form.Item>
                        <Divider />
                        <Form.Item label="Back Height">3</Form.Item>
                        <Form.Item label="Back Width">3</Form.Item>

                        <Divider />

                        <Form.Item label="Back Square Footage">3</Form.Item>

                        <Form.Item label="# of Finished Back Sides">
                            3
                        </Form.Item>

                        <Divider />

                        <Form.Item label="Finished Back Sq Footage">
                            3
                        </Form.Item>
                    </div>
                </Col>

                <Col span={6}>
                    <div className="bordered-row">
                        <Title level={4}>Cabinet Height</Title>

                        <Form.Item label="Floor to Top of Cabinet">
                            <InputNumber style={inputStyle} />
                        </Form.Item>

                        <Form.Item label="Floor to Bottom of Cabinet">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Divider />
                        <Form.Item label="Cabinet Height">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                    </div>

                    <div className="bordered-row">
                        <Title level={4}>Cabinet Sides</Title>

                        <Form.Item label="Cabinet Height">
                            <InputNumber style={inputStyle} />
                        </Form.Item>

                        <Form.Item label="Toe Kick">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Divider />
                        <Form.Item label="Side Height">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Side Depth X ">
                            <InputNumber style={inputStyle} />
                        </Form.Item>

                        <Divider />

                        <Form.Item label="Sq Ft One Side">
                            <InputNumber style={inputStyle} />
                        </Form.Item>

                        <Form.Item label="No. of Sides X">
                            <InputNumber style={inputStyle} />
                        </Form.Item>

                        <Divider />
                        <Form.Item label="Total Sq Ft of Sides per Cab">
                            <InputNumber style={inputStyle} />
                        </Form.Item>
                    </div>

                    <div className="bordered-row">
                        <Form.Item label="Corner Cabinet">
                            <Checkbox />
                        </Form.Item>
                    </div>
                </Col>

                <Col span={12}>
                    <Table
                        columns={partSqCols}
                        dataSource={parSqData}
                        pagination={false}
                        size="small"
                    />

                    <div className="padded-content-left">
                        <br />
                        <br />
                        <Title level={4}>
                            Number of Cabinet Parts and Finished Sides
                        </Title>

                        <Table
                            columns={cabPartFinSidesCols}
                            dataSource={cabPartFinSidesData}
                            pagination={false}
                        />
                    </div>
                </Col>
            </Row>
        </Form>
    )
}
