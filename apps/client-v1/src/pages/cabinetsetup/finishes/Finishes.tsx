import {
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Table,
    Typography,
} from 'antd'
import debounce from 'lodash/debounce'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { sendNotificationRequest } from '../../../actions/notification'
import {
    getFinish,
    getFinishes,
    TGetSetupFinishesData,
    updateFinish,
} from '../../../api/finishes'
import UILayout from '../../../components/templates/uilayout'
import { store } from '../../../store'
import {
    inputNumberCostProps,
    inputNumberPercentProps,
} from '../../../utilities'
import {
    ACTIVE_INACTIVE_STATUSES_OPTIONS,
    FINISH_CATEGORIES_OPTIONS,
    FINISH_CLASSIFICATIONS_OPTIONS,
} from '../../../utilities/constants'
import {
    calcDiscountSalePrice,
    capitalize,
    getQueryString,
    safeNum,
    setTableRowClass,
    shortId,
    sleep,
    toFixed,
} from '../../../utilities/utils'
import { PageHeader } from './components'

import './style.scss'

interface FinishFormProps {
    finish: { id?: string }
    setFinish: Dispatch<SetStateAction<any>>
}

const { Title, Text } = Typography
const inputStyle = {
    width: '80%',
}

const finishProcessFormLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
}

function Filter() {
    const [form] = Form.useForm()
    const params = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [finishes, setFinishes] = useState<TGetSetupFinishesData>([[], 0])

    const scrollToMaterial = () => {
        const finRow = document.querySelector(`.selected-row`)

        if (finRow) finRow.scrollIntoView()
    }

    const getData = async (filters: Record<string, any> | undefined) => {
        try {
            setLoading(true)

            const query = getQueryString(filters!)
            const finishes = await getFinishes(query)

            setFinishes(finishes)
        } catch {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        getData()

        sleep(1000).then(scrollToMaterial)
    }, [])

    const columns = [
        {
            dataIndex: 'name',
            key: 'name',
        },
        {
            dataIndex: 'category',
            key: 'category',

            render(category: string) {
                return capitalize(category)
            },
        },
    ]

    const onValuesChange = (filters: Record<string, any> | undefined) => {
        getData(filters)
    }

    return (
        <Col span={6}>
            <Form
                form={form}
                onValuesChange={onValuesChange}
                layout="vertical"
                className="pagewrapper__leftside"
            >
                <Title level={4}>Finishes</Title>
                <Form.Item label="Status" name="status">
                    <Select allowClear>
                        {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
                            <Select.Option key={shortId()} value={status.value}>
                                {status.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Category" name="category">
                    <Select allowClear>
                        {FINISH_CATEGORIES_OPTIONS.map((option) => (
                            <Select.Option value={option.value} key={shortId()}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Classification" name="classification">
                    <Select>
                        {FINISH_CLASSIFICATIONS_OPTIONS.map((option) => (
                            <Select.Option value={option.value} key={shortId()}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={finishes[0]}
                        pagination={false}
                        showHeader={false}
                        rowClassName={setTableRowClass(params.id)}
                        style={{
                            height: window.innerHeight - 100,
                            overflow: 'auto',
                        }}
                        size="small"
                        onRow={(row) => {
                            return {
                                onClick: () =>
                                    navigate(
                                        `/cabinet-setup/finishes/${row.id}`
                                    ),
                            }
                        }}
                    />
                </Form.Item>
            </Form>
        </Col>
    )
}

function FinishForm({ finish }: FinishFormProps) {
    const [form] = Form.useForm()
    const [, setLoading] = useState(false)

    console.log(finish, ' ====')

    const onValuesChange = debounce(
        async (
            value,
            values: {
                finishing_cost_two_sides: number
                supplier_discount: number
            }
        ) => {
            try {
                setLoading(true)
                const finishedCostPerSide =
                    safeNum(values.finishing_cost_two_sides) / 2
                const discountedMatCostPerSqFt =
                    finishedCostPerSide * safeNum(values.supplier_discount)

                const payload = Object.assign({}, values, {
                    finishing_cost_per_side: finishedCostPerSide,
                    discounted_material_cost_per_square_feet:
                        discountedMatCostPerSqFt,
                })
                //@ts-ignore
                await updateFinish(finish.id, payload)

                store.dispatch(
                    sendNotificationRequest({
                        message: 'Update successfully.',
                        type: 'success',
                    })
                )
            } catch (error) {
                console.log(error)
                store.dispatch(
                    sendNotificationRequest({
                        message: 'Update failed.',
                        type: 'error',
                    })
                )
            } finally {
                setLoading(false)
            }
        },
        1000
    )

    useEffect(() => {
        form.resetFields()
    }, [finish])

    return (
        <Col span={18}>
            <div className="pagewrapper__maincontent">
                <Form
                    onValuesChange={onValuesChange}
                    form={form}
                    layout="vertical"
                    initialValues={finish}
                >
                    <Row>
                        <Col span={8}>
                            <Form.Item label="Name" name="name">
                                <Input style={inputStyle} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Category" name="category">
                                <Select style={inputStyle}>
                                    {FINISH_CATEGORIES_OPTIONS.map((option) => (
                                        <Select.Option
                                            value={option.value}
                                            key={shortId()}
                                        >
                                            {option.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Classification"
                                name="classification"
                            >
                                <Select style={inputStyle}>
                                    {FINISH_CLASSIFICATIONS_OPTIONS.map(
                                        (option) => (
                                            <Select.Option
                                                value={option.value}
                                                key={shortId()}
                                            >
                                                {option.label}
                                            </Select.Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Description" name="description">
                                <Input.TextArea rows={6} style={inputStyle} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Internal Note (non-printable)"
                                name="internal_note"
                            >
                                <Input.TextArea rows={6} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />

                    <Form.Item shouldUpdate>
                        {() => {
                            const isFinishProcess =
                                form
                                    .getFieldValue('category')
                                    ?.toLowerCase() === 'finish process'

                            if (!isFinishProcess) return null

                            return (
                                <Row>
                                    <Col span={24}>
                                        <Title level={4}>Finish Process</Title>
                                    </Col>

                                    <Col span={12} className="bordered-row">
                                        <Title level={4}>
                                            Finish Material Cost per Sq. Ft.
                                        </Title>

                                        <Row>
                                            <Col offset={10} span={7}>
                                                <Text strong>Complex</Text>
                                            </Col>

                                            <Col span={7}>
                                                <Text strong>Simple</Text>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            name="finishing_cost_two_sides"
                                            label="Finishing Cost Two Sides"
                                            extra="÷ 2 sides"
                                            className="row"
                                            {...finishProcessFormLayout}
                                        >
                                            {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                            <InputNumber
                                                {...inputNumberCostProps}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Finishing Cost per Side"
                                            className="row item-with-help"
                                            {...finishProcessFormLayout}
                                            shouldUpdate
                                            help="X"
                                        >
                                            {() => {
                                                const costPerSide =
                                                    safeNum(
                                                        form.getFieldValue(
                                                            'finishing_cost_two_sides'
                                                        )
                                                    ) / 2

                                                return `$${costPerSide}`
                                            }}
                                        </Form.Item>

                                        <Form.Item
                                            name="supplier_discount"
                                            label="Supplier Discount %"
                                            className="row"
                                            {...finishProcessFormLayout}
                                        >
                                            {/* @ts-expect-error TS(2322): Type '{ min: number; max: number; formatter: (valu... Remove this comment to see the full error message */}
                                            <InputNumber
                                                {...inputNumberPercentProps}
                                            />
                                        </Form.Item>
                                        <Divider />

                                        <Form.Item
                                            label="Discount Material Cost"
                                            help="—"
                                            className="row item-with-help"
                                            {...finishProcessFormLayout}
                                            shouldUpdate
                                        >
                                            {() => {
                                                const costPerSide =
                                                    safeNum(
                                                        form.getFieldValue(
                                                            'finishing_cost_two_sides'
                                                        )
                                                    ) / 2
                                                const disountPrice =
                                                    calcDiscountSalePrice(
                                                        costPerSide,
                                                        form.getFieldValue(
                                                            'supplier_discount'
                                                        )
                                                    )

                                                return `$${toFixed(
                                                    disountPrice
                                                )}`
                                            }}
                                        </Form.Item>

                                        <Form.Item
                                            name="in_house_per_square_feet_cost"
                                            label="In-house per Sq. Ft. Cost"
                                            className="row"
                                            {...finishProcessFormLayout}
                                        >
                                            {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                            <InputNumber
                                                {...inputNumberCostProps}
                                            />
                                        </Form.Item>

                                        <Divider />

                                        <Form.Item
                                            label="In-house Finishing Labor Cost for One Side"
                                            className="row item-with-help"
                                            {...finishProcessFormLayout}
                                        >
                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item name="in_house_finishing_labor_cost">
                                                        {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                                        <InputNumber
                                                            {...inputNumberCostProps}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                    <Form.Item
                                                        name="in_house_finishing_labor_cost"
                                                        help="X"
                                                    >
                                                        {/* @ts-expect-error TS(2322): Type '{ disabled: true; min: number; step: number;... Remove this comment to see the full error message */}
                                                        <InputNumber
                                                            {...inputNumberCostProps}
                                                            disabled
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                        <Form.Item
                                            label="Simple % per Sq. Ft."
                                            className="row"
                                            {...finishProcessFormLayout}
                                        >
                                            <Row>
                                                <Col offset={12} span={12}>
                                                    <Form.Item name="simple_percent_per_sqare_feet">
                                                        {/* @ts-expect-error TS(2322): Type '{ min: number; max: number; formatter: (valu... Remove this comment to see the full error message */}
                                                        <InputNumber
                                                            {...inputNumberPercentProps}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                        <Divider />

                                        <Form.Item
                                            label="Simple per Sq. Ft. Labor Cost"
                                            className="row"
                                            {...finishProcessFormLayout}
                                        >
                                            <Row>
                                                <Col offset={12} span={12}>
                                                    <Form.Item shouldUpdate>
                                                        {() => {
                                                            const inHouseLaborCost =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'in_house_finishing_labor_cost'
                                                                    )
                                                                )
                                                            const squareFeet =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'simple_percent_per_sqare_feet'
                                                                    )
                                                                )

                                                            const laborCost =
                                                                (inHouseLaborCost *
                                                                    squareFeet) /
                                                                100

                                                            return `$${toFixed(
                                                                laborCost
                                                            )}`
                                                        }}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12} className="bordered-row">
                                        <Title level={4}>
                                            Finish Material Cost per Part
                                        </Title>

                                        <Row>
                                            <Col offset={10} span={7}>
                                                <Text strong>Complex</Text>
                                            </Col>

                                            <Col span={7}>
                                                <Text strong>Simple</Text>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            label="Outsourced Cost per part of Two Sides"
                                            className="row item-with-help"
                                            {...finishProcessFormLayout}
                                        >
                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item name="outsourced_cost_per_parts_of_two_sides">
                                                        {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                                        <InputNumber
                                                            {...inputNumberCostProps}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                    <Form.Item
                                                        name="outsourced_cost_per_parts_of_two_sides"
                                                        help="X"
                                                    >
                                                        {/* @ts-expect-error TS(2322): Type '{ disabled: true; min: number; step: number;... Remove this comment to see the full error message */}
                                                        <InputNumber
                                                            {...inputNumberCostProps}
                                                            disabled
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                        <Form.Item
                                            label="Simple % per Part"
                                            className="row"
                                            {...finishProcessFormLayout}
                                        >
                                            <Row>
                                                <Col offset={12} span={12}>
                                                    <Form.Item name="simple_percent_per_part">
                                                        {/* @ts-expect-error TS(2322): Type '{ min: number; max: number; formatter: (valu... Remove this comment to see the full error message */}
                                                        <InputNumber
                                                            {...inputNumberPercentProps}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col offset={12} span={12}>
                                                    <Form.Item shouldUpdate>
                                                        {() => {
                                                            const outsourced =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'outsourced_cost_per_parts_of_two_sides'
                                                                    )
                                                                )
                                                            const percentPerPart =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'simple_percent_per_part'
                                                                    )
                                                                )
                                                            const simplePercentPerPart =
                                                                toFixed(
                                                                    (outsourced *
                                                                        percentPerPart) /
                                                                        100
                                                                )

                                                            return `$${simplePercentPerPart}`
                                                        }}
                                                    </Form.Item>
                                                </Col>

                                                <Divider />
                                            </Row>
                                        </Form.Item>

                                        <Row>
                                            <Col offset={10} span={7}>
                                                <Text>÷ 2 sides</Text>
                                            </Col>

                                            <Col span={7}>
                                                <Text>÷ 2 sides</Text>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            label="Finishing Cost per Side"
                                            className="row item-with-help"
                                            {...finishProcessFormLayout}
                                        >
                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item
                                                        shouldUpdate
                                                        help="X"
                                                    >
                                                        {() => {
                                                            const outsourced =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'outsourced_cost_per_parts_of_two_sides'
                                                                    )
                                                                ) / 2

                                                            return `$${toFixed(
                                                                outsourced
                                                            )}`
                                                        }}
                                                    </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                    <Form.Item
                                                        shouldUpdate
                                                        help="X"
                                                    >
                                                        {() => {
                                                            const outsourced =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'outsourced_cost_per_parts_of_two_sides'
                                                                    )
                                                                )
                                                            const percentPerPart =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'simple_percent_per_part'
                                                                    )
                                                                )
                                                            const simplePercentPerPart =
                                                                (outsourced *
                                                                    percentPerPart) /
                                                                100

                                                            return `$${toFixed(
                                                                simplePercentPerPart /
                                                                    2
                                                            )}`
                                                        }}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                        <Form.Item
                                            label="Supplier Discount %"
                                            className="row"
                                            {...finishProcessFormLayout}
                                        >
                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item name="supplier_discount">
                                                        <InputNumber disabled />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                    <Form.Item name="supplier_discount">
                                                        <InputNumber disabled />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Divider />

                                        <Form.Item
                                            label="Discounted Material Cost"
                                            className="row"
                                            {...finishProcessFormLayout}
                                        >
                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item shouldUpdate>
                                                        {() => {
                                                            const outsourced =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'outsourced_cost_per_parts_of_two_sides'
                                                                    )
                                                                ) / 2
                                                            const supplierDiscount =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'supplier_discount'
                                                                    )
                                                                )

                                                            const discountedMaterialCost =
                                                                calcDiscountSalePrice(
                                                                    outsourced,
                                                                    supplierDiscount
                                                                )

                                                            return `$${toFixed(
                                                                discountedMaterialCost
                                                            )}`
                                                        }}
                                                    </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                    <Form.Item shouldUpdate>
                                                        {() => {
                                                            const outsourced =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'outsourced_cost_per_parts_of_two_sides'
                                                                    )
                                                                )
                                                            const percentPerPart =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'simple_percent_per_part'
                                                                    )
                                                                )
                                                            const supplierDiscount =
                                                                safeNum(
                                                                    form.getFieldValue(
                                                                        'supplier_discount'
                                                                    )
                                                                )
                                                            const simplePercentPerPart =
                                                                (outsourced *
                                                                    percentPerPart) /
                                                                2
                                                            const discountedMaterialCost =
                                                                calcDiscountSalePrice(
                                                                    simplePercentPerPart,
                                                                    supplierDiscount
                                                                ) / 100

                                                            return `$${toFixed(
                                                                discountedMaterialCost
                                                            )}`
                                                        }}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )
                        }}
                    </Form.Item>
                </Form>
            </div>
        </Col>
    )
}

export default function Finishes() {
    const [, setLoading] = useState(false)
    const params = useParams<{ id?: string }>()
    const [finish, setFinish] = useState({})

    const getData = async () => {
        try {
            setLoading(true)

            const finish = await getFinish(params.id)

            setFinish(finish)
        } catch (e) {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <UILayout
            ToolbarContent={
                <PageHeader
                    allowAlter
                    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
                    label={finish?.name}
                    parent={{ label: 'Finishes', path: '/finishes' }}
                />
            }
        >
            <Row className="pagewrapper">
                <Filter />

                <FinishForm finish={finish} setFinish={setFinish} />
            </Row>
        </UILayout>
    )
}
