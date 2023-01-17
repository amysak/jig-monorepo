import React, { useContext } from 'react'
import { Form, Input, message, Typography } from 'antd'
import { debounce } from 'lodash'

import { AccountContext } from '../../../../store/account'

const { Text } = Typography

function BillingAddressForm() {
    const [form] = Form.useForm()
    const accountCtx = useContext(AccountContext)
    //@ts-ignore
    const billingAddress = accountCtx.account?.physical_address ?? {}

    const updateBillingAddress = async (value, allValues) => {
        try {
            //@ts-ignore
            await accountCtx.updateAccount({ physical_address: allValues })

            message.success('Success!')
        } catch (error) {
            message.error('Error!')
        }
    }

    const onValuesChange = debounce(updateBillingAddress, 1000)

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={billingAddress}
            onValuesChange={onValuesChange}
        >
            <Text strong>Billing Address</Text>

            <Form.Item
                name="street"
                label="Street"
                rules={[{ required: true, message: 'Username is required' }]}
            >
                <Input placeholder="Your street." />
            </Form.Item>

            <Form.Item label="">
                <Input.Group compact>
                    <Form.Item
                        name="city"
                        label="City"
                        style={{ width: '33%' }}
                        rules={[
                            { required: true, message: 'Province is required' },
                        ]}
                    >
                        <Input placeholder="Your city." />
                    </Form.Item>

                    <Form.Item
                        name="state"
                        label="State"
                        style={{ width: '33%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Street abbreviation is required',
                            },
                        ]}
                    >
                        <Input placeholder="Your state abbreviation." />
                    </Form.Item>

                    <Form.Item
                        name="zip"
                        label="Zip"
                        style={{ width: '33%' }}
                        rules={[
                            { required: true, message: 'Zip code is required' },
                        ]}
                    >
                        <Input placeholder="Zip code." />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail Address"
                rules={[{ required: true, message: 'Your email is required.' }]}
            >
                <Input placeholder="Your Email." />
            </Form.Item>

            <Form.Item
                name="website"
                label="Web Address"
                rules={[
                    {
                        required: true,
                        message: 'Your web address is required.',
                    },
                ]}
            >
                <Input placeholder="Your web address." />
            </Form.Item>

            <Form.Item
                name="license_no"
                label="State License Number"
                rules={[
                    {
                        required: true,
                        message: 'Your state license number is required.',
                    },
                ]}
            >
                <Input
                    placeholder="Your state license number."
                    style={{ width: '50%' }}
                />
            </Form.Item>
        </Form>
    )
}

export default BillingAddressForm
