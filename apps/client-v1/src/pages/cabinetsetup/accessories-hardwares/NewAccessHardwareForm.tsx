import {
    Button,
    Divider,
    Form,
    Input,
    Popover,
    Row,
    Select,
    Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import {
    createAccessoryClassification,
    createAccessorySetup,
    getAccessoryCategories,
    getAccessoryClassification,
} from '../../../api/accessories'
import {
    ACTIVE_INACTIVE_STATUSES,
    ACTIVE_INACTIVE_STATUSES_OPTIONS,
    HARDWARE_CATEGORIES_OPTIONS,
} from '../../../utilities/constants'
import { shortId } from '../../../utilities/utils'

const layout = {
    wrapperCol: { span: 18 },
    labelCol: { span: 6 },
}

const { Title } = Typography

function NewAccessHardwareForm() {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [, setCategories] = useState([])
    const [classifications, setClassifications] = useState([])
    const [classification, setClassification] = useState({})

    const getCategories = async () => {
        try {
            const categories = await getAccessoryCategories()

            getClassifications()

            setCategories(categories)
        } catch (error) {
            console.log(error)
        }
    }

    const getClassifications = async (category = '') => {
        try {
            const classifications = await getAccessoryClassification(category)

            setClassifications(classifications)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const onValuesChange = async (field: { category: string }) => {
        getClassifications(field.category)
    }

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const accessory = await createAccessorySetup({
                ...values,
                is_default: true,
                classification,
            })

            navigate(`/cabinet-setup/accessories-hardwares/${accessory.id}`)
        } catch (error) {
            setLoading(false)
        }
    }

    const onCreateOption = async (name) => {
        try {
            const classification = await createAccessoryClassification({ name })

            setClassifications([classification, ...classifications])
            onClassificationChange({
                value: classification.id,
                label: classification.name,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onClassificationChange = (classification) => {
        setClassification(classification)
    }

    return (
        <Form
            form={form}
            onValuesChange={onValuesChange}
            onFinish={onFinish}
            className="new-cabinet-setup-form"
            {...layout}
        >
            <Title level={4}>New Accessory</Title>

            <Divider className="x5" />

            <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Category is required.' }]}
            >
                <Select>
                    {HARDWARE_CATEGORIES_OPTIONS.map((option) => (
                        <Select.Option key={shortId()} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Classifiction"
                rules={[
                    { required: true, message: 'Classifiction is required.' },
                ]}
            >
                <CreatableSelect
                    options={classifications?.map((classification) => ({
                        value: classification.id,

                        label: classification.name,
                    }))}
                    isClearable
                    onCreateOption={onCreateOption}
                    onChange={onClassificationChange}
                />
            </Form.Item>

            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Name is required.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Status"
                name="status"
                initialValue={ACTIVE_INACTIVE_STATUSES[0]}
            >
                <Select>
                    {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
                        <Select.Option key={shortId()} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Row>
                <Button
                    size="small"
                    loading={loading}
                    htmlType="submit"
                    className="jig-button"
                >
                    Submit
                </Button>
            </Row>
        </Form>
    )
}

export default function NewAccessHardwareFormPopover() {
    return (
        <Popover
            placement="leftTop"
            content={<NewAccessHardwareForm />}
            trigger="click"
        >
            <Button size="small" className="jig-button">
                Create New
            </Button>
        </Popover>
    )
}
