import {
    Button,
    Checkbox,
    Col,
    InputNumber,
    Row,
    Select,
    Table,
    Typography,
} from 'antd'
import React, { useContext, useState } from 'react'

import AddBaseCabinetPopover from './AddBaseCabinetPopover'

import { Link, useParams } from 'react-router-dom'
import DeleteSVG from '../../../../assets/images/delete'
import { CabinetContext } from '../../../../store/cabinets'
import {
    capitalize,
    getQueryString,
    shortId,
} from '../../../../utilities/utils'
import { interioFinishes, tableSelectStyle } from '../utils'

const { Text } = Typography

export default function TallCabinets() {
    const category = 'Tall'
    const params = useParams<{ id?: string }>()
    const [loading, setLoading] = useState(false)
    const cabinetCtx = useContext(CabinetContext)

    const { onCellChange } = cabinetCtx

    const onCheck = (name: string, row) => {
        return (event: { target: { checked: any } }) =>
            onCellChange(name, row)(event?.target?.checked)
    }

    const onDelete = (row: { id: any }) => {
        return async () => {
            try {
                setLoading(true)

                await cabinetCtx.onDeleteCabinet(row.id)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
    }

    const tallCabinetsColumns = [
        {
            title: 'Cabinet Type',
            key: 'name',
            dataIndex: 'name',
            width: 100,

            render(name, row: { id: any }) {
                return (
                    <Link
                        to={`/rooms/${params.id}/cabinets/tall-cabinets/overview/${row.id}`}
                    >
                        {name}
                    </Link>
                )
            },
        },
        {
            title: 'Interior Finish',
            key: 'interior',
            dataIndex: 'interior',

            render(interior: string, row) {
                return (
                    <Select
                        value={capitalize(interior)}
                        style={tableSelectStyle}
                        onChange={onCellChange('interior', row)}
                    >
                        {interioFinishes.map((interior) => (
                            <Select.Option value={interior} key={shortId()}>
                                {capitalize(interior)}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
        {
            title: 'Qty',
            key: 'quantity_parts',
            dataIndex: 'quantity_parts',

            render(quantity, row) {
                return (
                    <InputNumber
                        value={quantity}
                        style={tableSelectStyle}
                        onChange={onCellChange('quantity_parts', row)}
                    />
                )
            },
        },
        {
            title: 'Cabinet Width (Inches)',
            key: 'cabinet_width',
            dataIndex: 'cabinet_width',

            render(width, row) {
                return (
                    <InputNumber
                        value={width}
                        style={tableSelectStyle}
                        onChange={onCellChange('cabinet_width', row)}
                    />
                )
            },
        },
        {
            title: 'Cabinet Depth',
            key: 'cabinet_depth',
            dataIndex: 'cabinet_depth',

            render(depth, row) {
                return (
                    <InputNumber
                        value={depth}
                        style={tableSelectStyle}
                        onChange={onCellChange('cabinet_depth', row)}
                    />
                )
            },
        },
        {
            title: 'Floor to Top of Cabinet',
            key: 'cabinet_height',
            dataIndex: 'cabinet_height',

            render(value, row) {
                return (
                    <InputNumber
                        value={value}
                        style={tableSelectStyle}
                        onChange={onCellChange('cabinet_height', row)}
                    />
                )
            },
        },
        {
            title: 'Toe Kick',
            key: 'toe_kick_height',
            dataIndex: 'toe_kick_height',

            render(value, row) {
                return (
                    <InputNumber
                        value={value}
                        style={tableSelectStyle}
                        onChange={onCellChange('toe_kick_height', row)}
                    />
                )
            },
        },
        {
            title: 'Cabinet Height',
            key: 'cabinet_side_height',
            dataIndex: 'cabinet_side_height',
        },
        {
            title: 'Part Height',
            key: 'part_height',
            dataIndex: 'part_height',
        },
        {
            title: 'Base Door Quantity',
            children: [
                {
                    title: 'per Cab.',
                    key: 'base_door_quantity_per_cab',
                    dataIndex: 'base_door_quantity_per_cab',
                },
                {
                    title: 'Total',
                    key: 'total',
                    dataIndex: 'total',
                },
            ],
        },
        {
            title: 'Upper Door Quantity',
            children: [
                {
                    title: 'per Cab.',
                    key: 'upper_door_quantity_per_cab',
                    dataIndex: 'upper_door_quantity_per_cab',
                },
                {
                    title: 'Total',
                    key: 'total',
                    dataIndex: 'total',
                },
            ],
        },
        {
            title: 'Drawer Front Quantity',
            children: [
                {
                    title: 'per Cab.',
                    key: 'drawer_quantity_per_cab',
                    dataIndex: 'drawer_quantity_per_cab',
                },
                {
                    title: 'Total',
                    key: 'total',
                    dataIndex: 'total',
                },
            ],
        },
        {
            title: 'Drawer Quantity',
            children: [
                {
                    title: 'per Cab.',
                    key: 'drawer_front_quantity_per_cab',
                    dataIndex: 'drawer_front_quantity_per_cab',
                },
                {
                    title: 'Total',
                    key: 'total',
                    dataIndex: 'total',
                },
            ],
        },
        {
            title: 'Tray Quantity',
            children: [
                {
                    title: 'per Cab.',
                    key: 'tray_quantity_per_cab',
                    dataIndex: 'tray_quantity_per_cab',

                    render(value, row) {
                        return (
                            <InputNumber
                                value={value}
                                style={tableSelectStyle}
                                onChange={onCellChange(
                                    'tray_quantity_per_cab',
                                    row
                                )}
                            />
                        )
                    },
                },
                {
                    title: 'Total',
                    key: 'total',
                    dataIndex: 'total',
                },
            ],
        },
        {
            title: 'Shelves',
            children: [
                {
                    title: 'Fix.',
                    key: 'shelves_fix',
                    dataIndex: 'shelves_fix',

                    render(value, row) {
                        return (
                            <InputNumber
                                value={value}
                                style={tableSelectStyle}
                                onChange={onCellChange('shelves_fix', row)}
                            />
                        )
                    },
                },
                {
                    title: 'Adj.',
                    key: 'shelves_adj',
                    dataIndex: 'shelves_adj',

                    render(value, row) {
                        return (
                            <InputNumber
                                value={value}
                                onChange={onCellChange('shelves_adj', row)}
                            />
                        )
                    },
                },
            ],
        },
        {
            title: 'Face Frames',
            children: [
                {
                    title: "Addi'l Stiles",
                    key: 'face_frame_additional',
                    dataIndex: 'face_frame_additional',

                    render(value, row) {
                        return (
                            <InputNumber
                                value={value}
                                style={tableSelectStyle}
                                onChange={onCellChange(
                                    'face_frame_additional',
                                    row
                                )}
                            />
                        )
                    },
                },
                {
                    title: 'Sq. Ft..',
                    key: 'face_frames_square_feet',
                    dataIndex: 'face_frames_square_feet',
                },
            ],
        },
        {
            title: 'Comer',
            key: 'comer',
            dataIndex: 'comer',
            className: 'checkbox-cell',

            render(comer: boolean, row) {
                return (
                    <Checkbox
                        checked={comer}
                        onChange={onCheck('comer', row)}
                    />
                )
            },
        },
        {
            title: '# Fin',
            key: 'number_of_finish',
            dataIndex: 'number_of_finish',

            render(value, row) {
                return (
                    <InputNumber
                        value={value}
                        style={tableSelectStyle}
                        onChange={onCellChange('number_of_finish', row)}
                    />
                )
            },
        },
        {
            title: 'Ends',
            key: 'number_of_finish_ends',
            dataIndex: 'number_of_finish_ends',

            render(value) {
                return <Text>{value}</Text>
            },
        },
        {
            key: 'action',
            dataIndex: 'action',

            render(_, row: { id: any }) {
                return (
                    <Button
                        className="table-cell-icon-center"
                        icon={<DeleteSVG />}
                        onClick={onDelete(row)}
                    />
                )
            },
        },
    ]

    React.useEffect(() => {
        const filters = {
            category,
        }

        cabinetCtx.onGetRoomCabinets(params.id, getQueryString(filters))
    }, [])

    return (
        <Row align="middle">
            <Col span={10}>
                <AddBaseCabinetPopover
                    category={category}
                    label="Add a Tall Cabinet"
                />
            </Col>

            <Col>
                <Checkbox>Enter Manual Cabinet Width</Checkbox>
            </Col>

            <br />
            <br />
            <br />

            <Table
                dataSource={cabinetCtx.cabinets[0]}
                columns={tallCabinetsColumns}
                pagination={false}
                size="small"
                className="table-nopadding-cell cabinets-table"
                bordered
                rowKey="id"
                loading={loading}
            />
        </Row>
    )
}
