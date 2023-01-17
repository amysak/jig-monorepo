import React, { useContext, useEffect } from 'react'
import { Form, InputNumber, message } from 'antd'
import debounce from 'lodash/debounce'
import { MaterialContext } from '../../../store/materials'

export default function ThicknessForm() {
    const [form] = Form.useForm()
    const materialCtx = useContext(MaterialContext)
    const { material } = materialCtx

    useEffect(() => form.resetFields(), [material])

    const onValuesChange = async (payload) => {
        try {
            //@ts-ignore
            await materialCtx.update(payload)

            message.success('Success!')
        } catch (error) {
            message.error('Failed!')
        }
    }

    const decouncedOnChange = debounce(onValuesChange, 500)

    return (
        <Form
            form={form}
            initialValues={material}
            onValuesChange={decouncedOnChange}
            layout="inline"
            style={{ width: '100%' }}
        >
            <Form.Item
                label="Interior Material Thickness"
                name="interior_thickness"
            >
                <InputNumber />
            </Form.Item>

            <Form.Item label="Back Material Thickness" name="back_thickness">
                <InputNumber />
            </Form.Item>
        </Form>
    )
}
