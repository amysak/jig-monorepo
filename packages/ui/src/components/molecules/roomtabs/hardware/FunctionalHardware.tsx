import Icon from '@ant-design/icons'
import { Table } from 'antd'
import React, { useContext } from 'react'
import DeleteSVG from '../../../../assets/images/delete'

import { HardwareContext } from '../../../../store/hardwares'
import NestedTableHeader from './NestedTableHeader'
import { filterAccessoriesByCategory } from './utils'

export default function FunctionalHardware() {
    const hardwareCtx = useContext(HardwareContext)

    const onDelete = (accessoryId) => {
        return async () => {
            try {
                await hardwareCtx.onDeleteRoomSetupAccessory(accessoryId)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const columns = [
        {
            title: () => (
                <NestedTableHeader
                    title="Functional Hardware"
                    subtitle="Item Model Description"
                />
            ),
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Qty',
            key: 'quantity',
            dataIndex: 'quantity',
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
            key: 'action',
            dataIndex: 'action',

            render(_, row: { id: any }) {
                return (
                    <Icon
                        className=""
                        component={DeleteSVG}
                        onClick={onDelete(row.id)}
                    />
                )
            },
        },
    ]

    return (
        <>
            <Table
                columns={columns}
                // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
                dataSource={filterAccessoriesByCategory(
                    hardwareCtx.accessories[0],
                    'functional hardware'
                )}
                className="transparent-header"
                pagination={false}
                rowKey="id"
                size="small"
            />
        </>
    )
}
