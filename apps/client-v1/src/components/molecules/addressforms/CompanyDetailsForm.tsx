import React from 'react'
import { useSelector } from 'react-redux'

import {
    Button,
    Col,
    Form,
    FormItem,
    Input,
    InputGroup,
    Option,
    Radio,
    RadioGroup,
    Row,
    Select,
    useForm,
} from 'components/atoms'

import { updateClientRequest } from '../../../actions/clients'
import { store } from '../../../store'

interface ContactFormProps {
    contactKey: string
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}
const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
]

const contactSalutations = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Dr', label: 'Dr' },
]

export function ContactForm({ contactKey }: ContactFormProps) {
    return (
        <>
            <FormItem
                label="Contact"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
            >
                <InputGroup compact>
                    <FormItem
                        name={[contactKey, 'salutation']}
                        style={{ width: '20%' }}
                    >
                        <Select placeholder="Salutation">
                            {contactSalutations.map(({ label, value }) => (
                                <Option key={value} value={value}>
                                    {label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem
                        name={[contactKey, 'first_name']}
                        style={{ width: '20%' }}
                    >
                        <Input placeholder="First name" />
                    </FormItem>

                    <FormItem
                        name={[contactKey, 'last_name']}
                        style={{ width: '20%' }}
                    >
                        <Input placeholder="Last name" />
                    </FormItem>
                    <FormItem
                        name={[contactKey, 'title']}
                        style={{ width: '20%' }}
                    >
                        <Input placeholder="Title" />
                    </FormItem>
                    <FormItem style={{ width: '20%' }}>
                        <Radio
                            value={contactKey}
                            style={{ marginLeft: '7px' }}
                        />
                    </FormItem>
                </InputGroup>
            </FormItem>
        </>
    )
}

export const CompanyInfoForm = React.memo(function CompanyInfoForm() {
    return (
        <>
            <FormItem name="name" label="Company Name">
                <Input placeholder="Company Name." />
            </FormItem>

            <FormItem name="type" label="Type">
                <Input placeholder="Company Type." />
            </FormItem>

            <FormItem label="Status" name="status">
                <Select>
                    {statuses.map((status, key) => (
                        <Option key={key} value={status.value}>
                            {status.label}
                        </Option>
                    ))}
                </Select>
            </FormItem>
        </>
    )
})

function CompanyDetailsForm() {
    const [form] = useForm()
    // @ts-ignore
    const client = useSelector((state) => state.client)
    const [preferredContact, setPreferredContact] = React.useState(null)

    const onSelectPreferred = (e: { target: { value: unknown } }) =>
        setPreferredContact(e.target.value)

    React.useEffect(() => {
        form.resetFields()

        setPreferredContact(client.preferred_contact)
    }, [client])

    const onFinish = (values) => {
        store.dispatch(
            updateClientRequest(client.id, {
                ...values,
                preferred_contact: preferredContact,
            })
        )
    }

    return (
        <Form
            form={form}
            initialValues={client}
            {...layout}
            onFinish={onFinish}
        >
            <Row>
                <Col span={10}>
                    <CompanyInfoForm />
                </Col>

                <Col offset={1} span={13} style={{ marginTop: '40px' }}>
                    <RadioGroup
                        value={preferredContact}
                        style={{ width: '100%' }}
                        // @ts-ignore
                        onChange={onSelectPreferred}
                    >
                        <Row>
                            <Col span={18}>
                                <ContactForm contactKey="first_contact" />
                            </Col>

                            <Col offset={1} span={5}>
                                <Radio
                                    value="first_contact"
                                    style={{ marginTop: '7px' }}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <ContactForm contactKey="second_contact" />
                            </Col>

                            <Col offset={1} span={5}>
                                <Radio
                                    value="second_contact"
                                    style={{ marginTop: '7px' }}
                                />
                            </Col>
                        </Row>
                    </RadioGroup>
                </Col>
            </Row>

            <FormItem>
                <Button className="jig-button" htmlType="submit">
                    Update
                </Button>
            </FormItem>
        </Form>
    )
}

export default CompanyDetailsForm
