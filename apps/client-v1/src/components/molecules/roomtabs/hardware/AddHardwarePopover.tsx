import { Checkbox, Col, Form, Input, Radio, Row, Select, Table } from 'antd'
import React, { useContext, useState } from 'react'

import { useParams } from 'react-router'
import { getAccessoryClassification } from '../../../../api/accessories'
import { HardwareContext } from '../../../../store/hardwares'
import {
    capitalize,
    getQueryString,
    shortId,
} from '../../../../utilities/utils'
import JigModal from '../../../organisms/modal'

interface AddHardwarePopoverProps {
    label: string
}

const hardwareCategories = ['surface hardware', 'functional hardware']

export default function AddHardwarePopover({ label }: AddHardwarePopoverProps) {
    const hardwareCtx = useContext(HardwareContext)
    const [form] = Form.useForm()
    const params = useParams<{ id?: string }>()
    const [filters, setFilters] = useState({
        category: hardwareCategories[0],
        surface_application: 'door',
    })
    const [classifications, setClassification] = useState([])

    const getAccessoriesData = async (queryFilters = filters) => {
        try {
            const query = getQueryString(queryFilters)

            await hardwareCtx.onDefaultAccessories(query)

            const classifications = await getAccessoryClassification(
                queryFilters.category
            )

            setFilters(queryFilters)
            setClassification(classifications)
        } catch (error) {
            console.log(error)
        }
    }

    const onValuesChange = async () => {
        getAccessoriesData({
            ...filters,
            ...form.getFieldsValue(),
        })
    }

    const onRowClick = async (hardware) => {
        try {
            const payload = {
                ...hardware,
                surface_application: form
                    .getFieldValue('surface_application')
                    ?.toLowerCase(),
            }

            await hardwareCtx.onCreateRoomSetupAccessory(payload, params.id)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getAccessoriesData()
    }, [])

    const columns = [
        {
            title: 'Item Model-Description',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Material Cost',
            key: 'material_cost',
            dataIndex: 'material_cost',
        },
        {
            title: 'Installation Labor',
            key: 'installation_labor_cost',
            dataIndex: 'installation_labor_cost',
        },
        {
            title: 'Shop Labor',
            key: 'shop_labor_cost',
            dataIndex: 'shop_labor_cost',
        },
        {
            title: 'Favourite',
            key: 'favourite',
            dataIndex: 'favourite',

            render(checked) {
                return <Checkbox checked={!!checked} />
            },
        },
    ]

    return (
        <JigModal label={label}>
            <Row>
                <Form
                    layout="vertical"
                    initialValues={filters}
                    form={form}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        name="category"
                        help="Filter list by selecting a hardware category"
                    >
                        <Select style={{ width: '90%', marginLeft: '5px' }}>
                            {hardwareCategories.map((hardware) => (
                                <Select.Option key={shortId()} value={hardware}>
                                    {capitalize(hardware)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="classification"
                        help="Filter list by selecting a hardware classification"
                    >
                        <Select
                            style={{ width: '90%', marginLeft: '5px' }}
                            allowClear
                        >
                            {classifications.map((classification) => (
                                <Select.Option
                                    key={shortId()}
                                    value={classification.classification}
                                >
                                    {capitalize(classification.classification)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {form.getFieldValue('category')?.toLowerCase() ===
                        'surface hardware' && (
                        <Form.Item
                            name="surface_application"
                            help="Surface Hardware Application"
                        >
                            <Radio.Group>
                                <Radio value="door">Door</Radio>
                                <Radio value="drawer">Drawer</Radio>
                            </Radio.Group>
                        </Form.Item>
                    )}

                    <Form.Item name="name">
                        <Input placeholder="Filter by Hardware name" />
                    </Form.Item>

                    <Col span={24} style={{ height: 350, overflow: 'auto' }}>
                        <Table
                            // @ts-expect-error TS(2322): Type 'number | any[]' is not assignable to type 'r... Remove this comment to see the full error message
                            dataSource={hardwareCtx.defaultAccessories[0]}
                            columns={columns}
                            className="transparent-header clickablerows"
                            pagination={false}
                            size="small"
                            rowKey="id"
                            onRow={(hardware, rowIndex) => {
                                return {
                                    onClick: () =>
                                        // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
                                        onRowClick(hardware, rowIndex),
                                }
                            }}
                        />
                    </Col>
                </Form>
            </Row>
        </JigModal>
    )
}
