import React from 'react'
import { Col, Divider, Form, InputNumber, Row, Select, Typography } from 'antd'
import { range, shortId } from '../../../utilities/utils'

const { Title, Text } = Typography
const layout = {
    wrapperCol: { span: 6 },
    labelCol: { span: 18 },
}

export default function TraySquareFeet() {
    return (
        <Form {...layout}>
            <Row>
                <Col>
                    <Form.Item
                        label="Tray Qty"
                        help="(automatically set default dimensions)"
                    >
                        <Select>

                            {range(5).map((num) => (
                                <Select.Option value={num} key={shortId()}>
                                    {num}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="# of box parts">{5}</Form.Item>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Title level={4}>Drawer Depth</Title>

                    <Form.Item label="Cabinet Depth">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Tray Depth Difference">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={12} />

                <Col md={{ span: 24 }} lg={{ span: 24 }}>
                    <Title level={4}>Heights of Side Parts</Title>

                    <Row>
                        <Col span={4} />

                        {range(5).map((count) => (
                            <Col span={2}>
                                <Text>Tray {count + 1}</Text>
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        <Col span={4}>
                            <Text>Tray Depth</Text>
                        </Col>


                        {range(5).map((_count) => (
                            <Col span={2}>
                                <Form.Item>3</Form.Item>
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        <Col span={4}>
                            <Text>Tray Side Height</Text>
                        </Col>


                        {range(5).map((_count) => (
                            <Col span={2}>
                                <Form.Item help="x 2 sides">
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        ))}
                    </Row>

                    <Divider />

                    <Row>
                        <Col span={4}>
                            <Text>Tray Side Sq. Ft.</Text>
                        </Col>


                        {range(5).map((count) => (
                            <Col span={2}>32 {count < 4 ? ' + ' : ' = '}</Col>
                        ))}

                        <Col span={2}>
                            <Text>
                                Total Tray SidesSq. Ft.
                                {'\n'}
                                1500
                            </Text>
                        </Col>

                        <Col span={2}>
                            <Text># of finished Sides</Text>

                            <Form.Item>
                                <InputNumber />
                            </Form.Item>
                        </Col>

                        <Col span={2}>
                            <Text>
                                Sq. Footage of finished sides
                                {'\n'}
                                0.521
                            </Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={12} />

                <Col md={{ span: 24 }} lg={{ span: 24 }}>
                    <Title level={4}>Heights of Horizontal Parts</Title>

                    <Row>
                        <Col span={4}>
                            <Text>Tray Front</Text>
                        </Col>


                        {range(5).map((_count) => (
                            <Col span={2}>
                                <Form.Item>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        ))}

                        <Col span={2} />

                        <Col span={2}>
                            <Form.Item>
                                <InputNumber />
                            </Form.Item>
                        </Col>

                        <Col span={2}>341.543</Col>
                    </Row>

                    <Row>
                        <Col span={4}>
                            <Text>Tray Bottom</Text>
                        </Col>


                        {range(5).map((_count) => (
                            <Col span={2}>
                                <Form.Item>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        ))}

                        <Col span={2} />

                        <Col span={2}>
                            <Form.Item>
                                <InputNumber />
                            </Form.Item>
                        </Col>

                        <Col span={2}>341.543</Col>
                    </Row>

                    <Row>
                        <Col span={4}>
                            <Text>Tray Back</Text>
                        </Col>


                        {range(5).map((_count) => (
                            <Col span={2}>
                                <Form.Item>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        ))}

                        <Col span={2} />

                        <Col span={2}>
                            <Form.Item>
                                <InputNumber />
                            </Form.Item>
                        </Col>

                        <Col span={2}>341.543</Col>
                    </Row>

                    <Divider />

                    <Row>
                        <Col span={4}>
                            <Text>Stacked Height of Horiz. Tray box parts</Text>
                        </Col>


                        {range(5).map((_count) => (
                            <Col span={2}>
                                <Form.Item help="X">116</Form.Item>
                            </Col>
                        ))}

                        <Col span={2} />

                        <Col span={2}>
                            <Text>9</Text>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={4}>
                            <Text>Cabinet Width (inches)</Text>
                        </Col>


                        {range(5).map((_count) => (
                            <Col span={2}>
                                <Form.Item help="/ 144">
                                    <InputNumber value={24} />
                                </Form.Item>
                            </Col>
                        ))}

                        <Col span={2}>1500</Col>
                    </Row>

                    <Divider />

                    <Row>
                        <Col span={4}>
                            <Text>Horizontal Tray box Parts Sq. Ft.</Text>
                        </Col>


                        {range(5).map((count) => (
                            <Col span={2}>58.6 {count < 4 ? ' + ' : ' = '}</Col>
                        ))}

                        <Col span={2}>
                            232.000
                            <Divider />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={10} />

                        <Col span={4}>
                            <Text>Total Sq. Ft.Tray box per Cabinet</Text>
                        </Col>

                        <Col span={2}>233.500</Col>
                    </Row>

                    <Row>
                        <Col span={14} />

                        <Col span={4}>
                            <Text
                                style={{ marginTop: '48px', display: 'block' }}
                            >
                                Total Finised Sq. Ft.Tray box per Cabinet
                            </Text>
                        </Col>

                        <Col span={2}>
                            <Divider />
                            449.000
                        </Col>
                    </Row>
                </Col>
                <Col span={12} />
            </Row>
        </Form>
    )
}
