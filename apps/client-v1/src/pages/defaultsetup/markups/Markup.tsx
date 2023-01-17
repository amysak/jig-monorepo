import {
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Table,
    Typography,
} from 'antd'
import debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import {
    getDefaultMarkups,
    getMarkupById,
    TGetDefaultMarkupsData,
    updateMarkup,
} from '../../../api/markups'

import UILayout from '../../../components/templates/uilayout'
import { inputNumberPercentProps } from '../../../utilities'
import { setTableRowClass } from '../../../utilities/utils'
import { PageHeader } from './components'

const { Title } = Typography
const input100 = {
    width: '100%',
}

const cols = [
    {
        key: 'name',
        dataIndex: 'name',
    },
]

export default function Markup() {
    const [form] = Form.useForm()
    const params = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const [markup, setMarkup] = useState<{ id?: string }>({})
    const [markups, setMarkups] = useState<TGetDefaultMarkupsData>([[], 0])

    const getOne = async () => {
        try {
            const markup = await getMarkupById(params.id)

            setMarkup(markup)
        } catch (error) {}
    }

    const getAll = async () => {
        try {
            const markups = await getDefaultMarkups()

            setMarkups(markups)
        } catch (error) {}
    }

    useEffect(() => {
        getAll()
        getOne()
    }, [])

    useEffect(() => form.resetFields(), [markup])

    const onRowClick = (row: { id: any }) => {
        navigate(`/default-setup/markups/${row.id}`)
    }

    const onValuesChange = debounce(
        async (value, values: { is_default: boolean; status: any }) => {
            try {
                await updateMarkup(params.id, values)

                toast.success('Updated.')
            } catch (error) {
                toast.error('Failed to update.')
                console.log(error)
            }
        },
        1000
    )

    return (
        <UILayout
            ToolbarContent={
                <PageHeader
                    allowAlter
                    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
                    label={markup?.name}
                    parent={{ label: 'Markups', path: '/markups' }}
                />
            }
        >
            <Row>
                <Title level={4}>
                    Typical Design Showroom Markups (multi-payment terms)
                </Title>
            </Row>

            <Row className="pagewrapper">
                <Col span={6} className="pagewrapper__leftside">
                    <Title level={4}>Markup Options</Title>

                    <Table
                        dataSource={markups[0]}
                        columns={cols}
                        pagination={false}
                        className="clickable-table-row"
                        rowClassName={setTableRowClass(markup.id)}
                        size="small"
                        rowKey="id"
                        onRow={(record) => {
                            return {
                                onClick: () => onRowClick(record),
                            }
                        }}
                    />
                </Col>

                <Col
                    xs={18}
                    md={10}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <div className="pagewrapper__maincontent">
                        <Form
                            onValuesChange={onValuesChange}
                            form={form}
                            initialValues={markup}
                            layout="vertical"
                        >
                            <Form.Item label="Accessory Name" name="name">
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Description or Purpose"
                                name="description"
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>

                            <br />

                            <Row>
                                <Col span={12}>
                                    <Title level={4}>Markups</Title>

                                    <Form.Item
                                        label="Sales Commission %"
                                        name="sales_commission"
                                    >
                                        {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; ma... Remove this comment to see the full error message */}
                                        <InputNumber
                                            {...inputNumberPercentProps}
                                            style={input100}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Design Fee %"
                                        name="design_engineer_fee"
                                    >
                                        {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; ma... Remove this comment to see the full error message */}
                                        <InputNumber
                                            {...inputNumberPercentProps}
                                            style={input100}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="show_design_on_estimated_fee"
                                        label="Show design fee on Estimate?"
                                    >
                                        <Radio.Group>
                                            <Radio value={true}>Yes</Radio>
                                            <Radio value={false}>No</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        name="overhead_markup"
                                        label="Overhead Markup %"
                                    >
                                        {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; ma... Remove this comment to see the full error message */}
                                        <InputNumber
                                            {...inputNumberPercentProps}
                                            style={input100}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="profit_markup"
                                        label="Markup %"
                                    >
                                        {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; ma... Remove this comment to see the full error message */}
                                        <InputNumber
                                            {...inputNumberPercentProps}
                                            style={input100}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Additional %">
                                        <Row>
                                            <Col span={6}>
                                                <Form.Item name="additional">
                                                    {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; ma... Remove this comment to see the full error message */}
                                                    <InputNumber
                                                        {...inputNumberPercentProps}
                                                        style={input100}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col
                                                span={18}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Form.Item name="additional_method">
                                                    <Radio.Group>
                                                        <Radio value="add">
                                                            Add
                                                        </Radio>
                                                        <Radio value="subtract">
                                                            Subtract
                                                        </Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Col>

                                <Col span={12} className="padded-content-left">
                                    <Title level={4}>Taxes</Title>

                                    <Form.Item
                                        name="sales_tax_rate"
                                        label="Sales Tax Rate?"
                                    >
                                        {/* @ts-expect-error TS(2322): Type '{ style: { width: string; }; min: number; ma... Remove this comment to see the full error message */}
                                        <InputNumber
                                            {...inputNumberPercentProps}
                                            style={input100}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="show_sales_on_tax_report"
                                        label="Show Sales Tax on Reports?"
                                    >
                                        <Radio.Group>
                                            <Radio value="yes">Yes</Radio>
                                            <Radio value="no">No</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="show_sales_on_tax_material"
                                        label="Show Sales Tax on Materials?"
                                    >
                                        <Radio.Group>
                                            <Radio value="yes">Yes</Radio>
                                            <Radio value="yes with markups">
                                                Yes with Markups
                                            </Radio>
                                            <Radio value="no">No</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="show_sales_on_tax_labor"
                                        label="Show Sales Tax on Labor?"
                                    >
                                        <Radio.Group>
                                            <Radio value="yes">Yes</Radio>
                                            <Radio value="yes with markups">
                                                Yes with Markups
                                            </Radio>
                                            <Radio value="no">No</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="show_sales_on_tax_installation"
                                        label="Show Sales Tax on Installation"
                                    >
                                        <Radio.Group>
                                            <Radio value="yes">Yes</Radio>
                                            <Radio value="yes with markups">
                                                Yes with Markups
                                            </Radio>
                                            <Radio value="no">No</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="show_sales_on_tax_delivery"
                                        label="Show Sales Tax on Delivery"
                                    >
                                        <Radio.Group>
                                            <Radio value="yes">Yes</Radio>
                                            <Radio value="yes with markups">
                                                Yes with Markups
                                            </Radio>
                                            <Radio value="no">No</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider />
                        </Form>
                    </div>
                </Col>
            </Row>
        </UILayout>
    )
}
