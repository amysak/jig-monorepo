import Icon from '@ant-design/icons'
import { Col, InputNumber, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import {
    createRoomAccessory,
    deleteOneAccessory,
    getRoomAccessories,
    updateAccessory,
} from '../../../../api/accessories'
import DeleteSVG from '../../../../assets/images/delete'
import AddAccessoryPopover from './AddAccessoryPopover'

export default function Accessories() {
    const params = useParams<{ id?: string }>()
    const [, setLoading] = useState(false)
    const [accessories, setAccessories] = useState([[], 0])

    const onChange = (name: string, row: { id: any }) => {
        return async (value) => {
            try {
                await updateAccessory(row.id, { [name]: value })

                // @ts-expect-error TS(2339): Property 'map' does not exist on type 'number | an... Remove this comment to see the full error message
                const updatedList = accessories[0].map(
                    (access: { id: any }) => {
                        if (access.id === row.id) {
                            return { ...access, [name]: value }
                        }

                        return access
                    }
                )

                setAccessories([updatedList, updatedList.length])
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getAccessoriesData = async () => {
        try {
            const accessories = await getRoomAccessories(params.id)

            setAccessories(accessories)
        } catch (error) {}
    }

    const createOneRoomAccessory = async (accessory) => {
        try {
            setLoading(true)
            const payload = {
                ...accessory,
                room: params.id,
                id: undefined,
                is_default: false,
            }

            const createdAccess = await createRoomAccessory(payload)

            const list = [...accessories[0], createdAccess]

            setAccessories([list, list.length])
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const onDelete = (row: { id: any }) => {
        return async () => {
            try {
                await deleteOneAccessory(row.id)

                // @ts-expect-error TS(2339): Property 'filter' does not exist on type 'number |... Remove this comment to see the full error message
                const list = accessories[0].filter((access: { id: any }) => {
                    return access.id !== row.id
                })

                setAccessories([list, list.length])
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        getAccessoriesData()
    }, [])

    const columns = [
        {
            title: 'Item Model-Description',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Qty',
            key: 'quantity',
            dataIndex: 'quantity',

            render(value, row: { id: any }) {
                return (
                    <InputNumber
                        value={value}
                        onChange={onChange('quantity', row)}
                    />
                )
            },
        },
        {
            title: 'Material Cost',
            key: 'material_cost',
            dataIndex: 'material_cost',

            render(value, row: { id: any }) {
                return (
                    <InputNumber
                        value={value}
                        onChange={onChange('material_cost', row)}
                    />
                )
            },
        },
        {
            title: 'Installation Labor',
            key: 'installation_labor_cost',
            dataIndex: 'installation_labor_cost',

            render(value, row: { id: any }) {
                return (
                    <InputNumber
                        value={value}
                        onChange={onChange('installation_labor_cost', row)}
                    />
                )
            },
        },
        {
            title: 'Shop Labor',
            key: 'shop_labor_cost',
            dataIndex: 'shop_labor_cost',

            render(value, row: { id: any }) {
                return (
                    <InputNumber
                        value={value}
                        onChange={onChange('shop_labor_cost', row)}
                    />
                )
            },
        },
        {
            key: 'action',
            dataIndex: 'action',

            render(_, row: { id: any }) {
                return (
                    <Icon
                        className=""
                        component={DeleteSVG}
                        onClick={onDelete(row)}
                    />
                )
            },
        },
    ]

    return (
        <Row>
            <Col span={24}>
                <AddAccessoryPopover
                    onSubmit={createOneRoomAccessory}
                    label="Add Accessories"
                />
            </Col>

            <br />
            <br />
            <br />
            <br />

            <Col span={24}>
                <Table
                    columns={columns}
                    // @ts-expect-error TS(2322): Type 'number | any[]' is not assignable to type 'r... Remove this comment to see the full error message
                    dataSource={accessories[0]}
                    pagination={false}
                    size="small"
                    className="table-nopadding-cell"
                    rowKey="id"
                />
            </Col>
        </Row>
    )
}
