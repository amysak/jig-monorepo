import {
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getOneCabinet, updateCabinet } from '../../../../api/cabinets'
import {
    CABINET_PARTS_GROUPED,
    PANEL_TYPES,
} from '../../../../utilities/constants'
import {
    capitalize,
    safeNum,
    shortId,
    toFixed,
} from '../../../../utilities/utils'

const { Title } = Typography
const inputStyle = { width: '200px' }
const layout = {
    wrapperCol: {
        span: 8,
    },
    labelCol: {
        span: 6,
    },
}

const isEndPanel = (category: string) => category?.toLowerCase() === 'end panel'

const isAppliancePanel = (category: string) =>
    category?.toLowerCase() === 'appliance panel'

const isWainscotPanel = (category: string) =>
    category?.toLowerCase() === 'wainscot panel'

export default function Panel() {
    const [form] = Form.useForm()
    const [panel, setPanel] = useState<{ category?: string }>({})
    const [sideHeight, setSideHeight] = useState(0)
    const [endSquareFootage, setEndSquareFootage] = useState(0)
    const [applianceSquareFootage, setApplianceSquareFootage] = useState(0)
    const params = useParams<{ id?: string }>()

    const getCabinetData = async () => {
        try {
            const panel = await getOneCabinet(params.id)

            setPanel(panel)
        } catch (error) {
            console.error(error)
        }
    }

    const calculateApplianceSquareFootage = (panel: {
        toe_kick_height?: any
    }) => {
        return toFixed(
            (safeNum(panel?.toe_kick_height) *
                safeNum(panel?.toe_kick_height)) /
                144
        )
    }

    const calculateSideHeight = (panel: { cabinet_height?: any }) => {
        return toFixed(
            safeNum(panel?.cabinet_height) - safeNum(panel?.cabinet_height)
        )
    }

    const calculateEndSquareFootage = (panel: { cabinet_depth?: any }) => {
        // @ts-expect-error TS(2559): Type '{ cabinet_depth?: any; }' has no properties ... Remove this comment to see the full error message
        const sideHeight = calculateSideHeight(panel)

        // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        return toFixed((sideHeight * safeNum(panel.cabinet_depth)) / 144)
    }

    const onValuesChange = async (value, panel) => {
        try {
            const payload = { ...panel, ...value }

            await updateCabinet(params.id, payload)

            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            setSideHeight(calculateSideHeight(payload))
            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            setEndSquareFootage(calculateEndSquareFootage(payload))
            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            setApplianceSquareFootage(calculateApplianceSquareFootage(payload))
            setPanel(payload)

            message.success('Successfully updated.')
        } catch (error) {
            message.error('Failed to update.')
        }
    }

    useEffect(() => {
        getCabinetData()
    }, [])

    useEffect(() => {
        form.resetFields()
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        setSideHeight(calculateSideHeight(panel))
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        setEndSquareFootage(calculateEndSquareFootage(panel))
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        setApplianceSquareFootage(calculateApplianceSquareFootage(panel))
    }, [panel])

    return (
        <Row className="pagewrapper">
            <Col span={4} className="side-page-filter">
                <Form form={form} initialValues={panel} layout="vertical">
                    <Title level={4}>Panel Specifications</Title>

                    <Form.Item label="Cabinet Type" name="category">
                        <Select>
                            {CABINET_PARTS_GROUPED.map((options) => (
                                <Select.OptGroup
                                    key={shortId()}
                                    label={<Divider className="x5" />}
                                >
                                    {options.map((option) => (
                                        <Select.Option
                                            value={option}
                                            key={shortId()}
                                        >
                                            {capitalize(option)}
                                        </Select.Option>
                                    ))}
                                </Select.OptGroup>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Panel Type" name="panel_type">
                        <Select>
                            {PANEL_TYPES.map((option) => (
                                <Select.Option value={option} key={shortId()}>
                                    {capitalize(option)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Divider />

                    <Title level={4}>Additional Costs</Title>

                    <Form.Item
                        label="Additional Material Cost"
                        name="additional_material_cost"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Additional Installation Laboor"
                        name="additional_installation_cost"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Additional Shop Labor"
                        name="additional_shop_labor"
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="Internal Note (non-printable)"
                        name="internal_note"
                    >
                        <Input.TextArea cols={10} />
                    </Form.Item>
                </Form>
            </Col>

            <Col span={20}>
                <Form
                    form={form}
                    onValuesChange={onValuesChange}
                    initialValues={panel}
                    {...layout}
                >
                    <div className="pagewrapper__maincontent">
                        <Title level={4}>
                            {capitalize(panel?.category)} Panel
                        </Title>
                        <Divider className="" />

                        <Form.Item
                            label="Number of Finished Sides"
                            name="number_of_finished_sides"
                        >
                            <Select style={inputStyle}>
                                {[0, 2, 3].map((value) => (
                                    <Select.Option
                                        key={shortId()}
                                        value={value}
                                    >
                                        {value}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        {isAppliancePanel(panel?.category) && (
                            <>
                                <Form.Item
                                    label="Appliance Panel Height"
                                    name="cabinet_height"
                                >
                                    <InputNumber style={inputStyle} />
                                </Form.Item>

                                <Form.Item
                                    label="Appliance Width X"
                                    help="/144"
                                    name="cabinet_width"
                                >
                                    <InputNumber style={inputStyle} />
                                </Form.Item>

                                <Form.Item label="Appliance Square Panel Footage">
                                    {applianceSquareFootage}
                                </Form.Item>

                                <Divider className="x4" />
                            </>
                        )}

                        {isEndPanel(panel?.category) && (
                            <>
                                <Form.Item
                                    label="Floor to top of Cabinet Height"
                                    name="cabinet_height"
                                >
                                    <InputNumber style={inputStyle} />
                                </Form.Item>

                                <Form.Item
                                    label="Toe Kick Height"
                                    name="toe_kick_height"
                                >
                                    <InputNumber style={inputStyle} />
                                </Form.Item>

                                <Divider className="x4" />

                                <Form.Item label="Cabinet Side Height -">
                                    {sideHeight}
                                </Form.Item>

                                <Form.Item label="End Panel Height">
                                    {sideHeight}
                                </Form.Item>

                                <Form.Item
                                    label="Cabinet Depth X"
                                    help="/144"
                                    name="cabinet_depth"
                                >
                                    <InputNumber style={inputStyle} />
                                </Form.Item>

                                <Divider className="x4" />
                                <Form.Item label="End Panel Square Footage">
                                    {endSquareFootage}
                                </Form.Item>
                            </>
                        )}

                        {isWainscotPanel(panel?.category) && (
                            <>
                                <Form.Item
                                    label="Wainscot Panel Height"
                                    name="cabinet_height"
                                >
                                    <InputNumber style={inputStyle} />
                                </Form.Item>
                            </>
                        )}

                        <Form.Item
                            label="Number of Panels"
                            help="(Panelized Ends Only)"
                            name="number_of_panels"
                        >
                            <Select style={inputStyle}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Select.Option
                                        key={shortId()}
                                        value={value}
                                    >
                                        {value}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
