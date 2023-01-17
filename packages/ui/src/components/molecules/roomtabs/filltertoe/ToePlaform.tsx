import { Button, Col, InputNumber, Row, Table } from 'antd'
import React, { useContext, useEffect } from 'react'

import DeleteSVG from '../../../../assets/images/delete'
import { tableSelectStyle } from '../utils'
import AddFillerPopover from './AddFillerPopover'
import { FillerToeContext } from './store'

export default function BasePlatform() {
    const category = 'Toe Platform'
    const fillerToeCtx = useContext(FillerToeContext)

    // @ts-expect-error TS(2339): Property 'cabinets' does not exist on type '{}'.
    const { cabinets, onChange, onDelete, onCreate } = fillerToeCtx

    const columns = [
        {
            title: 'Toe Platform Name',
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
            title: 'Platform Height',
            key: 'part_height',
            dataIndex: 'part_height',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('part_height', row)}
                    />
                )
            },
        },
        {
            title: 'Platform Depth (inches)',
            key: 'part_depth',
            dataIndex: 'part_depth',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('part_depth', row)}
                    />
                )
            },
        },
        {
            title: 'Platform Length',
            key: 'platform_length',
            dataIndex: 'platform_length',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('platform_length', row)}
                    />
                )
            },
        },
        {
            title: 'Thick',
            key: 'thick',
            dataIndex: 'thick',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('thick', row)}
                    />
                )
            },
        },
        {
            title: '# of Ends',
            key: 'number_of_ends',
            dataIndex: 'number_of_ends',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('number_of_ends', row)}
                    />
                )
            },
        },
        {
            title: '# of Sleepers',
            key: 'number_of_sleepers',
            dataIndex: 'number_of_sleepers',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('number_of_sleepers', row)}
                    />
                )
            },
        },
        {
            title: 'Total # of Parts',
            key: 'number_of_parts',
            dataIndex: 'number_of_parts',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onChange('number_of_parts', row)}
                    />
                )
            },
        },
        {
            title: 'Sq. Ft. per Assembly',
            key: 'square_feet_per_assembly',
            dataIndex: 'square_feet_per_assembly',
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
        <Row>
            <Col span={24}>
                <AddFillerPopover
                    onSubmit={onCreate}
                    category={category}
                    label="Add a Toe Platform"
                />
            </Col>

            <br />
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
        </Row>
    )
}
