import React from 'react'
import { Col, Divider, Form, InputNumber, Row, Typography } from 'antd'

const { Title } = Typography
const layout = {
    wrapperCol: { span: 6 },
    labelCol: { span: 18 },
}

export default function FaceFrameSquareFeet() {
    return (
        <Form {...layout} className="form-small-input">
            <Row>
                <Col span={6}>
                    <Form.Item label="Number of Openings">{2}</Form.Item>

                    <Form.Item label="Top Rail Width">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Center Rail 1 Width">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Center Rail 2 Width">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Center Rail 3 Width">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Center Rail 4 Width">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Bottom Rail Width">
                        <InputNumber />
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Stacked Height">{4.5}</Form.Item>

                    <div style={{ height: '70px' }} />

                    <Title level={4}>Rail Square Footage</Title>

                    <Form.Item label="Stacked Height">4.5</Form.Item>

                    <Form.Item label="Rail length">4.5</Form.Item>

                    <Divider />

                    <Form.Item label="Cabinet Rail Sq. Ft.">4.5</Form.Item>
                </Col>

                <Col span={6}>
                    <div style={{ background: 'red', height: '350px' }}></div>

                    <div style={{ height: '10px' }} />

                    <Form.Item label="Average Cabinet Width">24.00</Form.Item>

                    <Form.Item label="Stile Width">
                        <InputNumber />
                    </Form.Item>

                    <Divider />
                    <Form.Item label="Rail Length">22.50</Form.Item>
                </Col>

                <Col span={6} className="padded-content-left">
                    <Title level={4}>Stile Height Inches</Title>

                    <Form.Item label="Floor to top of cabinet height">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Height to bottom of upper">
                        <InputNumber />
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Cabinet height">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Toe Kick">
                        <InputNumber />
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Stile height inches">
                        <InputNumber />
                    </Form.Item>

                    <Title level={4}>Stile Square Footage</Title>
                    <Form.Item label="Stile Height inches">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Stile Width" help="/ 144">
                        <InputNumber />
                    </Form.Item>

                    <Divider />

                    <Form.Item label="Stile Sq Ft">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Two Stiles">X 2</Form.Item>

                    <Divider />

                    <Form.Item label="Stile Sq. Ft. per Cabinet">
                        {0.78}
                    </Form.Item>

                    <Title level={4}>Face Frame Square Footage</Title>
                    <Form.Item label="Stile Sq. Ft. per Cabinet">
                        {0.78}
                    </Form.Item>

                    <Form.Item label="Cabinet Rail Sq. Ft. per Cabinet">
                        {0.7}
                    </Form.Item>

                    <Divider />
                    <Form.Item label="Total Face Frame Sq. Ft.">
                        {1.48}
                    </Form.Item>

                    <Form.Item label="Cabinet Qty.">
                        <InputNumber />
                    </Form.Item>

                    <Divider />
                    <Form.Item label="Total Face Frame Sq. Ft.">
                        {2.96}
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
