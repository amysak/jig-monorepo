import React from 'react'
import { Form, Input, Select, InputNumber } from 'antd'

import { SALUTATIONS_OPTIONS } from '../../../utilities/constants'

interface PhysicalAddressFormProps {
    title: string
    useCopyAddressbtn?: boolean
    requireContact?: boolean
}

const tailLayout = {
    wrapperCol: { span: 18 },
    labelCol: { span: 6 },
}

function PhysicalAddressForm(props: PhysicalAddressFormProps) {
    return (
        <>
            {props.requireContact && (
                <Form.Item {...tailLayout} label="Name">
                    <Input.Group compact>
                        <Form.Item
                            style={{ width: '15%' }}
                            name={['second_contact', 'salutation']}
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
                            name={['second_contact', 'first_name']}
                            help="First"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ width: '25%' }}
                            name={['second_contact', 'last_name']}
                            help="Last"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            style={{ width: '35%' }}
                            name={['second_contact', 'title']}
                            help="Title"
                        >
                            <Input />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
            )}

            <Form.Item label="Street" name={['physical_address', 'street']}>
                <Input placeholder="Your street." />
            </Form.Item>

            <Form.Item {...tailLayout} label="City State Zip">
                <Input.Group compact>
                    <Form.Item
                        style={{ width: '50%' }}
                        name={['physical_address', 'city']}
                    >
                        <Input placeholder="Your city." />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '25%' }}
                        label=""
                        name={['physical_address', 'state']}
                    >
                        <Input placeholder="Your state abbreviation." />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '25%' }}
                        label=""
                        name={['physical_address', 'zip_code']}
                    >
                        <InputNumber placeholder="Zip code." />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <br />
        </>
    )
}

PhysicalAddressForm.defaultProps = {
    title: 'Mailing Address',
    useCopyAddressbtn: true,
    requireContact: false,
}

export default PhysicalAddressForm
