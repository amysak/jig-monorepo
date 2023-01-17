import React from 'react'
import { Row, Col, Input, Form, Typography, Select, Button } from 'antd'

const { Text } = Typography

const priviledges = [
    { name: 'Admin', value: 'admin' },
    { name: 'Regular', value: 'regular' },
    { name: 'Sales', value: 'sales' },
]

const statuses = [
    { name: 'Suspended', value: 'suspended' },
    { name: 'Active', value: 'active' },
    { name: 'Pending', value: 'pending' },
]

function InputLayout(props: { note: any; children: any }) {
    return (
        <Row>
            <Col span={8}>{props.note}</Col>
            <Col span={16}>{props.children}</Col>
        </Row>
    )
}

function AccountSettingForm() {
    return (
        <Form>
            <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'First name is required.' }]}
            >
                <InputLayout note="First Name">
                    <Input placeholder="Enter first name." />
                </InputLayout>
            </Form.Item>

            <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Last name is required.' }]}
            >
                <InputLayout note="Last Name">
                    <Input placeholder="Enter last name." />
                </InputLayout>
            </Form.Item>

            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Email is required.' }]}
            >
                <InputLayout note="Email">
                    <Input placeholder="Enter email." />
                </InputLayout>
            </Form.Item>

            <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Phone is required.' }]}
            >
                <InputLayout note="Phone">
                    <Input placeholder="Enter number." />
                </InputLayout>
            </Form.Item>

            <Form.Item
                name="signature"
                rules={[{ required: true, message: 'Signature is required.' }]}
            >
                <InputLayout note="Signature">
                    <Input.TextArea placeholder="Enter Signature." rows={4} />
                </InputLayout>
            </Form.Item>

            <Text strong>Account Settings</Text>

            <Form.Item
                name="accountName"
                rules={[
                    { required: true, message: 'Account name is required.' },
                ]}
            >
                <InputLayout note="Account Name">
                    <Input placeholder="Enter Account name." />
                </InputLayout>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Password is required.' }]}
            >
                <InputLayout note="Password">
                    <Input.Password placeholder="Enter Password." />
                </InputLayout>
            </Form.Item>

            <Form.Item
                name="priviledge"
                rules={[{ required: true, message: 'Priviledge is required.' }]}
            >
                <InputLayout note="Priviledge">
                    <Select>
                        {priviledges.map((privilege, key) => (
                            <Select.Option key={key} value={privilege.value}>
                                {privilege.name}
                            </Select.Option>
                        ))}
                    </Select>
                </InputLayout>
            </Form.Item>

            <Form.Item
                name="priviledge"
                rules={[{ required: true, message: 'Priviledge is required.' }]}
            >
                <InputLayout note="Priviledge">
                    <Select>
                        {statuses.map((status, key) => (
                            <Select.Option key={key} value={status.value}>
                                {status.name}
                            </Select.Option>
                        ))}
                    </Select>
                </InputLayout>
            </Form.Item>

            <Form.Item>
                <br />
                <Button block className="jig-button">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

function ReportPreferencesForm() {
    return <h1>Report Preferences setting</h1>
}

function NewUserForm() {
    return (
        <Row>
            <Col span={10}>
                <AccountSettingForm />
            </Col>
            <Col offset={1} span={13}>
                <ReportPreferencesForm />
            </Col>
        </Row>
    )
}

export default NewUserForm
