import {
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Table,
    Typography,
} from 'antd'
import debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { sendNotificationRequest } from '../../../actions/notification'
import {
    getDefaultLaborRates,
    getLaborRate,
    TGetDefaultLaborRatesData,
    updateLaborRate,
} from '../../../api/labor-rates'
import UILayout from '../../../components/templates/uilayout'
import useFilter from '../../../hooks/useFilter'
import { store } from '../../../store'
import { inputNumberCostProps } from '../../../utilities'
import {
    LABOR_RATE_CATEGORIES_OPTIONS,
    LABOR_TYPES_OPTIONS,
} from '../../../utilities/constants'
import {
    getQueryString,
    lowerCase,
    setTableRowClass,
    shortId,
    sleep,
} from '../../../utilities/utils'
import { PageHeader } from './components'

interface LaborRateFormProps {
    laborRate: Record<string, any>
}

const { Title } = Typography

const isBoxLaborRate = (category) => ['drawer box'].includes(category)

function Filter() {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const params = useParams<{ id?: string }>()
    const [laborRates, setLaborRates] = useState<TGetDefaultLaborRatesData>([
        [],
        0,
    ])
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useFilter('laborrates', {})

    const scrollToLaborRate = () => {
        const laborRateRow = document.querySelector(`.selected-row`)

        if (laborRateRow) laborRateRow.scrollIntoView()
    }

    const getLaborRates = async (
        filters: Record<string, unknown> | undefined
    ) => {
        try {
            setLoading(true)

            const query = getQueryString(filters!)
            const laborRates = await getDefaultLaborRates(query)

            setFilters(filters)
            setLaborRates(laborRates)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getLaborRates(filters)

        sleep(1000).then(scrollToLaborRate)
    }, [])

    const columns = [
        {
            dataIndex: 'name',
            key: 'name',
        },
    ]

    const onValuesChange = debounce(
        (filter, filters: Record<string, unknown> | undefined) => {
            getLaborRates(filters)
        },
        1000
    )

    return (
        <Col span={6}>
            <Form
                initialValues={filters}
                form={form}
                onValuesChange={onValuesChange}
                layout="vertical"
                className="pagewrapper__leftside"
            >
                <Title level={4}>Filters</Title>

                <Form.Item name="name" label="Name">
                    <Input allowClear />
                </Form.Item>

                <Form.Item label="Category" name="category">
                    <Select allowClear>
                        {LABOR_RATE_CATEGORIES_OPTIONS.map((option) => (
                            <Select.Option value={option.value} key={shortId()}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Type" name="type">
                    <Select allowClear>
                        {LABOR_TYPES_OPTIONS.map((option) => (
                            <Select.Option value={option.value} key={shortId()}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={laborRates[0]}
                        pagination={false}
                        showHeader={false}
                        rowKey="id"
                        style={{
                            height: window.innerHeight - 100,
                            overflow: 'auto',
                        }}
                        size="small"
                        rowClassName={setTableRowClass(params.id)}
                        onRow={(row) => {
                            return {
                                onClick: () =>
                                    navigate(
                                        `/cabinet-setup/labor-rates/${row.id}`
                                    ),
                            }
                        }}
                    />
                </Form.Item>
            </Form>
        </Col>
    )
}

function LaborRateForm({ laborRate }: LaborRateFormProps) {
    const [form] = Form.useForm()
    const [, setLoading] = useState(false)

    useEffect(() => form.resetFields(), [laborRate])

    const onValuesChange = debounce(async (value: undefined) => {
        try {
            setLoading(true)

            await updateLaborRate(laborRate.id, value)
        } catch {
            store.dispatch(
                sendNotificationRequest({
                    message: 'Update failed.',
                    type: 'error',
                })
            )
        } finally {
            setLoading(false)
        }
    }, 1000)

    return (
        <Col md={18} lg={14}>
            <div className="pagewrapper__maincontent">
                <Form
                    onValuesChange={onValuesChange}
                    form={form}
                    initialValues={laborRate}
                    layout="vertical"
                >
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Category" name="category">
                        <Select>
                            {LABOR_RATE_CATEGORIES_OPTIONS.map((option) => (
                                <Select.Option
                                    value={option.value}
                                    key={shortId()}
                                >
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Type" name="type">
                        <Select>
                            {LABOR_TYPES_OPTIONS.map((option) => (
                                <Select.Option
                                    value={option.value}
                                    key={shortId()}
                                >
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Internal Note (non-printable)"
                        name="internal_note"
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    {isBoxLaborRate(laborRate.category?.toLowerCase()) ? (
                        <Row>
                            <Form.Item
                                label="Dovetail Rate"
                                name="dovetail_rate"
                            >
                                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                <InputNumber {...inputNumberCostProps} />
                            </Form.Item>
                            <Form.Item label="Rabbet Rate" name="rabbet_rate">
                                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                <InputNumber {...inputNumberCostProps} />
                            </Form.Item>
                            <Form.Item label="Butt Rate" name="butt_rate">
                                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                <InputNumber {...inputNumberCostProps} />
                            </Form.Item>
                        </Row>
                    ) : (
                        <Form.Item label="Rate" name="amount">
                            {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                            <InputNumber {...inputNumberCostProps} />
                        </Form.Item>
                    )}

                    <Form.Item label="Unit" name="unit_of_measure">
                        <Input />
                    </Form.Item>

                    {lowerCase(laborRate.type) === 'wainscot panel' && (
                        <Form.Item
                            label="Minimum Sq. Ft."
                            name="minimum_square_ft"
                        >
                            <InputNumber />
                        </Form.Item>
                    )}
                </Form>
            </div>
        </Col>
    )
}

export default function Laborrate() {
    const params = useParams<{ id?: string }>()
    const [laborRate, setLaborRate] = useState<{ name?: string }>({})

    const getData = async () => {
        try {
            const laborRate = await getLaborRate(params.id)

            setLaborRate(laborRate)
        } catch {
        } finally {
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <UILayout
            ToolbarContent={
                <PageHeader
                    label={laborRate?.name}
                    parent={{ label: 'Labor Rates', path: '/labor-rates' }}
                />
            }
        >
            <Row className="pagewrapper">
                <Filter />

                <LaborRateForm laborRate={laborRate} />
            </Row>
        </UILayout>
    )
}
