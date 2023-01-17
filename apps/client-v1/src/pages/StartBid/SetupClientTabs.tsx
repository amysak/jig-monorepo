import { Form, Input, Typography } from 'antd'
import debounce from 'lodash/debounce'
import React, { useContext } from 'react'
import { ClientsContext } from '../../store/clients'

const { Title } = Typography

function SetupClientTabs() {
    const clientCtx = useContext(ClientsContext)

    const onChange = debounce(async (value, payload) => {
        try {
            await clientCtx.onUpdateClient(clientCtx.client?.id, payload)
        } catch (error) {
            console.log(error)
        }
    }, 350)

    return (
        <Form
            layout="horizontal"
            className="bordered-row"
            onValuesChange={onChange}
            initialValues={clientCtx.client}
        >
            <Form.Item name="name" label="Name">
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item name="type" label="Type">
                <Input placeholder="Type" />
            </Form.Item>

            <br />

            <Title level={4}>Contact</Title>

            <Form.Item
                label="First name"
                name={['first_contact', 'first_name']}
            >
                <Input placeholder="First name" />
            </Form.Item>

            <Form.Item label="Last name" name={['first_contact', 'last_name']}>
                <Input placeholder="Last name" />
            </Form.Item>

            <br />

            <Title level={4}>Mailing Address</Title>
            <Form.Item label="Street" name={['mailing_address', 'street']}>
                <Input placeholder="Your street." />
            </Form.Item>

            <Form.Item label="City State Zip">
                <Input.Group compact>
                    <Form.Item name={['mailing_address', 'city']}>
                        <Input placeholder="Your city." />
                    </Form.Item>

                    <Form.Item name={['mailing_address', 'state']} label="">
                        <Input placeholder="Your state abbreviation." />
                    </Form.Item>

                    <Form.Item name={['mailing_address', 'zip_code']} label="">
                        <Input placeholder="Zip code." />
                    </Form.Item>
                </Input.Group>
            </Form.Item>
        </Form>
    )
}

export default SetupClientTabs
