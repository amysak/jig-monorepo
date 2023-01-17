import React from 'react'
import { Select, Table } from 'antd'

import { shortId } from '../../../utilities/utils'
import { tableSelectStyle } from '../roomtabs/utils'
import { createMaterialTableData } from '../../../utilities'

const tblParams = [
    {
        key: 'finished_exterior',
        label: 'Finished Exterior',
    },
]

export default function FinishedExterior({
    onChange,

    material,

    finishendMaterials,

    finishProcesses,

    paintColors,

    glazeColors,
}) {
    const columns = [
        {
            title: '',
            dataIndex: 'property',
            key: 'property',
        },
        {
            title: 'Finished Interior Finished End Material',
            dataIndex: 'end_material',
            key: 'end_material',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => onChange(id, row, 'end_material')}
                        style={tableSelectStyle}
                    >
                        {finishendMaterials.map(
                            (curr: { id: any; name: any }) => (
                                <Select.Option value={curr.id} key={shortId()}>
                                    {curr.name}
                                </Select.Option>
                            )
                        )}
                    </Select>
                )
            },
        },
        {
            title: 'Finished Interior Finished Bottom Material',
            dataIndex: 'bottom_material',
            key: 'bottom_material',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => onChange(id, row, 'bottom_material')}
                        style={tableSelectStyle}
                    >
                        {finishendMaterials.map(
                            (curr: { id: any; name: any }) => (
                                <Select.Option value={curr.id} key={shortId()}>
                                    {curr.name}
                                </Select.Option>
                            )
                        )}
                    </Select>
                )
            },
        },
        {
            title: 'Finished Exterior Finish Process',
            dataIndex: 'finish_process',
            key: 'finish_process',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => onChange(id, row, 'finish_process')}
                        style={tableSelectStyle}
                    >
                        {finishProcesses.map((curr: { id: any; name: any }) => (
                            <Select.Option value={curr.id} key={shortId()}>
                                {curr.name}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
        {
            title: 'Paint/Stain Color',
            dataIndex: 'paint_stain_color',
            key: 'paint_stain_color',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) =>
                            onChange(id, row, 'paint_stain_color')
                        }
                        style={tableSelectStyle}
                    >
                        {paintColors.map((curr: { id: any; name: any }) => (
                            <Select.Option value={curr.id} key={shortId()}>
                                {curr.name}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
        {
            title: 'Glaze Color',
            dataIndex: 'glaze_color',
            key: 'glaze_color',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => onChange(id, row, 'glaze_color')}
                        style={tableSelectStyle}
                    >
                        {glazeColors.map((curr: { id: any; name: any }) => (
                            <Select.Option value={curr.id} key={shortId()}>
                                {curr.name}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
    ]

    return (
        <Table
            columns={columns}
            dataSource={createMaterialTableData(
                material,
                tblParams,
                'property'
            )}
            className="table-nopadding-cell"
            pagination={false}
            rowKey="tableRowKey"
            bordered
            size="small"
        />
    )
}
