import React from 'react'
import { Select } from 'antd'
import { tableSelectStyle } from '../../utils'

const moldingColumns = [
    {
        title: 'Molding',
        dataIndex: 'molding',
        key: 'molding',
    },
    {
        title: 'Item Model Description',
        dataIndex: 'item_model_decription',
        key: 'item_model_decription',
        render() {
            return (
                <Select style={tableSelectStyle}>
                    {[].map(() => (


                        // @ts-expect-error TS(2741): Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
                        <Select.Option></Select.Option>
                    ))}
                </Select>
            )
        },
    },
    {
        title: 'Length',
        dataIndex: 'length',
        key: 'length',
        className: 'centered',
    },
    {
        title: 'Finish Process',
        dataIndex: 'finish_process',
        key: 'finish_process',
        render() {
            return (
                <Select style={tableSelectStyle}>
                    {[].map(() => (


                        // @ts-expect-error TS(2741): Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
                        <Select.Option></Select.Option>
                    ))}
                </Select>
            )
        },
    },
    {
        title: 'Paint/Stain Color',
        dataIndex: 'paint_stain_color',
        key: 'paint_stain_color',
        render() {
            return (
                <Select style={tableSelectStyle}>
                    {[].map(() => (


                        // @ts-expect-error TS(2741): Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
                        <Select.Option></Select.Option>
                    ))}
                </Select>
            )
        },
    },
    {
        title: 'Glaze Color',
        dataIndex: 'glaze_color',
        key: 'glaze_color',
        render() {
            return (
                <Select style={tableSelectStyle}>
                    {[].map(() => (


                        // @ts-expect-error TS(2741): Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
                        <Select.Option></Select.Option>
                    ))}
                </Select>
            )
        },
    },
]

export default moldingColumns
