import { Button, message, Row, Select, Table, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

import { bulkUpdateDefaultMaterial } from '../../../api/materials'
import { tableSelectStyle } from '../../../components/molecules/roomtabs/utils'
import { MaterialContext } from '../../../store/materials'
import { createMaterialTableData } from '../../../utilities'
import { IN_OUT_SOURCE_OPTIONS } from '../../../utilities/constants'
import { shortId } from '../../../utilities/utils'
import {
    edgeProfileDisabled,
    finishProcessDisabled,
    finishProcessSourceDisabled,
    frameProfileDisabled,
    glazeColorDisabled,
    materialSourceDisabled,
    materialTblParameters,
    modelDescriptionDisabled,
    painStainDisabled,
    panelProfileDisabled,
} from './utils'

interface TitleWithButtonProps {
    title: string
    label: string
    onClick: () => Promise<any>
}

const { Text } = Typography
const selecStyle = {
    width: '150px',
}

function TitleWithButton({ title, label, onClick }: TitleWithButtonProps) {
    return (
        <Row style={{ flexDirection: 'column' }} align="middle">
            <Button size="small" onClick={onClick}>
                {label}
            </Button>
            <Text strong>{title}</Text>
        </Row>
    )
}

export default function MainExteriorMaterialTable({
    doors,

    panels,

    edges,

    frames,

    finishProcesses,

    paintColors,

    glazeColors,

    onChange,
}) {
    const materialCtx = useContext(MaterialContext)
    const [loading, setLoading] = useState(false)
    const { material, materials } = materialCtx

    useEffect(() => {
        setLoading(materialCtx.loading)
    }, [materialCtx.loading])

    const handleChange = async (id, row: { key: any }, columnKey: string) => {
        try {
            setLoading(true)

            await onChange(id, row, columnKey)

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const onMakeColumnSame = (columnName: string) => {
        return async () => {
            try {
                setLoading(true)
                //@ts-ignore
                const firtCellId = material.door_base?.[columnName] ?? ''

                if (!firtCellId) return message.info('Select first cell')

                const payload = materialTblParameters.reduce((data, field) => {
                    if (field.allowedColumns.includes(columnName)) {
                        data[field.key] = material[field.key] || {}

                        data[field.key][columnName] = firtCellId
                    }

                    return data
                }, {})

                //@ts-ignore
                await bulkUpdateDefaultMaterial(material.id, payload)

                //@ts-ignore
                materialCtx.setMaterial({ ...material, ...payload })
                message.success('Success!')
            } catch (error) {
                console.error(error)
                message.error('Failed!')
            } finally {
                setLoading(false)
            }
        }
    }

    const filterCellMaterials = (row: { door: any }) => {
        try {
            const materialList = materials[0]

            const door = doors.find((door: { id: any }) => door.id === row.door)

            if (!door) return materialList

            const materialTypeId = door?.material_type?.id
            const category = door?.category
            const vendorId = door?.vendor?.id
            //@ts-ignore
            const filteredMaterials = materialList.filter(
                (material: {
                    purpose: string
                    vendor: { id: any }
                    type: { id: any }
                }) => {
                    let isMatch =
                        material.purpose?.toLowerCase() ===
                        category?.toLowerCase()

                    isMatch = material.vendor?.id === vendorId
                    isMatch = material.type?.id === materialTypeId

                    return isMatch
                }
            )

            return filteredMaterials.length ? filteredMaterials : materialList
        } catch (error) {
            console.log(error)

            return []
        }
    }

    const columns = [
        {
            title: 'Exterior',
            dataIndex: 'exterior',
            key: 'exterior',
            width: 200,
        },
        {
            width: 200,
            title: (
                <TitleWithButton
                    title="Item Model-Description"
                    label="Same"
                    onClick={onMakeColumnSame('door')}
                />
            ),
            dataIndex: 'door',
            key: 'door',

            render(value, row: { key: any }) {
                if (modelDescriptionDisabled(row.key)) return null

                return (
                    <Select
                        style={selecStyle}
                        value={value}
                        onChange={(id) => handleChange(id, row, 'door')}
                    >
                        {doors.map((door: { id: any; name: any }) => {
                            return (
                                <Select.Option value={door.id} key={shortId()}>
                                    {door.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                )
            },
        },
        {
            width: 200,
            title: (
                <TitleWithButton
                    title="Source"
                    label="Same"
                    onClick={onMakeColumnSame('material_source')}
                />
            ),
            dataIndex: 'material_source',
            key: 'material_source',

            render(value, row: { key: any }) {
                if (materialSourceDisabled(row.key)) return

                return (
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    <Select
                        value={value}
                        onChange={(id) =>
                            handleChange(id, row, 'material_source')
                        }
                        style={tableSelectStyle}
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
            width: 200,
            title: (
                <TitleWithButton
                    title="Material"
                    label="Same"
                    onClick={onMakeColumnSame('material')}
                />
            ),
            dataIndex: 'material',
            key: 'material',

            render(value, row: { door: any }) {
                return (
                    <Select
                        style={selecStyle}
                        value={value}
                        //@ts-ignore
                        onChange={(id) => handleChange(id, row, 'material')}
                    >
                        {filterCellMaterials(row).map(
                            (material: { id: any; name: any }) => {
                                return (
                                    <Select.Option
                                        value={material.id}
                                        key={shortId()}
                                    >
                                        {material.name}
                                    </Select.Option>
                                )
                            }
                        )}
                    </Select>
                )
            },
        },
        {
            width: 200,
            title: (
                <TitleWithButton
                    title="Panel Profile"
                    label="Same"
                    onClick={onMakeColumnSame('panel_profile')}
                />
            ),
            dataIndex: 'panel_profile',
            key: 'panel_profile',

            render(value, row: { key: any }) {
                if (panelProfileDisabled(row.key)) return null

                return (
                    <Select
                        style={selecStyle}
                        value={value}
                        onChange={(id) =>
                            handleChange(id, row, 'panel_profile')
                        }
                    >
                        {panels.map((panel: { id: any; name: any }) => {
                            return (
                                <Select.Option value={panel.id} key={shortId()}>
                                    {panel.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                )
            },
        },
        {
            width: 200,
            title: (
                <TitleWithButton
                    title="Edge Profile"
                    label="Same"
                    onClick={onMakeColumnSame('edge_profile')}
                />
            ),
            dataIndex: 'edge_profile',
            key: 'edge_profile',

            render(value, row: { key: any }) {
                if (edgeProfileDisabled(row.key)) return null

                return (
                    <Select
                        style={selecStyle}
                        value={value}
                        onChange={(id) => handleChange(id, row, 'edge_profile')}
                    >
                        {edges.map((edge: { id: any; name: any }) => {
                            return (
                                <Select.Option value={edge.id} key={shortId()}>
                                    {edge.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                )
            },
        },
        {
            width: 200,
            title: (
                <TitleWithButton
                    title="Frame Profile"
                    label="Same"
                    onClick={onMakeColumnSame('frame_profile')}
                />
            ),
            dataIndex: 'frame_profile',
            key: 'frame_profile',

            render(value, row: { key: any }) {
                if (frameProfileDisabled(row.key)) return null

                return (
                    <Select
                        style={selecStyle}
                        value={value}
                        onChange={(id) =>
                            handleChange(id, row, 'frame_profile')
                        }
                    >
                        {frames.map((frame: { id: any; name: any }) => {
                            return (
                                <Select.Option value={frame.id} key={shortId()}>
                                    {frame.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                )
            },
        },
        {
            width: 200,
            title: (
                <TitleWithButton
                    title="Source"
                    label="Same"
                    onClick={onMakeColumnSame('finish_process_source')}
                />
            ),
            dataIndex: 'finish_process_source',
            key: 'finish_process_source',

            render(value, row: { key: any }) {
                if (finishProcessSourceDisabled(row.key)) return null

                return (
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    <Select
                        value={value}
                        onChange={(id) =>
                            handleChange(id, row, 'finish_process_source')
                        }
                        style={tableSelectStyle}
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
            width: 200,
            title: (
                <TitleWithButton
                    title="Finish Process"
                    label="Same"
                    onClick={onMakeColumnSame('finish_process')}
                />
            ),
            dataIndex: 'finish_process',
            key: 'finish_process',

            render(value, row: { key: any }) {
                if (finishProcessDisabled(row.key)) return null

                return (
                    <Select
                        style={selecStyle}
                        value={value}
                        onChange={(id) =>
                            handleChange(id, row, 'finish_process')
                        }
                    >
                        {finishProcesses.map(
                            (finish: { id: any; name: any }) => {
                                return (
                                    <Select.Option
                                        value={finish.id}
                                        key={shortId()}
                                    >
                                        {finish.name}
                                    </Select.Option>
                                )
                            }
                        )}
                    </Select>
                )
            },
        },
        {
            width: 200,
            title: (
                <TitleWithButton
                    title="Paint/Stain Color"
                    label="Same"
                    onClick={onMakeColumnSame('paint_stain_color')}
                />
            ),
            dataIndex: 'paint_stain_color',
            key: 'paint_stain_color',

            render(value, row: { key: any }) {
                if (painStainDisabled(row.key)) return null

                return (
                    <Select
                        style={selecStyle}
                        value={value}
                        onChange={(id) =>
                            handleChange(id, row, 'paint_stain_color')
                        }
                    >
                        {paintColors.map(
                            (paintColor: { id: any; name: any }) => {
                                return (
                                    <Select.Option
                                        value={paintColor.id}
                                        key={shortId()}
                                    >
                                        {paintColor.name}
                                    </Select.Option>
                                )
                            }
                        )}
                    </Select>
                )
            },
        },
        {
            width: 200,
            title: (
                <TitleWithButton
                    title="Glaze Color"
                    label="Same"
                    onClick={onMakeColumnSame('glaze_color')}
                />
            ),
            dataIndex: 'glaze_color',
            key: 'glaze_color',

            render(value, row: { key: any }) {
                if (glazeColorDisabled(row.key)) return null

                return (
                    <Select
                        style={selecStyle}
                        value={value}
                        onChange={(id) => handleChange(id, row, 'glaze_color')}
                    >
                        {glazeColors.map(
                            (glazeColor: { id: any; name: any }) => {
                                return (
                                    <Select.Option
                                        value={glazeColor.id}
                                        key={shortId()}
                                    >
                                        {glazeColor.name}
                                    </Select.Option>
                                )
                            }
                        )}
                    </Select>
                )
            },
        },
    ]

    return (
        <Table
            //@ts-ignore
            columns={columns}
            dataSource={createMaterialTableData(
                material,
                materialTblParameters,
                'exterior'
            )}
            pagination={false}
            rowKey="tableRowKey"
            className="transparent-header exterior-material-table"
            size="small"
            scroll={{ x: 1000 }}
            loading={loading}
        />
    )
}
