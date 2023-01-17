import React from 'react'
import { Form, Input, Select } from 'antd'

import { SALUTATIONS_OPTIONS } from '../../../utilities/constants'

interface MailingAddressFormProps {
    title?: string
    requireContact?: boolean
}

const tailLayout = {
    wrapperCol: { span: 18 },
    labelCol: { span: 6 },
}

function MailingAddressForm(props: MailingAddressFormProps) {
    return (
        <>
            {props.requireContact && (
                <Form.Item {...tailLayout} label="Name">
                    <Input.Group compact>
                        <Form.Item
                            style={{ width: '15%' }}
                            name={['first_contact', 'salutation']}
                            help="Salutation"
                        >
                            <Select style={{ width: '100%' }}>
                                {SALUTATIONS_OPTIONS.map((salutation, i) => (
                                    <Select.Option
                                        key={i}
                                        value={salutation.value}
                                    >
                                        {salutation.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ width: '25%' }}
                            name={['first_contact', 'first_name']}
                            help="First"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ width: '25%' }}
                            name={['first_contact', 'last_name']}
                            help="Last"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ width: '35%' }}
                            name={['first_contact', 'title']}
                            help="Title"
                        >
                            <Input />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
            )}

            <Form.Item label="Street" name={['mailing_address', 'street']}>
                <Input placeholder="Your street." />
            </Form.Item>

            <Form.Item {...tailLayout} label="City State Zip">
                <Input.Group compact>
                    <Form.Item
                        name={['mailing_address', 'city']}
                        style={{ width: '50%' }}
                    >
                        <Input placeholder="Your city." />
                    </Form.Item>

                    <Form.Item
                        name={['mailing_address', 'state']}
                        style={{ width: '25%' }}
                        label=""
                    >
                        <Input placeholder="Your state abbreviation." />
                    </Form.Item>

                    <Form.Item
                        name={['mailing_address', 'zip_code']}
                        style={{ width: '25%' }}
                        label=""
                    >
                        <Input placeholder="Zip code." />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <br />
        </>
    )
}

MailingAddressForm.defaultProps = {
    title: 'Mailing Address',
    requireContact: false,
}

export default MailingAddressForm
