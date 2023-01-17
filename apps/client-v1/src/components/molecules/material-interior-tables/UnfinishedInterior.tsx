import React from 'react'
import { Select, Table } from 'antd'

import { shortId } from '../../../utilities/utils'
import { IN_OUT_SOURCE_OPTIONS } from '../../../utilities/constants'
import { createMaterialTableData } from '../../../utilities'

const tblParams = [
    {
        key: 'unfinished_interior',
        label: 'Unfinished Interior',
    },
]

export default function UnifinisedMaterial({
    onChange,

    material,

    interiorExteriorMaterials,

    backMaterials,

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
            title: 'Source',
            dataIndex: 'material_source',
            key: 'material_source',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => onChange(id, row, 'material_source')}
                    >
                        {IN_OUT_SOURCE_OPTIONS.map((source) => (
                            <Select.Option value={source.value} key={shortId()}>
                                {source.label}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
        {
            title: 'Unfinished Interior Material',
            dataIndex: 'material',
            key: 'material',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => onChange(id, row, 'material')}
                    >
                        {interiorExteriorMaterials.map(
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
            title: 'Unfinished Interior Back Material',
            dataIndex: 'back_material',
            key: 'back_material',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => onChange(id, row, 'back_material')}
                    >
                        {backMaterials.map((curr: { id: any; name: any }) => (
                            <Select.Option value={curr.id} key={shortId()}>
                                {curr.name}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
        {
            title: 'Unfinished Interior Finished Shelf Material',
            dataIndex: 'shelf_material',
            key: 'shelf_material',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => onChange(id, row, 'shelf_material')}
                    >
                        {interiorExteriorMaterials.map(
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
            title: 'Source',
            dataIndex: 'finish_process_source',
            key: 'finish_process_source',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) =>
                            onChange(id, row, 'finish_process_source')
                        }
                    >
                        {IN_OUT_SOURCE_OPTIONS.map((source) => (
                            <Select.Option value={source.value} key={shortId()}>
                                {source.label}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
        {
            title: 'Unfinished Interior Finish Process',
            dataIndex: 'finish_process',
            key: 'finish_process',

            render(value, row) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => onChange(id, row, 'finish_process')}
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
