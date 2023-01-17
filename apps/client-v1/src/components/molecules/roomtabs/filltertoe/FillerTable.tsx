import { Button, Col, InputNumber, Row, Table, Typography } from 'antd'
import React, { useContext, useEffect } from 'react'

import DeleteSVG from '../../../../assets/images/delete'
import { tableSelectStyle } from '../utils'
import AddFillerPopover from './AddFillerPopover'
import { FillerToeContext } from './store'

const { Text } = Typography

export default function FillerTable() {
    const category = 'Filler'
    const fillerToeCtx = useContext(FillerToeContext)

    // @ts-expect-error TS(2339): Property 'cabinets' does not exist on type '{}'.
    const { cabinets, onChange, onDelete, onCreate } = fillerToeCtx

    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Qty',
            key: 'quantity',
            dataIndex: 'quantity',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('quantity', row)}
                    />
                )
            },
        },
        {
            title: 'Width',
            key: 'filler_width',
            dataIndex: 'filler_width',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('filler_width', row)}
                    />
                )
            },
        },
        {
            title: 'Floor to Top of Filler',
            key: 'floor_to_top_of_filler',
            dataIndex: 'floor_to_top_of_filler',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('floor_to_top_of_filler', row)}
                    />
                )
            },
        },
        {
            title: 'Height to Bottom of Filler',
            key: 'height_to_bottom_of_filler',
            dataIndex: 'height_to_bottom_of_filler',
        },
        {
            title: 'Cabinet Height',
            key: 'cabinet_height',
            dataIndex: 'cabinet_height',
        },
        {
            title: 'Toe Kick',
            key: 'toe_kick_height',
            dataIndex: 'toe_kick_height',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('toe_kick_height', row)}
                    />
                )
            },
        },
        {
            title: 'Height',
            key: 'filler_height',
            dataIndex: 'filler_height',

            render(_, row: { cabinet_height: any; toe_kick_height: any }) {
                return (
                    // @ts-expect-error TS(2304): Cannot find name 'toFixed'.
                    // eslint-disable-next-line no-undef
                    toFixed(row.cabinet_height) - toFixed(row.toe_kick_height)
                )
            },
        },
        {
            title: 'Filler Sq. Ft.',
            key: 'filler_square_feet',
            dataIndex: 'filler_square_feet',
        },
        {
            render(_, row) {
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

    useEffect(() => {
        // @ts-expect-error TS(2339): Property 'getRoomCabinetsData' does not exist on t... Remove this comment to see the full error message
        fillerToeCtx.getRoomCabinetsData(category)
    }, [])

    return (
        <Row align="middle">
            <Col span={20}>
                <Text strong>Calculated Filler Quantities</Text>
            </Col>

            <Col span={24}>
                <AddFillerPopover
                    onSubmit={onCreate}
                    category={category}
                    label="Add a Filler"
                />
            </Col>

            <br />
            <br />
            <br />

            <Col span={24}>
                <Table
                    columns={columns}
                    dataSource={cabinets[0]}
                    pagination={false}
                    size="small"
                    bordered
                    className="table-nopadding-cell"
                    rowKey="id"
                />
            </Col>
        </Row>
    )
}
