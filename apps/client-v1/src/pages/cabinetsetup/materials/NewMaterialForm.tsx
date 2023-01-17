import {
    Button,
    Divider,
    Form,
    Input,
    Popover,
    Row,
    Select,
    Typography,
} from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMaterialTypes } from '../../../api/material-types'
import { createMaterialSetup } from '../../../api/materials'
import {
    ACTIVE_INACTIVE_STATUSES,
    ACTIVE_INACTIVE_STATUSES_OPTIONS,
    MATERIAL_PURPOSES_OPTIONS,
} from '../../../utilities/constants'
import { shortId } from '../../../utilities/utils'

const layout = {
    wrapperCol: { span: 18 },
    labelCol: { span: 6 },
}

const { Title } = Typography

function NewMaterialForm() {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [types, setTypes] = useState([])

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const material = await createMaterialSetup({
                ...values,
                is_default: true,
            })
            //@ts-ignore
            navigate(`/cabinet-setup/materials/${material.id}`)
        } catch (error) {
            setLoading(false)
        }
    }

    const getTypes = async (purpose) => {
        try {
            const types = await getMaterialTypes(`?purpose=${purpose}`)

            setTypes(types[0])
        } catch (error) {
            console.log(error)
        }
    }

    const onValuesChange = async (value) => {
        const [property, data] = Object.entries(value)[0]

        if (property === 'purpose') {
            console.log(data)
            getTypes(data)
        }
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            className="new-cabinet-setup-form"
            {...layout}
            onValuesChange={onValuesChange}
        >
            <Title level={4}>New Material</Title>

            <Divider className="x5" />
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Name is required.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Purpose"
                name="purpose"
                rules={[{ required: true, message: 'Purpose is required.' }]}
            >
                <Select>
                    {MATERIAL_PURPOSES_OPTIONS.map((option) => (
                        <Select.Option key={shortId()} value={option.label}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Type" name={['type']}>
                <Select allowClear>
                    {types.map((option) => (
                        <Select.Option value={option.id} key={shortId()}>
                            {option.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Status"
                name="status"
                initialValue={ACTIVE_INACTIVE_STATUSES[0]}
            >
                <Select>
                    {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
                        <Select.Option key={shortId()} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            {/* @ts-expect-error TS(2322): Type '"end"' is not assignable to type '"top" | "b... Remove this comment to see the full error message */}
            <Row align="end">
                <Button
                    size="small"
                    loading={loading}
                    htmlType="submit"
                    className="jig-button"
                >
                    Submit
                </Button>
            </Row>
        </Form>
    )
}

export default function NewMaterialFormPopover() {
    return (
        <Popover
            placement="leftTop"
            content={<NewMaterialForm />}
            trigger="click"
        >
            <Button size="small" className="jig-button">
                Create New
            </Button>
        </Popover>
    )
}
