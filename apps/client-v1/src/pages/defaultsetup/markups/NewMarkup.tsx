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
import { createMarkup } from '../../../api/markups'
import {
    ACTIVE_INACTIVE_STATUSES,
    ACTIVE_INACTIVE_STATUSES_OPTIONS,
} from '../../../utilities/constants'
import { shortId } from '../../../utilities/utils'

const { Title } = Typography

const layout = {
    wrapperCol: { span: 18 },
    labelCol: { span: 6 },
}

function NewMarkupForm() {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: { status: any }) => {
        setLoading(true)

        try {
            const payload = {
                ...values,
                is_default: true,
                status: values.status || ACTIVE_INACTIVE_STATUSES[0],
            }
            const markup = await createMarkup(payload)

            navigate(`/default-setup/markups/${markup.id}`)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            className="new-markup-form"
            {...layout}
        >
            <Title level={4}>New Markup</Title>

            <Divider className="x5" />

            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Markup name is required.' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Status" name="status">
                <Select>
                    {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
                        <Select.Option value={option.value} key={shortId()}>
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

export default function NewMarkupWithPopup() {
    return (
        <Popover
            placement="leftTop"
            content={<NewMarkupForm />}
            trigger="click"
        >
            <Button size="small" className="jig-button">
                Creat new
            </Button>
        </Popover>
    )
}
