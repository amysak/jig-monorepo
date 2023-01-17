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
    countNoneEmptyObjList,
    getQueryString,
    shortId,
    toFixed,
} from '../../../../utilities/utils'
import { interioFinishes, tableSelectStyle } from '../utils'

const { Text } = Typography

export default function UpperCabinets() {
    const category = 'Upper'
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

    const upperCabinetsColumns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            width: 100,

            render(name, row: { id: any }) {
                return (
                    <Link
                        to={`/rooms/${params.id}/cabinets/upper-cabinets/overview/${row.id}`}
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
            title: 'Floor to Bottom of Upper',
            key: 'floor_to_bottom_of_upper',
            dataIndex: 'floor_to_bottom_of_upper',

            render(value, row) {
                return (
                    <InputNumber
                        value={value}
                        style={tableSelectStyle}
                        onChange={onCellChange('floor_to_bottom_of_upper', row)}
                    />
                )
            },
        },
        {
            title: 'Cabinet Side Height',
            key: 'cabinet_side_height',
            dataIndex: 'cabinet_side_height',

            render(
                value,
                cabinet: { cabinet_height: any; toe_kick_height: any }
            ) {
                return (
                    // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
                    toFixed(cabinet.cabinet_height) -
                    // @ts-expect-error TS(2363): The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
                    toFixed(cabinet.toe_kick_height)
                )
            },
        },
        {
            title: 'Part Height',
            key: 'part_height',
            dataIndex: 'part_height',
        },
        {
            title: 'Upper Door Quantity',
            children: [
                {
                    title: 'per Cab.',
                    key: 'upper_doors',
                    dataIndex: 'upper_doors',
                },
                {
                    title: 'Total',
                    key: 'upper_doors',
                    dataIndex: 'upper_doors',
                },
            ],
        },
        {
            title: 'Drawer Front Quantity',
            children: [
                {
                    title: 'per Cab.',
                    key: 'number_of_drawer_fronts',
                    dataIndex: 'number_of_drawer_fronts',
                },
                {
                    title: 'Total',
                    key: 'number_of_drawer_fronts',
                    dataIndex: 'number_of_drawer_fronts',
                },
            ],
        },
        {
            title: 'Drawer Quantity',
            children: [
                {
                    title: 'per Cab.',
                    key: 'drawer_quantity_per_cab',
                    dataIndex: 'drawer_quantity_per_cab',

                    render(value, cabinet: { drawer_part: any }) {
                        return countNoneEmptyObjList(cabinet.drawer_part)
                    },
                },
                {
                    title: 'Total',
                    key: 'total',
                    dataIndex: 'total',

                    render(value, cabinet: { drawer_part: any }) {
                        return countNoneEmptyObjList(cabinet.drawer_part)
                    },
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

                    render(value, cabinet: { tray_part: any }) {
                        return countNoneEmptyObjList(cabinet.tray_part)
                    },
                },
                {
                    title: 'Total',
                    key: 'total',
                    dataIndex: 'total',

                    render(value, cabinet: { tray_part: any }) {
                        return countNoneEmptyObjList(cabinet.tray_part)
                    },
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

                    render(
                        value,
                        cabinet: {
                            specification: {
                                upper: { number_of_fixed_shelves: any }
                            }
                        }
                    ) {
                        return cabinet.specification?.upper
                            ?.number_of_fixed_shelves
                    },
                },
                {
                    title: 'Adj.',
                    key: 'shelves_adj',
                    dataIndex: 'shelves_adj',

                    render(
                        value,
                        cabinet: {
                            specification: {
                                upper: { number_of_fixed_shelves: any }
                            }
                        }
                    ) {
                        return cabinet.specification?.upper
                            ?.number_of_fixed_shelves
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
            title: '# of Fin Ends',
            key: 'number_of_finish_ends',
            dataIndex: 'number_of_finish_ends',

            render(value, _row) {
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
                    label="Add a Upper Cabinet"
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
                columns={upperCabinetsColumns}
                pagination={false}
                size="small"
                className="table-nopadding-cell cabinets-table"
                rowKey="id"
                bordered
                loading={loading}
            />
        </Row>
    )
}
