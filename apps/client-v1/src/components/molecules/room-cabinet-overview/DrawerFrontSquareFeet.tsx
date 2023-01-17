import React from 'react'
import { Divider, Form, InputNumber, Typography } from 'antd'
import { range } from '../../../utilities/utils'

const { Title } = Typography

export default function DrawerFrontSquareFeet() {
    return (
        <Form>
            <Title level={4}>Drawer Front Heights</Title>


            {range(5).map((index) => (
                <Form.Item label={`Drawer ${index + 1}`}>
                    <InputNumber />
                </Form.Item>
            ))}

            <Divider />

            <Form.Item label="Total of Drawer Front Heights">6.125</Form.Item>

            <Title level={4}>Drawer Front</Title>

            <Form.Item label="Total of Drawer Front Heights">6.125</Form.Item>

            <Form.Item label="Cabinet Width">6.125</Form.Item>

            <Form.Item label="Sq Ft per Cabinet">6.125</Form.Item>

            <Form.Item label="Cabinet Qty">
                <InputNumber />
            </Form.Item>

            <Divider />

            <Form.Item label="Total Sq Ft Drawer Fronts">6.125</Form.Item>
        </Form>
    )
}
