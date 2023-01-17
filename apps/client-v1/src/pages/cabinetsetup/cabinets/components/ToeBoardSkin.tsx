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
import { inputNumberCostProps } from '../../../../utilities'
import { CABINET_PARTS_GROUPED } from '../../../../utilities/constants'
import {
    capitalize,
    safeNum,
    shortId,
    toFixed,
} from '../../../../utilities/utils'

const { Title } = Typography

const tableLayout = {
    wrapperCol: {
        span: 4,
    },
    labelCol: {
        span: 6,
    },
}

export default function ToeBoardSkin() {
    const [form] = Form.useForm()
    const [toeBoardSkin, setToeBoard] = useState({})
    const [squareFootage, setSquareFootage] = useState(0)
    const params = useParams<{ id?: string }>()
    const onChange = debounce(onValuesChange, 1000)

    const getSquareFootage = (allValues: {
        toe_board_height?: any
        toe_board_width?: any
    }) => {
        const footage =
            safeNum(allValues.toe_board_height) *
            safeNum(allValues.toe_board_width)

        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        setSquareFootage(toFixed(footage / 144))
    }

    const getCabinetData = async () => {
        try {
            const cabinet = await getOneCabinet(params.id)

            setToeBoard(cabinet)
        } catch (error) {
            console.error(error)
        }
    }

    async function onValuesChange(
        values: { [x: number]: any },
        allValues: { toe_board_height?: any; toe_board_width?: any }
    ) {
        try {
            await updateCabinet(params.id, values)

            getSquareFootage(allValues)
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

        getSquareFootage(toeBoardSkin)
    }, [toeBoardSkin])

    return (
        <Row className="pagewrapper">
            <Col span={4} className="side-page-filter">
                <Form
                    form={form}
                    onValuesChange={onChange}
                    initialValues={toeBoardSkin}
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

                    <Divider />

                    <Title level={4}>Additional Costs</Title>

                    <Form.Item
                        label="Additional Material Cost"
                        name="additional_material_cost"
                    >
                        {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                        <InputNumber {...inputNumberCostProps} />
                    </Form.Item>
                    <Form.Item
                        label="Additional Installation Laboor"
                        name="additional_installation_cost"
                    >
                        {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                        <InputNumber {...inputNumberCostProps} />
                    </Form.Item>
                    <Form.Item
                        label="Additional Shop Labor"
                        name="additional_shop_labor"
                    >
                        {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                        <InputNumber {...inputNumberCostProps} />
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
                    initialValues={toeBoardSkin}
                    {...tableLayout}
                >
                    <div className="pagewrapper__maincontent">
                        <Form.Item
                            label="Toe Board Height"
                            name="toe_board_height"
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Toe Board Width"
                            name="toe_board_width"
                            help="/144"
                        >
                            <InputNumber />
                        </Form.Item>

                        <Divider className="x5" />

                        <Form.Item label="Toe Board Square Footage">
                            {squareFootage}
                        </Form.Item>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
