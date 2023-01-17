import { Button, Col, InputNumber, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import DeleteSVG from '../../../../assets/images/delete'

import { PanelContext } from '../../../../store/panels'
import { getQueryString } from '../../../../utilities/utils'
import { RenderCell, tableSelectStyle } from '../utils'
import AddPanelPopover from './AddPanelPopover'

function WainscotPanels() {
    const category = 'Wainscot Panel'
    const params = useParams<{ id?: string }>()
    const panelCtx = useContext(PanelContext)
    const [loading, setLoading] = useState(false)
    const filters = {
        category,
        is_default: true,
    }

    const { onCellChange } = panelCtx

    const onDelete = (row: { id: any }) => {
        return async () => {
            try {
                setLoading(true)

                await panelCtx.onDeletePanel(row.id)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
    }

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
                        onChange={onCellChange('quantity', row)}
                    />
                )
            },
        },
        {
            title: '# of Panels',
            key: 'number_of_panels',
            dataIndex: 'number_of_panels',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onCellChange('number_of_panels', row)}
                    />
                )
            },
        },
        {
            title: 'Panel Depth',
            key: 'cabinet_depth',
            dataIndex: 'cabinet_depth',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onCellChange('cabinet_depth', row)}
                    />
                )
            },
        },
        {
            title: 'Floor to top of Panels',
            key: 'floor_to_top_of_panels',
            dataIndex: 'floor_to_top_of_panels',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onCellChange('floor_to_top_of_panels', row)}
                    />
                )
            },
        },
        {
            title: 'Height to Bottom of Panel',
            key: 'height_to_bottom_of_panel',
            dataIndex: 'height_to_bottom_of_panel',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onCellChange(
                            'height_to_bottom_of_panel',
                            row
                        )}
                    />
                )
            },
        },
        {
            title: 'Toe Kick Height',
            key: 'toe_kick_height',
            dataIndex: 'toe_kick_height',

            render(value, row) {
                return (
                    <InputNumber
                        style={tableSelectStyle}
                        value={value}
                        onChange={onCellChange('toe_kick_height', row)}
                    />
                )
            },
        },
        {
            title: 'End Panel Height (inches)',
            key: 'end_panel_height',
            dataIndex: 'end_panel_height',
            render: RenderCell,
        },
        {
            title: 'End Panel Sq. Ft.',
            key: 'end_panel_square_ft',
            dataIndex: 'end_panel_square_ft',
            render: RenderCell,
        },
        {
            title: 'Style',
            key: 'style',
            dataIndex: 'style',
            render: RenderCell,
            width: 200,
        },
        {
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

        panelCtx.onGetRoomPanels(params.id, getQueryString(filters))
    }, [])

    return (
        <>
            <Col span={4}>
                <AddPanelPopover
                    allowTypeSelection
                    category={category}
                    filters={filters}
                    title="Add a Wainscot Panel"
                    label="Add a Wainscot Panel"
                />
            </Col>

            <br />
            <br />

            <Col>
                <Table
                    columns={columns}
                    // @ts-expect-error TS(2322): Type 'number | any[]' is not assignable to type 'r... Remove this comment to see the full error message
                    dataSource={panelCtx.panels[0]}
                    pagination={false}
                    size="small"
                    className="table-nopadding-cell cabinets-table"
                    bordered
                    rowKey="id"
                    loading={loading}
                />
            </Col>
        </>
    )
}

export default WainscotPanels
