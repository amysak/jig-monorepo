import { Col, Form, Input, InputNumber, Radio, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { createTax, getTaxByEntity, updateTax } from '../../../api/taxes'

const { Title, Text } = Typography

const layout = {
    wrapperCol: { span: 14 },
    labelCol: { span: 10 },
}

export function TaxForm() {
    const [form] = Form.useForm()
    const [tax, setTax] = useState(null)
    const params = useParams<{ id?: string }>()

    const getFormData = async () => {
        try {
            const tax = await getTaxByEntity('clients', params.id)

            setTax(tax)
        } catch (error) {
            console.error(error)
        }
    }

    const handleCreateTax = async (payload) => {
        try {
            const tax = await createTax({ ...payload, client: params.id })

            setTax(tax)
        } catch (error) {
            console.error(error)
        }
    }

    const onValuesChange = async (value) => {
        try {
            if (!tax) {
                return handleCreateTax(value)
            }

            await updateTax(tax.id, value)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getFormData()
    }, [])

    useEffect(() => {
        form.resetFields()
    }, [tax])

    return (
        <Form
            form={form}
            {...layout}
            initialValues={tax}
            onValuesChange={onValuesChange}
        >
            <Col span={24}>
                <Title level={3}>Taxes</Title>
                <Text>
                    Select the Default Tax Rate for this Client (enter
                    percentages as decimals i.e, .25 = 25%)
                </Text>

                <Form.Item label="Sales Tax Rate?" name="sales_tax_rate">
                    <InputNumber
                        min={0}
                        max={100}
                        formatter={(value) => (value ? `${value}%` : undefined)}
                        parser={(value) =>
                            //@ts-ignore
                            value ? value.replace('%', '') : undefined
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Show Sales Tax on Reports?"
                    name="show_sales_tax_on_report"
                >
                    <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Sales Tax on Materials?"
                    name="sales_tax_on_material"
                >
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="yes with markups">Yes with Markups</Radio>
                        <Radio value="no">No</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Sales Tax on Shop Labor?"
                    name="sales_tax_on_shop_labor"
                >
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="yes with markups">Yes with Markups</Radio>
                        <Radio value="no">No</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Sales Tax on Installation?"
                    name="sales_tax_on_installation"
                >
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="yes with markups">Yes with Markups</Radio>
                        <Radio value="no">No</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Sales Tax on Delivery?"
                    name="sales_tax_on_delivery"
                >
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="yes with markups">Yes with Markups</Radio>
                        <Radio value="no">No</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Tax ID Number" name="tax_id_number">
                    <Input />
                </Form.Item>
            </Col>
        </Form>
    )
}
