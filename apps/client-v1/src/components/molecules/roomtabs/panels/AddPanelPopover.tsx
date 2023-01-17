import { Col, Form, Input, Select, Table } from 'antd'
import indefinite from 'indefinite'
import React, { useContext, useState } from 'react'

import { useParams } from 'react-router'
import { getSetupPanels, TGetSetupPanelsData } from '../../../../api/panels'
import { PanelContext } from '../../../../store/panels'
import { getQueryString, shortId } from '../../../../utilities/utils'
import JigModal from '../../../organisms/modal'
import panelsPopoverColumns from './table-columns/panel-popover-columns'

interface AddPanelPopoverProps {
    allowTypeSelection: boolean
    category: string
    filters:
        | { category: string }
        | { type: string }
        | { category: string; is_default: boolean }
    title: string
    label: string
}

export const panelTypes = ['Base', 'Upper', 'Tall', 'Vanity']

function AddPanelPopover({
    label,

    title,

    category,

    filters,

    allowTypeSelection,
}: AddPanelPopoverProps) {
    const [form] = Form.useForm()
    const params = useParams<{ id?: string }>()
    const [loading, setLoading] = useState()
    const [panels, setPanels] = useState<TGetSetupPanelsData>([[], 0])
    const panelCtx = useContext(PanelContext)
    const [queryFilters, setQueryFilters] = useState(filters)

    const getCabinets = async (filters = queryFilters) => {
        try {
            const query = getQueryString(filters)
            const panels = await getSetupPanels(query)

            setPanels(panels)
            setQueryFilters(filters)
        } catch (error) {
            console.log(error)
        }
    }

    const onRowClick = (panel) => {
        return async () => {
            try {
                // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
                setLoading(true)

                await panelCtx.onCreateRoomPanel(
                    { ...panel, category },

                    params.id
                )
            } catch (error) {
                console.error(error)
            } finally {
                // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
                setLoading(false)
            }
        }
    }

    const onValuesChange = (value) => {
        getCabinets({
            ...queryFilters,
            ...value,
        })
    }

    React.useEffect(() => {
        getCabinets(queryFilters)
    }, [])

    return (
        <JigModal label={label} title={title}>
            <Form
                form={form}
                layout="vertical"
                className="roomspopover"
                onValuesChange={onValuesChange}
                initialValues={queryFilters}
            >
                {allowTypeSelection ? (
                    <Form.Item name="type" help="Search by Cabinet Type">
                        <Select style={{ width: '200px' }} allowClear>
                            {panelTypes.map((panelType) => (
                                <Select.Option
                                    value={panelType}
                                    key={shortId()}
                                >
                                    {panelType}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                ) : null}

                <Form.Item label="Search by name" name="name">
                    <Input style={{ width: '200px' }} />
                </Form.Item>

                <Col span={24} className="table-col-wrapper">
                    <Form.Item
                        label={`Choose ${indefinite(
                            category
                        )} from the list below`}
                    >
                        <Table
                            columns={panelsPopoverColumns}
                            dataSource={panels[0]}
                            pagination={false}
                            loading={loading}
                            rowKey="id"
                            size="small"
                            onRow={(panel) => {
                                return {
                                    onClick: onRowClick(panel),
                                }
                            }}
                        />
                    </Form.Item>
                </Col>
            </Form>
        </JigModal>
    )
}

export default AddPanelPopover
