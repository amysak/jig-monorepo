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
import {
    getOneCabinet,
    updateCabinet,
    uploadCabinetImage,
} from '../../../../api/cabinets'
import { inputNumberCostProps } from '../../../../utilities'
import { CABINET_PARTS_GROUPED } from '../../../../utilities/constants'
import { capitalize, shortId } from '../../../../utilities/utils'

import ToePlatformImg from '../../../../assets/images/cabinets/BP_Toe_Kick_No_Background.png'

const { Title } = Typography
const layout = {
    wrapperCol: {
        span: 4,
    },
    labelCol: {
        span: 10,
    },
}

export default function ToePlatform() {
    const [form] = Form.useForm()
    const [panel, setPanel] = useState({})
    const params = useParams<{ id?: string }>()
    const [, setLoading] = useState(false)
    const onChange = debounce(onValuesChange, 1000)
    const [, setURL] = useState('')

    const getCabinetData = async () => {
        try {
            const panel = await getOneCabinet(params.id)

            setPanel(panel)
        } catch (error) {
            console.error(error)
        }
    }

    async function onValuesChange(payload: { [x: number]: any }) {
        try {
            await updateCabinet(params.id, payload)

            message.success('Successfully updated.')
        } catch (error) {
            message.error('Failed to update.')
        }
    }

    const onUpload = async (event: { target: { files: any[] } }) => {
        try {
            setLoading(true)

            const data = new FormData()

            const file = event.target.files[0]

            data.append('file', file)

            data.append('cabinetId', params.id)

            const result = await uploadCabinetImage(data)

            setURL(result.url)

            message.success(`${file.name} file uploaded successfully.`)
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCabinetData()
    }, [])

    useEffect(() => {
        form.resetFields()

        // @ts-expect-error TS(2339): Property 'image_url' does not exist on type '{}'.
        setURL(panel.image_url)
    }, [panel])

    const uploadInputProps = {
        onChange: onUpload,
        accept: 'image/png, image/jpeg',
        type: 'file',
        id: 'toe-platform-image',
        name: 'toe-platform-image',
        style: { display: 'none' },
    }

    return (
        <Row className="pagewrapper">
            <Col span={4} className="side-page-filter">
                <Form
                    form={form}
                    onValuesChange={onChange}
                    initialValues={panel}
                    layout="vertical"
                >
                    <Title level={4}>Panel Specifications</Title>

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
                    initialValues={panel}
                    {...layout}
                >
                    <div className="pagewrapper__maincontent">
                        {/* @ts-expect-error TS(2339): Property 'category' does not exist on type '{}'. */}
                        <Title level={4}>{capitalize(panel?.category)}</Title>
                        <Divider className="" />

                        <Row align="middle" gutter={[2, 2]} justify="center">
                            <Form.Item
                                label="Minimum"
                                name="minimum_length"
                                style={{ marginRight: '3px' }}
                            >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item
                                label="Maximum"
                                name="maximum_length"
                                style={{ marginLeft: '3px' }}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Row>

                        <Row align="middle">
                            <Col span={4}>
                                <Form.Item
                                    label="# of Ends"
                                    name="number_of_ends"
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item
                                    label="# of Sleepers"
                                    name="number_of_sleepers"
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item label="Height" name="part_height">
                                    <InputNumber />
                                </Form.Item>
                            </Col>

                            <Col span={16}>
                                {/* @ts-expect-error TS(2322): Type '{ onChange: (event: { target: { files: any[]... Remove this comment to see the full error message */}
                                <input {...uploadInputProps} />
                                <label
                                    htmlFor="toe-platform-image"
                                    className="toe-platforn-image-label"
                                >
                                    <div id="toe-platform-image">
                                        <img
                                            src={ToePlatformImg}
                                            height={500}
                                        />
                                    </div>
                                </label>
                            </Col>

                            <Col span={4}>
                                <Form.Item
                                    label="Platform Depth"
                                    name="part_depth"
                                >
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
