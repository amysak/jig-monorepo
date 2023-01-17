import { Col, Divider, Form, InputNumber, Row, Typography } from 'antd'
import debounce from 'lodash/debounce'
import React, { useContext } from 'react'
import { CabinetContext } from '../../../../store/cabinets'
import {
    countNoneEmptyObjList,
    shortId,
    toFixed,
} from '../../../../utilities/utils'

import CabinetImg from '../../../../assets/images/cabinets/BP_Five_Part_Drawer_Box.png'

const layout = {
    wrapperCol: {
        sm: { span: 8 },
        md: { span: 5 },
    },
    labelCol: {
        sm: { span: 16 },
        md: { span: 8 },
    },
}

const { Title } = Typography

export default function FivePartTrayBox() {
    const [form] = Form.useForm()
    const cabinetCtx = useContext(CabinetContext)

    const { cabinet } = cabinetCtx

    React.useEffect(() => form.resetFields(), [cabinet])

    const onValuesChange = debounce(
        async (value, values: { five_part_tray_box: any[] }) => {
            values.five_part_tray_box = values.five_part_tray_box.map(
                (part: { cabinet: any }) => {
                    part.cabinet = cabinet.id

                    return part
                }
            )

            await cabinetCtx.onUpdateCabinet(cabinet.id, values, false)
        },
        1000
    )

    return (
        <Form
            form={form}
            onValuesChange={onValuesChange}
            initialValues={cabinet}
            className="cabinet-form"
            {...layout}
        >
            <Row>
                <Col offset={8}>
                    <Title level={4}>Five Part Tray Box Parts</Title>
                </Col>
            </Row>

            <Row>
                <Col span={8}>
                    <Form.Item label="Number of Roll Out Trays">
                        {countNoneEmptyObjList(cabinet.tray_part)}
                    </Form.Item>
                    <Form.Item label="Cabinet Depth">
                        {cabinet.cabinet_depth}
                    </Form.Item>
                    <Form.Item
                        label="Difference"
                        name="tray_box_depth_difference"
                    >
                        <InputNumber />
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Drawer Box Depth" shouldUpdate>
                        {() => {
                            return (
                                // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
                                toFixed(cabinet.cabinet_depth) -
                                // @ts-expect-error TS(2363): The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
                                toFixed(
                                    form.getFieldValue(
                                        'tray_box_depth_difference'
                                    )
                                )
                            )
                        }}
                    </Form.Item>
                </Col>

                <Col span={10}>
                    <Row>
                        <Col span={4}>Tray</Col>
                        <Col span={5}>Front Height</Col>
                        <Col span={5}>Side Height</Col>
                        <Col span={5}>Back Height</Col>
                        <Col span={5}>Bottom Depth</Col>
                    </Row>

                    {Array.from(
                        Array(cabinet.number_of_rollout_trays || 0)
                    ).map((_, index: number) => (
                        <div key={shortId()}>
                            <Row>
                                <Col span={4}>Tray {index + 1}</Col>

                                <Col span={5}>
                                    <Form.Item
                                        name={[
                                            'five_part_tray_box',
                                            index,
                                            'front_height',
                                        ]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>

                                <Col span={5}>
                                    <Form.Item
                                        name={[
                                            'five_part_tray_box',
                                            index,
                                            'side_height',
                                        ]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>

                                <Col span={5}>
                                    <Form.Item
                                        name={[
                                            'five_part_tray_box',
                                            index,
                                            'back_height',
                                        ]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>

                                <Col span={5}>
                                    <Form.Item shouldUpdate noStyle>
                                        {() => {
                                            return (
                                                <Form.Item
                                                    name={[
                                                        'five_part_tray_box',
                                                        index,
                                                        'bottom_depth',
                                                    ]}
                                                >
                                                    <InputNumber
                                                        // @ts-expect-error TS(2322): Type '(value: ValueType, { userTyping, input, }: {... Remove this comment to see the full error message
                                                        formatter={(
                                                            value,
                                                            {
                                                                userTyping,
                                                                input,
                                                            }
                                                        ) => {
                                                            if (userTyping) {
                                                                return input
                                                            }

                                                            if (!value) {
                                                                return (
                                                                    // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
                                                                    toFixed(
                                                                        // @ts-expect-error TS(2339): Property 'cabinet_depth' does not exist on type '{... Remove this comment to see the full error message
                                                                        cabinet.cabinet_depth
                                                                    ) -
                                                                    // @ts-expect-error TS(2363): The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
                                                                    toFixed(
                                                                        form.getFieldValue(
                                                                            'tray_box_depth_difference'
                                                                        )
                                                                    )
                                                                )
                                                            }

                                                            return value
                                                        }}
                                                    />
                                                </Form.Item>
                                            )
                                        }}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Col>
            </Row>

            <Row style={{ marginTop: '100px' }}>
                {cabinet.number_of_rollout_trays ? (
                    <Col offset={11}>
                        <img src={CabinetImg} style={{ height: '250px' }} />
                    </Col>
                ) : null}
            </Row>
        </Form>
    )
}
