import { Checkbox, Form, Input, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'

import { getDefaultAccessories } from '../../../../api/accessories'
import {
    capitalize,
    getQueryString,
    shortId,
} from '../../../../utilities/utils'
import JigModal from '../../../organisms/modal'
interface AddAccessoryPopoverProps {
    onSubmit: (accessory: any) => Promise<void>
    label: string
}

const hardwareCategories = [
    'Functional Accessories',
    'Counter Accessories',
    'Counter Tops',
    'Complexity Upcharge',
]
const hardwareSubCategories = ['Applicance Pull', 'Knob', 'Knob/Pull', 'Pull']

export default function AddAccessoryPopover({
    onSubmit,
    label,
}: AddAccessoryPopoverProps) {
    const [form] = Form.useForm()
    const [filters, setFilters] = useState({})
    const [accessories, setAccessories] = useState([[], 0])

    const getAccessoriesData = async (queryFilters = filters) => {
        try {
            const query = getQueryString(queryFilters)
            const accessories = await getDefaultAccessories(query)

            setAccessories(accessories)
            setFilters(queryFilters)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAccessoriesData()
    }, [])

    const onValuesChange = () => {
        getAccessoriesData({
            ...filters,
            ...form.getFieldsValue(),
        })
    }

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
            render() {
                return <Checkbox />
            },
        },
    ]

    return (
        <JigModal label={label} title="Add Accessories">
            <Row className="roomspopover">
                <Form
                    initialValues={filters}
                    form={form}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        name="category"
                        help="Filter list by selecting an Accessory category"
                    >
                        <Select allowClear>
                            {hardwareCategories.map((hardware) => (
                                <Select.Option key={shortId()} value={hardware}>
                                    {hardware}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="classification"
                        help="Filter list by selecting an Accessory class"
                    >
                        <Select allowClear>
                            {hardwareSubCategories.map((hardware) => (
                                <Select.Option key={shortId()} value={hardware}>
                                    {capitalize(hardware)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="name" help="Search by Accessory name">
                        <Input />
                    </Form.Item>

                    <Table
                        // @ts-expect-error TS(2322): Type 'number | any[]' is not assignable to type 'r... Remove this comment to see the full error message
                        dataSource={accessories[0]}
                        columns={columns}
                        className="transparent-header clickable-table-row"
                        pagination={false}
                        size="small"
                        rowKey="id"
                        onRow={(accessory, rowIndex) => {
                            return {
                                // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
                                onClick: () => onSubmit(accessory, rowIndex),
                            }
                        }}
                    />
                </Form>
            </Row>
        </JigModal>
    )
}
