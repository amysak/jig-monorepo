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
import { createTerm } from '../../../api/terms'
import {
    ACTIVE_INACTIVE_STATUSES,
    ACTIVE_INACTIVE_STATUSES_OPTIONS,
    TERM_CHOICES,
} from '../../../utilities/constants'
import { shortId } from '../../../utilities/utils'

const { Title } = Typography

const layout = {
    wrapperCol: { span: 18 },
    labelCol: { span: 6 },
}

function NewTermForm() {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [, setLoading] = useState(false)

    const onFinish = async (values: { status: any }) => {
        setLoading(true)

        try {
            const payload = {
                ...values,
                is_default: true,
                status: values.status || ACTIVE_INACTIVE_STATUSES[0],
            }
            const term = await createTerm(payload)

            navigate(`/default-setup/terms/${term.id}`)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            className="new-term-form"
            {...layout}
        >
            <Title level={4}>New Term</Title>

            <Divider className="x5" />

            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Term name is required.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Term Choice"
                name="term_type"
                rules={[
                    { required: true, message: 'Term Choice is required.' },
                ]}
            >
                <Select>
                    {Object.values(TERM_CHOICES).map((term) => (
                        <Select.Option value={term} key={shortId()}>
                            {term}
                        </Select.Option>
                    ))}
                </Select>
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
                <Button size="small" htmlType="submit" className="jig-button">
                    Submit
                </Button>
            </Row>
        </Form>
    )
}

export default function NewTermWithPopup() {
    return (
        <Popover placement="leftTop" content={<NewTermForm />} trigger="click">
            <Button size="small" className="jig-button">
                Creat new
            </Button>
        </Popover>
    )
}
