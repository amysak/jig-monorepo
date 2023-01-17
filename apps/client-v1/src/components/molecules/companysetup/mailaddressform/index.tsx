import React, { useContext } from 'react'
import { Form, Input, Typography, Divider, message } from 'antd'
import { debounce } from 'lodash'

import { AccountContext } from '../../../../store/account'
interface MailAddressFormProps {
    simple?: boolean
}

const { Text } = Typography

function MailAddressForm({ simple }: MailAddressFormProps) {
    const [form] = Form.useForm()
    const accountCtx = useContext(AccountContext)
    //@ts-ignore
    const mailingAddress = accountCtx.account?.mailing_address ?? {}

    const updateMailingAddress = async (value, allValues) => {
        try {
            //@ts-ignore
            await accountCtx.updateAccount({ mailing_address: allValues })

            message.success('Success!')
        } catch (error) {
            message.error('Error!')
        }
    }

    const onValuesChange = debounce(updateMailingAddress, 1000)

    return (
        <Form
            form={form}
            name="mailaddressform"
            layout="vertical"
            initialValues={mailingAddress}
            onValuesChange={onValuesChange}
        >
            <Text strong>Mailing Address</Text>

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
                        style={{ width: '33.333%' }}
                        label="City"
                        rules={[
                            { required: true, message: 'Province is required' },
                        ]}
                    >
                        <Input placeholder="Your city." />
                    </Form.Item>

                    <Form.Item
                        name="state"
                        style={{ width: '33.333%' }}
                        label="State"
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
                        style={{ width: '33.333%' }}
                        label="Zip"
                        rules={[
                            { required: true, message: 'Zip code is required' },
                        ]}
                    >
                        <Input placeholder="Zip code." />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <br />
            {!simple ? (
                <>
                    <Text strong>Telephone Numbers</Text>
                    <Divider />

                    <Form.Item
                        name="office"
                        label="Office"
                        rules={[
                            {
                                required: true,
                                message: 'Office phone number is required.',
                            },
                        ]}
                    >
                        <Input style={{ width: '80%' }} />
                    </Form.Item>
                    <Form.Item
                        name="cell"
                        label="Cell"
                        rules={[
                            {
                                required: true,
                                message: 'Cell phone number is required.',
                            },
                        ]}
                    >
                        <Input style={{ width: '80%' }} />
                    </Form.Item>
                    <Form.Item
                        name="home"
                        label="Home"
                        rules={[
                            {
                                required: true,
                                message: 'Home phone number is required.',
                            },
                        ]}
                    >
                        <Input style={{ width: '80%' }} />
                    </Form.Item>
                    <Form.Item
                        name="fax"
                        label="Fax"
                        rules={[
                            { required: true, message: 'Fax is required.' },
                        ]}
                    >
                        <Input style={{ width: '80%' }} />
                    </Form.Item>

                    <br />
                    <Form.Item
                        name="state"
                        label="State Name (used in Proposal and Estimate)"
                        rules={[
                            {
                                required: true,
                                message: 'Your state is required.',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Your state."
                            style={{ width: '80%' }}
                        />
                    </Form.Item>
                </>
            ) : null}
        </Form>
    )
}

MailAddressForm.defaultProps = {
    simple: false,
}

export default MailAddressForm
