import Icon, { PlusOutlined } from '@ant-design/icons'
import { Button, Col, InputNumber, message, Row, Select, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'

import { getSetupFinishes } from '../../../../api/finishes'
import {
    createTrimMolding,
    deleteOneTrim,
    getDefaultTrims,
    getRoomTrimsMolding, TGetTrimsData, updateTrimMolding
} from '../../../../api/trims'
import DeleteSVG from '../../../../assets/images/delete'
import { MaterialContext } from '../../../../store/materials'
import { capitalize, shortId } from '../../../../utilities/utils'
import MoldingExteriorMaterialTable from '../../material-exterior-tables/MoldingExteriorMaterialTable'
import { tableSelectStyle } from '../utils'
import AddTrimMoldingPopover from './AddTrimMoldingPopover'

const tableProps = {
    pagination: false,
    rowKey: 'id',
    size: 'small',
}

const initialData = []

export default function TrimMolding() {
    const params = useParams<{ id?: string }>()
    const materialCtx = useContext(MaterialContext)
    const [loading] = useState(false)
    const [trimMoldings, setTrimMoldings] = useState<TGetTrimsData>([[], 0])

    const [finishProcesses, setFinishProcesses] = useState(initialData)

    const [paintColors, setPaintColors] = useState(initialData)

    const [glazeColors, setGlazeColors] = useState(initialData)

    const [crowns, setCrowns] = useState(initialData)

    const [lightRails, setLighRails] = useState(initialData)

    const getData = async () => {
        try {
            const [
                finishProcesses,
                paintColors,
                glazeColors,
                crowns,
                lightRails,
            ] = await Promise.all([
                // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
                getSetupFinishes('?category=Finish Process', 'finishProcesses'),

                // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
                getSetupFinishes('?category=Paint Colors', 'paintColors'),

                // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
                getSetupFinishes('?category=Glaze Colors', 'glazeColors'),
                getDefaultTrims('?subclassification=Crown'),
                getDefaultTrims('?subclassification=Light Rail'),
            ])

            setFinishProcesses(finishProcesses[0])
            setPaintColors(paintColors[0])
            setGlazeColors(glazeColors[0])
            setCrowns(crowns[0])
            setLighRails(lightRails[0])
        } catch (error) {
            console.error(error)
        }
    }

    const getTrimMoldings = async () => {
        try {
            const trimMoldings = await getRoomTrimsMolding(params.id)

            await getData()

            setTrimMoldings(trimMoldings)
        } catch (error) {
            console.log(error)
        }
    }

    const onChange = (name: string, row: { id: any }) => {
        return async (value) => {
            try {
                await updateTrimMolding(row.id, { [name]: value })

                const updatedTrimMoldings = trimMoldings[0]?.map(
                    (trimMolding: { id: any }) => {
                        if (trimMolding.id === row.id) {
                            return { ...trimMolding, [name]: value }
                        }

                        return trimMolding
                    }
                )

                setTrimMoldings([
                    updatedTrimMoldings,
                    updatedTrimMoldings.length,
                ] as TGetTrimsData)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const onDelete = (row: { id: any }) => {
        return async () => {
            try {
                await deleteOneTrim(row.id)

                const list = trimMoldings[0].filter(
                    (trimMolding: { id: any }) => {
                        return trimMolding.id !== row.id
                    }
                )

                setTrimMoldings([list, list.length])
            } catch (error) {
                console.log(error)
            }
        }
    }

    const onCreateRoomTrimMolding = async (trim) => {
        try {
            const payload = {
                ...trim,
                id: undefined,
                is_default: false,

                room: params.id,
            }
            const trimMolding = await createTrimMolding(payload)

            const newTrimMoldingList = [...trimMoldings[0], trimMolding]

            setTrimMoldings([newTrimMoldingList, newTrimMoldingList.length])
        } catch (error) {
            console.log(error)
        }
    }

    const onCrownTrimChange = async (
        id,
        row: { key: string | number; id: any },
        columnKey
    ) => {
        try {
            const rest = materialCtx.material[row.key]
                ? materialCtx.material[row.key]
                : {}
            const payload = {
                [row.key]: {
                    ...rest,
                    id: row.id,
                    [columnKey]: id,
                },
            }

            await materialCtx.update(payload)

            message.success('Success!')
        } catch (error) {
            message.error('Failed!')
            console.log(error)
        }
    }

    const trimMoldColumns = [
        {
            title: 'Item Model Description',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Enter Linear Feet',
            key: 'square_feet',
            dataIndex: 'square_feet',

            render(squareFeet, row: { id: any }) {
                return (
                    <InputNumber
                        value={squareFeet}
                        onChange={onChange('square_feet', row)}
                    />
                )
            },
        },
        {
            title: 'Enter Quantity',
            key: 'number_of_finished_sides',
            dataIndex: 'number_of_finished_sides',

            render(quantity, row: { id: any }) {
                return (
                    <InputNumber
                        value={quantity}
                        onChange={onChange('number_of_finished_sides', row)}
                    />
                )
            },
        },
        {
            title: 'Suggested Quantity',
            key: 'suggested_quantity',
            dataIndex: 'suggested_quantity',
        },
        {
            title: 'Select Finish Complexity',
            key: 'trim_finish_type',
            dataIndex: 'trim_finish_type',

            render(finishType, row: { id: any }) {
                return (
                    <Select
                        value={finishType}
                        style={tableSelectStyle}
                        onChange={onChange('trim_finish_type', row)}
                    >
                        {['simple', 'complex', 'none'].map((option) => (
                            <Select.Option value={option} key={shortId()}>
                                {capitalize(option)}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
        },
        {
            title: 'Material Cost',
            key: 'material_cost',
            dataIndex: 'material_cost',

            render(materialCost, row: { id: any }) {
                return (
                    <InputNumber
                        value={materialCost}
                        onChange={onChange('material_cost', row)}
                    />
                )
            },
        },
        {
            title: 'Installation Labor',
            key: 'installation_labor_cost',
            dataIndex: 'installation_labor_cost',

            render(installationLabor, row: { id: any }) {
                return (
                    <InputNumber
                        value={installationLabor}
                        onChange={onChange('installation_labor_cost', row)}
                    />
                )
            },
        },
        {
            title: 'Shop Labor',
            key: 'shop_labor_cost',
            dataIndex: 'shop_labor_cost',

            render(shopLabor, row: { id: any }) {
                return (
                    <InputNumber
                        value={shopLabor}
                        onChange={onChange('shop_labor_cost', row)}
                    />
                )
            },
        },
        {
            key: 'action',
            dataIndex: 'action',

            render(_, row: { id: any }) {
                return (
                    <Icon
                        className=""
                        component={DeleteSVG}
                        onClick={onDelete(row)}
                    />
                )
            },
        },
    ]

    const suggestedTableColumns = [
        {
            title: '',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Inches',
            key: 'inches',
            dataIndex: 'inches',
        },
        {
            title: 'Feet',
            key: 'feet',
            dataIndex: 'feet',
        },
        {
            title: '# of Pieces',
            key: 'number_of_pieces',
            dataIndex: 'number_of_pieces',
        },
        {
            render() {
                return <Icon className="" component={DeleteSVG} />
            },
        },
    ]

    React.useEffect(() => {
        getTrimMoldings()

        materialCtx.getMaterialByRoomId(params.id)
    }, [])

    return (
        <Col>
            <Row className="bordered-row">
                <Col span={5}>
                    <Button
                        size="small"
                        className="jig-button"
                        icon={<PlusOutlined />}
                    >
                        Add Standard Crown and Light Rail
                    </Button>
                </Col>

                <Col offset={1} span={18}>
                    <MoldingExteriorMaterialTable
                        finishProcesses={finishProcesses}
                        paintColors={paintColors}
                        glazeColors={glazeColors}
                        crowns={crowns}
                        lightRails={lightRails}
                        onChange={onCrownTrimChange}
                    />
                </Col>
            </Row>

            <Row className="bordered-row">
                <Col span={24}>
                    <AddTrimMoldingPopover
                        loading={loading}
                        onSubmit={onCreateRoomTrimMolding}
                        label="Add Trim or Molding"
                    />
                </Col>

                <Col span={24} style={{ marginTop: '10px' }}>
                    {/* @ts-ignore */}
                    <Table
                        columns={trimMoldColumns}
                        dataSource={trimMoldings[0]}
                        {...tableProps}
                        loading={loading}
                    />
                </Col>
            </Row>

            <Row className="bordered-row">
                <Col>
                    {/* @ts-expect-error TS(2322): Type '{ pagination: boolean; rowKey: string; size:... Remove this comment to see the full error message */}
                    <Table
                        columns={suggestedTableColumns}
                        dataSource={[]}
                        {...tableProps}
                    />
                </Col>
            </Row>
        </Col>
    )
}
