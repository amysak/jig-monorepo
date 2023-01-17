import React, { useContext } from 'react'
import { Form, Input, message } from 'antd'
import { debounce } from 'lodash'

import { AccountContext } from '../../../store/account'

function CompanyNameForm() {
    const [form] = Form.useForm()
    const accountCtx = useContext(AccountContext)

    const onChangeHandler = async (payload) => {
        try {
            //@ts-ignore
            await accountCtx.updateAccount(payload)

            message.success('Success!')
        } catch (error) {
            message.success('Failed!')
        }
    }

    const onValuesChange = debounce(onChangeHandler, 1000)

    React.useEffect(() => form.resetFields(), [accountCtx.account])

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={accountCtx.account}
            onValuesChange={onValuesChange}
        >
            <Form.Item
                name="name"
                label="Company Name (used in Proposal and Estimate)"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your company name.',
                    },
                ]}
            >
                <Input placeholder="Your company name" />
            </Form.Item>

            <Form.Item
                name="contact_name"
                label="Contact Name"
                rules={[
                    {
                        required: true,
                        message: "Please enter your contact person's name.",
                    },
                ]}
            >
                <Input placeholder="Your name" />
            </Form.Item>
        </Form>
    )
}

export default CompanyNameForm
