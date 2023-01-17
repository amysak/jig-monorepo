import { Button, Col, Form, Input, Radio, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

import { updateClientRequest } from '../../../actions/clients'
import { store } from '../../../store'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

function PreferredEmailForm() {
    const [form] = Form.useForm()
    // @ts-ignore
    const client = useSelector((state) => state.client)
    const [preferredEmail, setPreferredEmail] = React.useState(null)

    const onChangeEmail = (e: { target: { value: any } }) =>
        setPreferredEmail(e.target.value)

    React.useEffect(() => {
        form.resetFields()
        setPreferredEmail(client.preferred_email)
    }, [client])

    const onFinish = (values: {
        physical_address: any
        mailing_address: any
    }) => {
        const payload = Object.assign(client, values, {
            physical_address: {
                ...client.physical_address,
                ...values.physical_address,
            },
            mailing_address: {
                ...client.mailing_address,
                ...values.mailing_address,
            },
            preferred_email: preferredEmail,
        })

        store.dispatch(updateClientRequest(client.id, payload))
    }

    return (
        <Radio.Group
            style={{ width: '100%' }}
            value={preferredEmail}
            // @ts-expect-error TS(2322): Type '(e: {    target: {        value: any;    };}... Remove this comment to see the full error message
            onChange={onChangeEmail}
        >
            <Form
                name="preferred-email-form"
                form={form}
                {...layout}
                initialValues={client}
                onFinish={onFinish}
            >
                <Row>
                    <Col span={11}>
                        <Row>
                            <Col span={4}>
                                <Radio value="mailing_address.email" />
                            </Col>
                            <Col span={20}>
                                <Form.Item noStyle>
                                    <Input.Group compact>
                                        <Input
                                            style={{ width: '20%' }}
                                            defaultValue="Email"
                                            disabled
                                            className="labelled-input"
                                        />
                                        <Form.Item
                                            name={['mailing_address', 'email']}
                                            style={{ width: '80%' }}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                    <Col offset={2} span={11}>
                        <Row>
                            <Col span={4}>
                                <Radio value="physical_address.email" />
                            </Col>
                            <Col span={20}>
                                <Form.Item noStyle>
                                    <Input.Group compact>
                                        <Input
                                            style={{ width: '20%' }}
                                            defaultValue="Email"
                                            disabled
                                            className="labelled-input"
                                        />
                                        <Form.Item
                                            name={['physical_address', 'email']}
                                            style={{ width: '80%' }}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Form.Item>
                    <br />
                    <Button htmlType="submit" className="jig-button">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Radio.Group>
    )
}

export default PreferredEmailForm
