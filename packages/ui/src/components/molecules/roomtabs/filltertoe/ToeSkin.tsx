import { Button, Col, InputNumber, Row, Table } from 'antd'
import React, { useContext } from 'react'

import DeleteSVG from '../../../../assets/images/delete'
import { RenderCell, tableSelectStyle } from '../utils'
import AddFillerPopover from './AddFillerPopover'
import { FillerToeContext } from './store'

const footTableColumns = [
    {
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: 'Std. Length',
        key: 'standard_length',
        dataIndex: 'standard_length',

        render(value) {
            return <InputNumber style={tableSelectStyle} value={value} />
        },
    },
    {
        title: 'Quantity',
        key: 'quantity',
        dataIndex: 'quantity',
        render: RenderCell,
    },
    {
        title: 'Footage',
        key: 'footage',
        dataIndex: 'footage',
        render: RenderCell,
    },
    {
        title: 'Inches',
        key: 'inches',
        dataIndex: 'inches',
        render: RenderCell,
    },
]

export default function ToeSkin() {
    const category = 'Toe Board'
    const fillerToeCtx = useContext(FillerToeContext)

    // @ts-expect-error TS(2339): Property 'cabinets' does not exist on type '{}'.
    const { cabinets, onChange, onDelete, onCreate } = fillerToeCtx

    React.useEffect(() => {
        // @ts-expect-error TS(2339): Property 'getRoomCabinetsData' does not exist on t... Remove this comment to see the full error message
        fillerToeCtx.getRoomCabinetsData(category)
    }, [])

    const columns = [
        {
            title: 'Toe Board Type',
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
            title: 'Toe Length (inches)',
            key: 'toe_board_width',
            dataIndex: 'toe_board_width',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('toe_board_width', row)}
                    />
                )
            },
        },
        {
            title: 'Toe Height',
            key: 'toe_board_height',
            dataIndex: 'toe_board_height',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('toe_board_height', row)}
                    />
                )
            },
        },
        {
            title: 'Sq. Ft. per Toe Board',
            key: 'square_feet',
            dataIndex: 'square_feet',
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

    return (
        <Row>
            <Col span={24}>
                <AddFillerPopover
                    onSubmit={onCreate}
                    category={category}
                    label="Add a Toe Board"
                />
            </Col>

            <br />
            <br />
            <br />

            <Col span={24}>
                <Table
                    dataSource={cabinets[0]}
                    columns={columns}
                    size="small"
                    bordered
                    className="table-nopadding-cell"
                    pagination={false}
                    rowKey="id"
                />
            </Col>

            <Col>
                <br />
                <br />
                <Table
                    dataSource={[]}
                    columns={footTableColumns}
                    size="small"
                    className="table-nopadding-cell"
                    bordered
                    pagination={false}
                    rowKey="id"
                />
            </Col>
        </Row>
    )
}
