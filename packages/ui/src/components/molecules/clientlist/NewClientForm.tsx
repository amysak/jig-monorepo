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
import { createClient } from '../../../api/clients'
import {
    ACTIVE_INACTIVE_STATUSES,
    ACTIVE_INACTIVE_STATUSES_OPTIONS,
} from '../../../utilities/constants'
import { shortId } from '../../../utilities/utils'

const layout = {
    wrapperCol: { span: 18 },
    labelCol: { span: 6 },
}

const { Title } = Typography

function NewClientForm() {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const client = await createClient(values)

            navigate(`/clients/${client.id}`)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            className="new-cabinet-setup-form"
            {...layout}
        >
            <Title level={4}>New Client</Title>
            <Divider className="x5" />
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Name is required.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Type" name={['type']}>
                <Input />
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
            <Row>
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

export default function NewClientFormPopover() {
    return (
        <Popover
            placement="leftTop"
            content={<NewClientForm />}
            trigger="click"
        >
            <Button size="small" className="jig-button">
                Create New
            </Button>
        </Popover>
    )
}
