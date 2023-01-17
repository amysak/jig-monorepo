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
import debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getOneCabinet, updateCabinet } from '../../../../api/cabinets'
import {
    CABINET_PARTS_GROUPED,
    CABINET_TYPES,
} from '../../../../utilities/constants'
import {
    capitalize,
    safeNum,
    shortId,
    toFixed,
} from '../../../../utilities/utils'

const { Title } = Typography

const isUpper = (category: string) => category?.trim().toLowerCase() === 'upper'

const tableLayout = {
    wrapperCol: {
        span: 4,
    },
    labelCol: {
        span: 6,
    },
}

export default function Filler() {
    const [form] = Form.useForm()
    const [filler, setFiller] = useState<{ part_type?: string }>({})
    const [cabinetHeight, setCabinetHeight] = useState(0)
    const [squareFootage, setSquareFootage] = useState(0)
    const params = useParams<{ id?: string }>()
    const onChange = debounce(onValuesChange, 1000)

    const getCabinetData = async () => {
        try {
            const filler = await getOneCabinet(params.id)

            setFiller(filler)
        } catch (error) {
            console.error(error)
        }
    }

    const getCabinetHeight = (values: {
        cabinet_height?: any
        toe_kick_height?: any
    }) => {
        return toFixed(
            safeNum(values?.cabinet_height) - safeNum(values?.toe_kick_height)
        )
    }

    const getSquareFootage = (allValues: {
        filler_height?: any
        filler_width?: any
    }) => {
        const footage =
            safeNum(allValues.filler_height) * safeNum(allValues.filler_width)

        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        setSquareFootage(toFixed(footage / 144))
    }

    async function onValuesChange(
        value,
        allvalues: { cabinet_height?: any; toe_kick_height?: any }
    ) {
        try {
            const cabHeight = getCabinetHeight(allvalues)
            const payload = {
                ...allvalues,
                ...value,
                cabinet_height: cabHeight,
            }

            await updateCabinet(params.id, payload)

            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            setCabinetHeight(cabHeight)
            getSquareFootage(payload)
            setFiller(payload)

            message.success('Successfully updated.')
        } catch (error) {
            message.error('Failed to update.')
        }
    }

    useEffect(() => {
        getCabinetData()
    }, [])

    useEffect(() => {
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        setCabinetHeight(getCabinetHeight(filler))
        // @ts-ignore
        getSquareFootage(filler)
        form.resetFields()
    }, [filler])

    return (
        <Row className="pagewrapper">
            <Col span={4} className="side-page-filter">
                <Form
                    form={form}
                    onValuesChange={onChange}
                    initialValues={filler}
                    layout="vertical"
                >
                    <Title level={4}>Filler Specifications</Title>

                    <Form.Item label="Part Type" name="category">
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

                    <Form.Item label="Cabinet Type" name="part_type">
                        <Select>
                            {CABINET_TYPES.map((option) => (
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
                    onValuesChange={onChange}
                    initialValues={filler}
                    {...tableLayout}
                >
                    <div className="pagewrapper__maincontent">
                        <Form.Item
                            label="Floor to Top of Cabinet Height"
                            name="cabinet_height"
                        >
                            <InputNumber />
                        </Form.Item>

                        {isUpper(filler.part_type) ? (
                            <Form.Item
                                label="Floor to Bottom of Upper"
                                name="floor_to_bottom_of_upper"
                            >
                                <InputNumber />
                            </Form.Item>
                        ) : (
                            <Form.Item
                                label="Toe Kick Height"
                                name="toe_kick_height"
                            >
                                <InputNumber />
                            </Form.Item>
                        )}

                        <Divider className="x5" />

                        <Form.Item label="Cabinet Height">
                            {cabinetHeight}
                        </Form.Item>

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                        <Form.Item label="Filler Height" name="filler_height">
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Filler Standard Width"
                            name="filler_width"
                            help="/144"
                        >
                            <InputNumber />
                        </Form.Item>

                        <Divider className="x5" />

                        <Form.Item label="Square Footage">
                            {squareFootage}
                        </Form.Item>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
