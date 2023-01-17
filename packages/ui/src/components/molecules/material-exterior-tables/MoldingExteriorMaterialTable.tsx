import React, { useContext, useEffect, useState } from 'react'
import { Table, Select } from 'antd'

import { shortId } from '../../../utilities/utils'
import { createMaterialTableData } from '../../../utilities'
import { MaterialContext } from '../../../store/materials'

interface MoldingExteriorMaterialTableProps {
    finishProcesses?: any[]
    paintColors?: any[]
    glazeColors?: any[]
    crowns?: any[]
    lightRails?: any[]
    onChange?: (id: any, row: any, columnKey: any) => Promise<void>
}

export default function MoldingExteriorMaterialTable({
    finishProcesses,

    paintColors,

    glazeColors,

    crowns,

    lightRails,

    onChange,
}: MoldingExteriorMaterialTableProps) {
    const materialCtx = useContext(MaterialContext)
    const [loading, setLoading] = useState(false)
    const { material } = materialCtx

    useEffect(() => {
        setLoading(materialCtx.loading)
    }, [materialCtx.loading])

    const handleChange = async (
        id,
        row: { data: { [x: string]: any[] } },
        columnKey: string
    ) => {
        try {
            setLoading(true)

            await onChange(id, row, columnKey)

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const moldingTableRowParameters = [
        {
            key: 'crown',
            dataIndex: 'crown',
            label: 'Crown',
            data: [crowns],
        },
        {
            key: 'light_rail',
            dataIndex: 'light_rail',
            label: 'Light Rail',
            data: [null, lightRails],
        },
    ]

    const moldingCols = [
        {
            title: 'Molding',
            dataIndex: 'molding',
            key: 'molding',
        },
        {
            title: 'Item Model-Description',
            dataIndex: 'trim',
            key: 'trim',

            render(
                value,
                row: { data: { [x: string]: any[] } },
                index: string | number
            ) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => handleChange(id, row, 'trim')}
                    >
                        {row.data?.[index]?.map(
                            (trim: { id: any; name: any }) => {
                                return (
                                    <Select.Option
                                        value={trim.id}
                                        key={shortId()}
                                    >
                                        {trim.name}
                                    </Select.Option>
                                )
                            }
                        )}
                    </Select>
                )
            },
        },
        {
            title: 'Finish Process',
            dataIndex: 'finish_process',
            key: 'finish_process',

            render(value, row: { data: { [x: string]: any[] } }) {
                return (
                    <Select
                        value={value}
                        onChange={(id) =>
                            handleChange(id, row, 'finish_process')
                        }
                    >
                        {finishProcesses?.map((finish) => {
                            return (
                                <Select.Option
                                    value={finish.id}
                                    key={shortId()}
                                >
                                    {finish.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                )
            },
        },
        {
            title: 'Paint/Stain Color',
            dataIndex: 'paint_stain_color',
            key: 'paint_stain_color',

            render(value, row: { data: { [x: string]: any[] } }) {
                return (
                    <Select
                        value={value}
                        onChange={(id) =>
                            handleChange(id, row, 'paint_stain_color')
                        }
                    >
                        {paintColors?.map((paintColor) => {
                            return (
                                <Select.Option
                                    value={paintColor.id}
                                    key={shortId()}
                                >
                                    {paintColor.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                )
            },
        },
        {
            title: 'Glaze Door',
            dataIndex: 'glaze_color',
            key: 'glaze_color',

            render(value, row: { data: { [x: string]: any[] } }) {
                return (
                    <Select
                        value={value}
                        onChange={(id) => handleChange(id, row, 'glaze_color')}
                    >
                        {glazeColors?.map((glazeColor) => {
                            return (
                                <Select.Option
                                    value={glazeColor.id}
                                    key={shortId()}
                                >
                                    {glazeColor.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                )
            },
        },
    ]

    return (
        <Table
            columns={moldingCols}
            dataSource={createMaterialTableData(
                material,
                moldingTableRowParameters,
                'molding'
            )}
            rowKey="tableRowKey"
            pagination={false}
            size="small"
            loading={loading}
        />
    )
}
