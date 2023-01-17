import { Col, Form, Input, InputNumber, Row, Select, Typography } from 'antd'
import { range } from 'd3'
import React, { useContext } from 'react'
import { CabinetContext } from '../../../../store/cabinets'
import {
    countNoneEmptyObjList,
    safeNum,
    shortId,
} from '../../../../utilities/utils'

import FaceFrameOne from '../../../../assets/images/face-frames/1.png'
import FaceFrameTwo from '../../../../assets/images/face-frames/2.png'
import FaceFrameThree from '../../../../assets/images/face-frames/3.png'
import FaceFrameFour from '../../../../assets/images/face-frames/4.png'
import FaceFrameFive from '../../../../assets/images/face-frames/5.png'

const getFaceFrameByNumber = (number: number) => {
    switch (number) {
        case 2:
            return FaceFrameTwo
        case 3:
            return FaceFrameThree
        case 4:
            return FaceFrameFour
        case 5:
            return FaceFrameFive
        default:
            return FaceFrameOne
    }
}

const { Title } = Typography
const layout = {
    wrapperCol: {
        sm: { span: 16 },
        md: { span: 16 },
    },
    labelCol: {
        sm: { span: 8 },
        md: { span: 8 },
    },
}
const halfInputStyle = {
    width: '50%',
}

export default function FaceFrameSpecification() {
    const cabinetCtx = useContext(CabinetContext)
    const { cabinet } = cabinetCtx
    const [form] = Form.useForm()

    const onValuesChange = async (value, values) => {
        await cabinetCtx.onUpdateCabinet(cabinet.id, values, false)
    }

    React.useEffect(() => form.resetFields(), [cabinet])

    return (
        <Form
            form={form}
            onValuesChange={onValuesChange}
            initialValues={cabinet}
            {...layout}
            className="cabinet-form"
        >
            <Col md={16} sm={24}>
                <Title level={3}>Face Frames</Title>

                <Form.Item label="Number of Drawers">
                    {countNoneEmptyObjList(cabinet.drawer_part)}
                </Form.Item>

                <Form.Item label="Number of Roll Out Trays">
                    {countNoneEmptyObjList(cabinet.tray_part)}
                </Form.Item>

                <Form.Item
                    name="cabinet_height"
                    label="Floor to Top of Cabinet"
                >
                    <InputNumber />
                </Form.Item>
            </Col>

            <br />
            <br />

            <Row className="faceframe-wrapper">
                <Col span={8} className="faceframe-left">
                    {safeNum(cabinet.number_of_opennings) > 0 ? (
                        <>
                            <div>
                                <Row>
                                    <Col offset={15}># of Finished Sides</Col>
                                </Row>

                                <Form.Item label="Top Rail Width">
                                    <Input.Group compact>
                                        <Form.Item
                                            name={[
                                                'face_frame',
                                                'top_rail_width',
                                                'value',
                                            ]}
                                            style={halfInputStyle}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                            name={[
                                                'face_frame',
                                                'top_rail_width',
                                                'number_of_finished_side',
                                            ]}
                                            style={halfInputStyle}
                                        >
                                            <Select style={{ width: '50px' }}>
                                                {[0, 1, 2].map((value) => {
                                                    return (
                                                        <Select.Option
                                                            key={`${value}`}
                                                            value={value}
                                                        >
                                                            {value}
                                                        </Select.Option>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>
                            </div>

                            <br />

                            {range(
                                safeNum(cabinet.number_of_opennings) - 1
                            ).map((_, index) => (
                                <div key={shortId()}>
                                    <Form.Item label="Center Rail Width">
                                        <Input.Group compact>
                                            <Form.Item
                                                name={[
                                                    'face_frame',
                                                    'center_rails',
                                                    index,
                                                    'value',
                                                ]}
                                                style={halfInputStyle}
                                            >
                                                <InputNumber />
                                            </Form.Item>
                                            <Form.Item
                                                name={[
                                                    'face_frame',
                                                    'center_rails',
                                                    index,
                                                    'number_of_finished_side',
                                                ]}
                                                style={halfInputStyle}
                                            >
                                                <Select
                                                    style={{ width: '50px' }}
                                                >
                                                    {[0, 1, 2].map((value) => {
                                                        return (
                                                            <Select.Option
                                                                key={`${value}`}
                                                                value={value}
                                                            >
                                                                {value}
                                                            </Select.Option>
                                                        )
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Input.Group>
                                    </Form.Item>
                                    <br />
                                </div>
                            ))}

                            <Form.Item label="Bottom Rail Width">
                                <Input.Group compact>
                                    <Form.Item
                                        name={[
                                            'face_frame',
                                            'bottom_rail_width',
                                            'value',
                                        ]}
                                        style={halfInputStyle}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item
                                        name={[
                                            'face_frame',
                                            'bottom_rail_width',
                                            'number_of_finished_side',
                                        ]}
                                        style={halfInputStyle}
                                    >
                                        <Select style={{ width: '50px' }}>
                                            {[0, 1, 2].map((value) => {
                                                return (
                                                    <Select.Option
                                                        key={`${value}`}
                                                        value={value}
                                                    >
                                                        {value}
                                                    </Select.Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </>
                    ) : null}
                </Col>

                <Col span={8}>
                    <Form.Item shouldUpdate>
                        {() => {
                            const count = safeNum(
                                form.getFieldValue('number_of_opennings')
                            )

                            if (count <= 0) return null

                            return (
                                <img
                                    className="face-frame-image"
                                    src={getFaceFrameByNumber(count)}
                                />
                            )
                        }}
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item label="Stile Width">
                        <Input.Group>
                            <Form.Item name="stile_width">
                                <InputNumber />
                            </Form.Item>

                            <Form.Item name="stile_width_count">
                                <Select>
                                    {[0, 1, 3].map((value) => (
                                        <Select.Option
                                            value={value}
                                            key={shortId()}
                                        >
                                            {value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item
                        label="Stile Side Height"
                        name="stile_side_width"
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
