import { Col, Form, InputNumber, Row, Typography } from 'antd'
import React from 'react'
import { inputNumberCostProps } from '../../../../utilities'

const { Text, Title } = Typography

export default function OutsourcedDrawerBox() {
    return (
        <Row align="bottom">
            <Col span={24}>
                <Title level={4}>Out-Source</Title>

                <Text>Cost per Linear Inch &#160; &#160;</Text>
            </Col>

            <Form.Item label={`2" - 3"`} name={['cost_per_drawer_box', '2_3']}>
                {/* @ts-expect-error TS(2322): Type '{ className: string; min: number; step: numb... Remove this comment to see the full error message */}
                <InputNumber {...inputNumberCostProps} className="input-75" />
            </Form.Item>
            <Form.Item
                label={`3.5" - 4"`}
                name={['cost_per_drawer_box', '3_4']}
            >
                {/* @ts-expect-error TS(2322): Type '{ className: string; min: number; step: numb... Remove this comment to see the full error message */}
                <InputNumber {...inputNumberCostProps} className="input-75" />
            </Form.Item>
            <Form.Item
                label={`4.5" - 6"`}
                name={['cost_per_drawer_box', '4_6']}
            >
                {/* @ts-expect-error TS(2322): Type '{ className: string; min: number; step: numb... Remove this comment to see the full error message */}
                <InputNumber {...inputNumberCostProps} className="input-75" />
            </Form.Item>
            <Form.Item
                label={`6.5" - 8"`}
                name={['cost_per_drawer_box', '6_8']}
            >
                {/* @ts-expect-error TS(2322): Type '{ className: string; min: number; step: numb... Remove this comment to see the full error message */}
                <InputNumber {...inputNumberCostProps} className="input-75" />
            </Form.Item>
            <Form.Item
                label={`8.5" - 10"`}
                name={['cost_per_drawer_box', '8_10']}
            >
                {/* @ts-expect-error TS(2322): Type '{ className: string; min: number; step: numb... Remove this comment to see the full error message */}
                <InputNumber {...inputNumberCostProps} className="input-75" />
            </Form.Item>
            <Form.Item
                label={`10.5" - 12"`}
                name={['cost_per_drawer_box', '10_12']}
            >
                {/* @ts-expect-error TS(2322): Type '{ className: string; min: number; step: numb... Remove this comment to see the full error message */}
                <InputNumber {...inputNumberCostProps} className="input-75" />
            </Form.Item>
        </Row>
    )
}
