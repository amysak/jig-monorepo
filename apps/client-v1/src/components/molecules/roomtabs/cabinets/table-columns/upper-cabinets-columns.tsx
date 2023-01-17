import { Button, Checkbox, InputNumber, Select, Typography } from 'antd'
import React from 'react'
import { tableSelectStyle } from '../../utils'

import DeleteSVG from '../../../../../assets/images/delete'
import { shortId } from '../../../../../utilities/utils'

const interioFinishes = ['U', 'F']
const { Text } = Typography

const upperCabinetsColumns = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: 'Interior Finish',
        key: 'interior',
        dataIndex: 'interior',

        render(interior: string) {
            const value = interior ? interior.charAt(0).toUpperCase() : ''

            return (
                <Select value={value} style={tableSelectStyle}>
                    {interioFinishes.map((finish) => (
                        <Select.Option value={finish} key={shortId()}>
                            {finish}
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

        render(quantity) {
            return <InputNumber value={quantity} style={tableSelectStyle} />
        },
    },
    {
        title: 'Cabinet Width (Inches)',
        key: 'cabinet_width',
        dataIndex: 'cabinet_width',

        render(width) {
            return <InputNumber value={width} style={tableSelectStyle} />
        },
    },
    {
        title: 'Cabinet Depth',
        key: 'cabinet_depth',
        dataIndex: 'cabinet_depth',

        render(depth) {
            return <InputNumber value={depth} style={tableSelectStyle} />
        },
    },
    {
        title: 'Floor to Top of Cabinet',
        key: 'cabinet_height',
        dataIndex: 'cabinet_height',

        render(value) {
            return <InputNumber value={value} style={tableSelectStyle} />
        },
    },
    {
        title: 'Floor to Bottom of Upper',
        key: 'floor_to_bottom_of_upper',
        dataIndex: 'floor_to_bottom_of_upper',

        render(value) {
            return <InputNumber value={value} style={tableSelectStyle} />
        },
    },
    {
        title: 'Cabinet Side Height',
        key: 'cabinet_side_height',
        dataIndex: 'cabinet_side_height',
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
        title: 'Drawer Quantity',
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
        title: 'Tray Quantity',
        children: [
            {
                title: 'per Cab.',
                key: 'tray_quantity_per_cab',
                dataIndex: 'tray_quantity_per_cab',

                render(value) {
                    return (
                        <InputNumber value={value} style={tableSelectStyle} />
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

                render(value) {
                    return (
                        <InputNumber value={value} style={tableSelectStyle} />
                    )
                },
            },
            {
                title: 'Adj.',
                key: 'shelves_adj',
                dataIndex: 'shelves_adj',

                render(value) {
                    return <InputNumber value={value} />
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

                render(value) {
                    return (
                        <InputNumber value={value} style={tableSelectStyle} />
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

        render(comer) {
            return <Checkbox checked={!!comer} />
        },
    },
    {
        title: '# Fin',
        key: 'number_of_finish',
        dataIndex: 'number_of_finish',

        render(value) {
            return <InputNumber value={value} style={tableSelectStyle} />
        },
    },
    {
        title: 'Ends',
        key: 'number_of_finish_ends',
        dataIndex: 'number_of_finish_ends',

        render(value) {
            return (
                <>
                    <Text>{value}</Text>
                    <Button
                        className="table-cell-icon-center"
                        icon={<DeleteSVG />}
                    />
                </>
            )
        },
    },
]

export default upperCabinetsColumns
