import { Button, Col, Form, Input, Radio, Row, Typography } from 'antd'
import React, { useContext } from 'react'

import { MailingAddressForm, PhysicalAddressForm } from '../addressforms'
import {
    CompanyInfoForm,
    ContactForm,
} from '../addressforms/CompanyDetailsForm'

import { ClientsContext } from '../../../store/clients'
import './clientcontactinfo.scss'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

const { Title } = Typography

function ClientContactInfo() {
    const [form] = Form.useForm()
    const clientCtx = useContext(ClientsContext)
    const [, setPreferredContact] = React.useState(null)

    const onSelectPreferred = (e: { target: { value: any } }) =>
        setPreferredContact(e.target.value)

    const { client } = clientCtx

    const [preferredPhone, setPreferredPhone] = React.useState(null)

    const onSelectPhone = (event: { target: { value: any } }) =>
        setPreferredPhone(event.target.value)

    React.useEffect(() => {
        form.resetFields()
    }, [client])

    const onValuesChange = async (values: {
        physical_address: any
        mailing_address: any
        first_contact: any
        second_contact: any
    }) => {
        try {
            const payload = Object.assign(client, values, {
                physical_address: {
                    ...client?.physical_address,
                    ...values.physical_address,
                },
                mailing_address: {
                    ...client?.mailing_address,
                    ...values.mailing_address,
                },
                first_contact: {
                    ...client?.first_contact,
                    ...values.first_contact,
                },
                second_contact: {
                    ...client?.second_contact,
                    ...values.second_contact,
                },
                preferred_phone: preferredPhone,
            })
            //@ts-ignore
            await clientCtx.onUpdateClient(client?.id, payload)
        } catch (error) {
            console.log(error)
        }
    }

    const onSameAsMailing = async () => {
        try {
            const payload = {
                physical_address: client?.mailing_address,
            }
            //@ts-ignore
            await clientCtx.onUpdateClient(client?.id, payload, true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form
            form={form}
            initialValues={client}
            {...layout}
            onValuesChange={onValuesChange}
        >
            <Row>
                <Col span={12}>
                    <Title level={4}>Company</Title>
                    <CompanyInfoForm />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Title level={4}>Contact</Title>

                    <Form.Item name="preferred_contact">
                        <Radio.Group
                            // @ts-expect-error TS(2322): Type '(e: {    target: {        value: any;    };}... Remove this comment to see the full error message
                            onChange={onSelectPreferred}
                            style={{ width: '100%' }}
                        >
                            <ContactForm contactKey="first_contact" />
                            <ContactForm contactKey="second_contact" />
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>

            <Radio.Group
                // @ts-expect-error TS(2322): Type '(event: {    target: {        value: any;   ... Remove this comment to see the full error message
                onChange={onSelectPhone}
                value={preferredPhone}
                style={{ width: '100%' }}
            >
                <Row>
                    <Col span={12}>
                        <Title level={4}>Mailing Address</Title>

                        <MailingAddressForm />
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Row align="middle">
                            <Title level={4}>Physical Address</Title>

                            <Button
                                style={{ marginLeft: '20px' }}
                                className="jig-button"
                                size="small"
                                onClick={onSameAsMailing}
                            >
                                Same as mailing
                            </Button>
                        </Row>

                        <br />

                        <PhysicalAddressForm title="Physical Address" />
                    </Col>
                </Row>
            </Radio.Group>

            <Row>
                <Col span={12}>
                    <Title level={4}>Phone</Title>
                    <Form.Item label="Phone" name="phone">
                        <Input placeholder="Client phone" />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Title level={4}>Email</Title>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Client email" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default ClientContactInfo
