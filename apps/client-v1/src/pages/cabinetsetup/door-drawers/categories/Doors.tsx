import React, { useContext } from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Select,
    InputNumber,
    Typography,
    Button,
} from 'antd'
import {
    calcDiscount,
    safeNum,
    shortId,
    toFixed,
} from '../../../../utilities/utils'
import DoorDrawerMaterials from './DoorDrawerMaterials'
import { Link } from 'react-router-dom'
import { inputNumberCostProps } from '../../../../utilities'
import { DoorContext } from '../../../../store/door'

const tableSelectStyle = {}
const { Title } = Typography

function EmptyLabel() {
    return <span>&nbsp;</span>
}

function CostPerDoors({ source }) {
    return source === 'in' ? (
        <>
            <Col xs={12} md={6} lg={4}>
                <Form.Item
                    label="In-House Labor Cost"
                    name="in_house_labor_cost"
                >
                    {/* @ts-expect-error TS(2322): Type '{ style: {}; min: number; step: number; cont... Remove this comment to see the full error message */}
                    <InputNumber
                        {...inputNumberCostProps}
                        style={tableSelectStyle}
                    />
                </Form.Item>
            </Col>

            <Col xs={12} md={6} lg={4}>
                <Form.Item
                    label="Minimum Square Foot"
                    name="minimum_square_foot"
                >
                    <InputNumber style={tableSelectStyle} />
                </Form.Item>
            </Col>
        </>
    ) : (
        <>
            <Col xs={12} md={6} lg={4}>
                <Form.Item label="Outsource Door Cost" name="outsourced_cost">
                    {/* @ts-expect-error TS(2322): Type '{ style: {}; min: number; step: number; cont... Remove this comment to see the full error message */}
                    <InputNumber
                        {...inputNumberCostProps}
                        style={tableSelectStyle}
                    />
                </Form.Item>
            </Col>

            <Col xs={12} md={6} lg={4}>
                <Form.Item label="Discount" name="discount_percentage">
                    <InputNumber
                        formatter={(value) => `${value ? `${value}%` : ''}`}
                        parser={(value) => value!.replace('%', '')}
                        style={tableSelectStyle}
                    />
                </Form.Item>
            </Col>

            <Col xs={12} md={6} lg={4}>
                <Form.Item label="Discounted Cost" name="discount_cost">
                    {/* @ts-expect-error TS(2322): Type '{ style: {}; min: number; step: number; cont... Remove this comment to see the full error message */}
                    <InputNumber
                        {...inputNumberCostProps}
                        style={tableSelectStyle}
                    />
                </Form.Item>
            </Col>
        </>
    )
}

function DoorInOut() {
    return (
        <>
            <Row>
                <Col span={12}>
                    <Title level={4}>Options</Title>
                    <Form.Item label="Drill for hinge (Cost/Qty per door)">
                        <Input.Group compact>
                            <Form.Item
                                name={['hinge_drill', 'cost']}
                                help="Cost"
                            >
                                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                <InputNumber {...inputNumberCostProps} />
                            </Form.Item>
                            <Form.Item
                                name={['hinge_drill', 'quantity']}
                                help="Qty per door"
                            >
                                <InputNumber />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item label="Arch Top/Bottom (Cost/Qty per door)">
                        <Input.Group compact>
                            <Form.Item
                                name={['arch_top_bottom', 'cost']}
                                help="Cost"
                            >
                                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                <InputNumber {...inputNumberCostProps} />
                            </Form.Item>

                            <Form.Item
                                name={['arch_top_bottom', 'quantity']}
                                help="Qty per door"
                            >
                                <InputNumber />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Title level={4}>Additional Cost</Title>
                    <Input.Group compact>
                        <Form.Item
                            label={<EmptyLabel />}
                            name={['additional_cost', 'label']}
                            help="Label"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<EmptyLabel />}
                            name={['additional_cost', 'cost']}
                            help="Cost"
                        >
                            {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                            <InputNumber {...inputNumberCostProps} />
                        </Form.Item>
                    </Input.Group>
                    <Form.Item
                        label={<EmptyLabel />}
                        help="Measurement"
                        name={['additional_cost', 'measurement']}
                    >
                        <Select>
                            {[
                                'Per door/per SF',
                                'Per Linear Inch',
                                'Per Door',
                            ].map((option) => (
                                <Select.Option value={option} key={shortId()}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

function DoorMaterials({ door, source }) {
    const doorCtx = useContext(DoorContext)

    const inColumns = [
        {
            title: 'Material Name',
            dataIndex: 'name',
            key: 'name',

            render(name, row?: { id: any }) {
                return (
                    <Link to={`/cabinet-setup/materials/${row!.id}`}>
                        {name}
                    </Link>
                )
            },
        },
        {
            title: 'Material Cost',
            dataIndex: 'in_house_material_cost',
            key: 'in_house_material_cost',

            render(cost) {
                return `$${cost ?? 0}`
            },
        },
        {
            title: 'Waste Factor %',
            dataIndex: 'waste_factor',
            key: 'waste_factor',
        },
        {
            title: 'Material Cost with Waste Factor',
            dataIndex: 'material_cost_waste_factor',
            key: 'material_cost_waste_factor',

            render(
                _,
                row?: { in_house_material_cost: number; waste_factor: number }
            ) {
                return `${toFixed(
                    calcDiscount(
                        row!.in_house_material_cost,
                        row!.waste_factor
                    ) + safeNum(row!.in_house_material_cost)
                )}`
            },
        },
        {
            title: 'In-House Labour cost',
            dataIndex: 'in_house_labor_cost',
            key: 'in_house_labor_cost',
        },
    ]

    const outColumns = [
        {
            title: 'Material Name',
            dataIndex: 'name',
            key: 'name',

            render(name, row: { id: any }) {
                return (
                    <Link to={`/cabinet-setup/materials/${row.id}`}>
                        {name}
                    </Link>
                )
            },
        },
        {
            title: 'Material Cost',
            dataIndex: 'in_house_material_cost',
            key: 'in_house_material_cost',

            render(cost) {
                return `$${cost ?? 0}`
            },
        },
        {
            title: 'Dicount %',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Discounted Material Cost',
            dataIndex: 'in_discounted_cost',
            key: 'in_discounted_cost',

            render(cost: number) {
                return `$${toFixed(cost)}`
            },
        },
    ]

    const columns = source?.toLowerCase() === 'in' ? inColumns : outColumns

    // @ts-expect-error TS(2345): Argument of type '{ render(material: { id: any; })... Remove this comment to see the full error message
    columns.push({
        render(material: { id: any }) {
            return (
                <Button
                    type="link"
                    onClick={() => {
                        doorCtx.onRemoveDoorMaterial(door.id, material.id)
                    }}
                >
                    Remove
                </Button>
            )
        },
    })
    //@ts-ignore
    return <DoorDrawerMaterials columns={columns} door={door} />
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    CostPerDoors,
    DoorInOut,
    DoorMaterials,
}
