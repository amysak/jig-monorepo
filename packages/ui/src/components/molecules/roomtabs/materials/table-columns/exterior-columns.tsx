import React from 'react'
import { Select } from 'antd'
import { tableSelectStyle } from '../../utils'

const exteriorColumns = [
    {
        title: 'Exterior',
        dataIndex: 'exterior',
        key: 'exterior',
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
        title: 'Source',
        dataIndex: 'material_source',
        key: 'material_source',
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
        title: 'Material',
        dataIndex: 'material',
        key: 'material',
        width: 200,
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
        title: 'Panel Profile',
        dataIndex: 'panel_profile',
        key: 'panel_profile',
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
        title: 'Edge Profile',
        dataIndex: 'edge_profile',
        key: 'edge_profile',
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
        title: 'Frame Profile Source',
        dataIndex: 'frame_profile_source',
        key: 'frame_profile_source',
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
        title: 'Source',
        dataIndex: 'finish_process_source',
        key: 'finish_process_source',
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
        title: 'Finish Process',
        dataIndex: 'finish_process',
        key: 'finish_process',
        width: 200,
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

export default exteriorColumns
