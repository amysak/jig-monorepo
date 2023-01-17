import { Checkbox, Col, Form, Input, Table } from 'antd'
import indefinite from 'indefinite'
import React, { useState } from 'react'

import { useParams } from 'react-router'
import { getSetupCabinets, TGetSetupCabinets } from '../../../../api/cabinets'
import { capitalize, getQueryString } from '../../../../utilities/utils'
import JigModal from '../../../organisms/modal'

interface AddFillerPopoverProps {
    onSubmit: any
    category: string
    label: string
}

const columns = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        width: 300,
    },
    {
        title: 'Cabinet Height',
        key: 'cabinet_height',
        dataIndex: 'cabinet_height',
    },
    {
        title: 'Filler Height',
        key: 'filler_height',
        dataIndex: 'filler_height',
    },
    {
        title: 'Toe Kick Height',
        key: 'toe_kick_height',
        dataIndex: 'toe_kick_height',
    },
    {
        title: 'Filler Width',
        key: 'filler_width',
        dataIndex: 'filler_width',
    },
    {
        title: 'Favorite',
        key: 'favorite',
        dataIndex: 'favorite',

        render(checked: boolean) {
            return <Checkbox checked={checked} />
        },
    },
]

export default function AddFillerPopover({
    label,
    category,
    onSubmit,
}: AddFillerPopoverProps) {
    const [cabinets, setCabinets] = useState<TGetSetupCabinets>([[], 0])
    const [form] = Form.useForm()
    const params = useParams<{ id?: string }>()
    const [filters, setFilters] = useState({ category })

    const getCabinetsData = async (queryFilters = filters) => {
        try {
            const query = getQueryString(queryFilters)
            const cabinets = await getSetupCabinets(query)

            setFilters(queryFilters)
            setCabinets(cabinets)
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        getCabinetsData(filters)
    }, [])

    const onHandleSubmit = (row) => {
        return () =>
            onSubmit({ ...row, category, room: params.id, id: undefined })
    }

    const onValuesChange = async () => {
        getCabinetsData({
            ...filters,
            ...form.getFieldsValue(),
        })
    }

    return (
        <JigModal label={label} title={`Add ${capitalize(category)}`}>
            <Form
                initialValues={filters}
                form={form}
                layout="vertical"
                className="roomspopover"
                onValuesChange={onValuesChange}
            >
                <Form.Item name="name" help="Search by name">
                    <Input
                        placeholder="Search by name"
                        style={{ width: '200px' }}
                    />
                </Form.Item>

                <Col span={24} className="table-col-wrapper">
                    <Form.Item
                        label={`Choose ${indefinite(
                            category
                        )} from the list below`}
                    >
                        <Table
                            columns={columns}
                            dataSource={cabinets[0]}
                            pagination={false}
                            size="small"
                            bordered
                            rowKey="id"
                            onRow={(cabinet) => {
                                return {
                                    onClick: onHandleSubmit(cabinet),
                                }
                            }}
                        />
                    </Form.Item>
                </Col>
            </Form>
        </JigModal>
    )
}
