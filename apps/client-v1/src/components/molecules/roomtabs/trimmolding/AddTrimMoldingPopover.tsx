import { Col, Form, Input, Row, Select, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTrims, TGetTrimsData } from '../../../../api/trims'
import {
    capitalize,
    getQueryString,
    shortId
} from '../../../../utilities/utils'
import JigModal from '../../../organisms/modal'
import { tableSelectStyle } from '../utils'

interface AddTrimMoldingPopoverProps {
    loading: boolean
    onSubmit: (trim: any) => Promise<void>
    label: string
}

const trimClassifications = ['Decorative Trim', 'Functional Trim', 'Moldings']
const { Text } = Typography

export default function AddTrimMoldingPopover({
    onSubmit,
    label,
    loading,
}: AddTrimMoldingPopoverProps) {
    const [trims, setTrims] = useState<TGetTrimsData>([[], 0])
    const [form] = Form.useForm()
    const [filters, setFilters] = useState({
        classification: 'Decorative Trim',
    })

    const getTrimsData = async (queryFilters = filters) => {
        try {
            const query = getQueryString(queryFilters)
            const trims = await getTrims(query)

            setTrims(trims)
            setFilters(queryFilters)
        } catch (error) {
            console.log(error)
        }
    }

    const onValuesChange = async () => {
        getTrimsData({
            ...filters,
            ...form.getFieldsValue(),
        })
    }

    useEffect(() => {
        getTrimsData()
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onChangeClassification = () => {}

    const columns = [
        {
            title: 'Item',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Material cost',
            key: 'material_cost',
            dataIndex: 'material_cost',
        },
        {
            title: 'Installation',
            key: 'installation_labor_cost',
            dataIndex: 'installation_labor_cost',
        },
        {
            title: 'Shop Labor',
            key: 'shop_labor_cost',
            dataIndex: 'shop_labor_cost',
        },
    ]

    return (
        <JigModal label={label} title="Add an End Panel">
            <Col className="roomspopover">
                <Form
                    initialValues={filters}
                    form={form}
                    onValuesChange={onValuesChange}
                >
                    <Row>
                        <Col span={10}>
                            <Text strong>
                                1. Filter list by selecting a Classification.
                            </Text>
                        </Col>
                        <Col span={14}>
                            <Form.Item name="classification">
                                <Select
                                    style={tableSelectStyle}
                                    onChange={onChangeClassification}
                                    allowClear
                                >
                                    {trimClassifications.map(
                                        (classification) => (
                                            <Select.Option
                                                value={classification}
                                                key={shortId()}
                                            >
                                                {capitalize(classification)}
                                            </Select.Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>

                        <br />
                        <br />
                        <br />

                        <Col span={10}>
                            <Text>2. Search by Trim or Molding Name.</Text>
                        </Col>
                        <Col span={14}>
                            <Form.Item name="name">
                                <Input />
                            </Form.Item>
                        </Col>

                        <br />
                        <br />
                        <br />
                        <br />

                        <Col span={24} className="table-col-wrapper">
                            <Table
                                dataSource={trims[0]}
                                columns={columns}
                                pagination={false}
                                rowKey="id"
                                size="small"
                                loading={loading}
                                onRow={(trimMolding, rowIndex) => {
                                    return {
                                        onClick: () =>
                                            // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
                                            onSubmit(trimMolding, rowIndex),
                                    }
                                }}
                            />
                        </Col>

                        <br />
                        <br />
                    </Row>
                </Form>
            </Col>
        </JigModal>
    )
}
