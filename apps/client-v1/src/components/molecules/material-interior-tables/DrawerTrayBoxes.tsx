import React from 'react'
import { Table, Typography, Select } from 'antd'

import { capitalize, shortId } from '../../../utilities/utils'
import { tableSelectStyle } from '../roomtabs/utils'
import { IN_OUT_SOURCE_OPTIONS } from '../../../utilities/constants'
import { createMaterialTableData } from '../../../utilities'

const { Text, Title } = Typography

const cabinetTrayDrawerTypes = ['metal box', 'five piece']

export default function DrawerTrayBoxes({
    onChange,

    material,

    interiorExteriorMaterials,

    drawerBoxes,

    trays,

    paintColors,

    finishProcesses,
}) {
    const tblRows = [
        {
            id: shortId(),
            key: 'drawer_box',
            label: 'Drawer Box',
            data: [drawerBoxes],
        },
        {
            id: shortId(),
            key: 'tray',
            label: 'Pull-Out Tray',
            data: [null, trays],
        },
    ]

    const columns = [
        {
            title: '',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Item Model-Description',
            dataIndex: 'door',
            key: 'door',

            render(
                v,
                row: { data: { [x: string]: any[] } },
                index: string | number
            ) {
                return (
                    <Select
                        value={v}
                        style={tableSelectStyle}
                        onChange={(id) => onChange(id, row, 'door')}
                    >
                        {row?.data[index].map(
                            (option: { id: any; name: any }) => (
                                <Select.Option
                                    value={option.id}
                                    key={shortId()}
                                >
                                    {option.name}
                                </Select.Option>
                            )
                        )}
                    </Select>
                )
            },
        },
        {
            title: 'Bottom',
            dataIndex: 'bottom',
            key: 'bottom',

            render(
                v,
                row: { data: { [x: string]: any[] } },
                index: string | number
            ) {
                return (
                    <Select
                        value={v}
                        style={tableSelectStyle}
                        onChange={(id) => onChange(id, row, 'door')}
                    >
                        {row?.data[index].map(
                            (option: { id: any; name: any }) => (
                                <Select.Option
                                    value={option.id}
                                    key={shortId()}
                                >
                                    {option.name}
                                </Select.Option>
                            )
                        )}
                    </Select>
                )
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',

            render(v, row, _index) {
                return (
                    <Select
                        value={v}
                        style={{ width: '100%' }}
                        onChange={(id) => onChange(id, row, 'type')}
                    >
                        {cabinetTrayDrawerTypes.map((type) => (
                            <Select.Option value={type} key={shortId()}>
                                {capitalize(type)}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
        {
            title: 'Source',
            dataIndex: 'material_source',
            key: 'material_source',

            render(v, row, _index) {
                return (
                    <Select
                        value={v}
                        style={tableSelectStyle}
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
            title: 'Material',
            dataIndex: 'material',
            key: 'material',

            render(v, row, _index) {
                return (
                    <Select
                        value={v}
                        style={tableSelectStyle}
                        onChange={(id) => onChange(id, row, 'material')}
                    >
                        {interiorExteriorMaterials.map(
                            (option: { id: any; name: any }) => (
                                <Select.Option
                                    value={option.id}
                                    key={shortId()}
                                >
                                    {option.name}
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

            render(v, row, _index) {
                return (
                    <Select
                        value={v}
                        style={tableSelectStyle}
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
            title: 'Finish Process',
            dataIndex: 'finish_process',
            key: 'finish_process',

            render(v, row, _index) {
                return (
                    <Select
                        value={v}
                        style={tableSelectStyle}
                        onChange={(id) => onChange(id, row, 'finish_process')}
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
            title: 'Paint/Stain Color',
            dataIndex: 'paint_stain_color',
            key: 'paint_stain_color',

            render(v, row, _index) {
                return (
                    <Select
                        value={v}
                        style={tableSelectStyle}
                        onChange={(id) =>
                            onChange(id, row, 'paint_stain_color')
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
    ]

    return (
        <>
            <Title level={4}>Drawer and Tray Boxes</Title>
            <Text strong>
                Select Default Drawer types or select each material below (leave
                nothing blank)
            </Text>

            <Table
                columns={columns}
                dataSource={createMaterialTableData(
                    material,
                    tblRows,
                    'property'
                )}
                className="table-nopadding-cell"
                pagination={false}
                rowKey="tableRowKey"
                bordered
                size="small"
            />

            <br />
            <br />
        </>
    )
}
