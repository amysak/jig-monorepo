import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined
} from '@ant-design/icons'
import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Popconfirm,
    Row,
    Select,
    Table,
    Tag
} from 'antd'
import React, { useEffect, useState } from 'react'
import {
    createVendor,
    deleteVendor,
    getVendors, TGetVendorsData, updateVendor
} from '../../../api/vendors'

import {
    HARDWARE_CATEGORIES_OPTIONS,
    MATERIAL_PURPOSES_OPTIONS,
    TRIM_MOLDING_CLASSIFICATIONS_OPTIONS
} from '../../../utilities/constants'
import { capitalize } from '../../../utilities/utils'
import './styles.scss'
interface NewVendorFormProps {
    onCreate: (payload: any) => Promise<void>
    loading: boolean
}

function NewVendorForm({ onCreate, loading }: NewVendorFormProps) {
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        try {
            await onCreate(values)

            form.resetFields()
        } catch (error) {
            console.log(error)
        } finally {
        }
    }

    return (
        <Form form={form} onFinish={onFinish} layout="inline">
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Enter a name',
                    },
                ]}
            >
                <Input placeholder="Enter new Vendor" />
            </Form.Item>

            <Form.Item>
                {/* @ts-expect-error TS(2322): Type '"end"' is not assignable to type '"middle" |... Remove this comment to see the full error message */}
                <Row align="end">
                    <Button
                        htmlType="submit"
                        size="small"
                        loading={loading}
                        className="jig-button"
                    >
                        Create
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    )
}

const EditableCell = ({
    editing,

    dataIndex,

    title,

    record,

    checkbox,

    children,

    onCheck,

    select,

    selections,
    ...restProps
}) => {
    if (checkbox) {
        return (
            <td {...restProps}>
                <Checkbox
                    checked={record[dataIndex]}
                    onChange={(e) => onCheck(e, dataIndex, record)}
                />
            </td>
        )
    }

    if (!editing) {
        return <td {...restProps}>{children}</td>
    }

    return (
        <td {...restProps}>
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={
                    select
                        ? null
                        : [
                              {
                                  required: true,
                                  message: `Please Input ${title}!`,
                              },
                          ]
                }
            >
                {select ? (
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Select Material Purpose using this Material Type"
                    >
                        {selections.map((purpose) => (
                            <Select.Option
                                key={purpose.value}
                                value={purpose.value}
                            >
                                {purpose.label}
                            </Select.Option>
                        ))}
                    </Select>
                ) : (
                    <Input />
                )}
            </Form.Item>
        </td>
    )
}

export default function Vendors() {
    const [form] = Form.useForm()
    const [vendors, setVendors] = useState<TGetVendorsData>([[], 0])
    const [loading, setLoading] = useState(false)
    const [editingKey, setEditingKey] = useState('')

    const isEditing = (record: { id: string }) => record.id === editingKey

    const onEdit = (record: { id: any }) => {
        form.setFieldsValue(record)

        setEditingKey(record.id)
    }

    const onCancel = () => {
        setEditingKey('')
    }

    const handleGetVendors = async () => {
        try {
            setLoading(true)

            const vendors = await getVendors()

            setVendors(vendors)
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    const patchLocalVendor = (id, payload) => {
        return vendors[0].map((vendor: { id: any }) => {
            if (id === vendor.id) {
                return Object.assign({}, vendor, payload)
            }

            return vendor
        })
    }

    const onUpdate = async (id) => {
        try {
            setLoading(true)
            const payload = await form.validateFields()
            const vendors = patchLocalVendor(id, payload)

            await updateVendor(id, payload)

            setVendors([vendors, vendors.length])
            onCancel()
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    const onCreate = async (payload) => {
        try {
            setLoading(true)

            const vendor = await createVendor(payload)

            setVendors([[vendor, ...vendors[0]], vendor[1] + 1])
        } catch (error) {
            throw new Error(error)
        } finally {
            setLoading(false)
        }
    }

    const onCheck = async (
        e: { target: { checked: any } },
        propertyKey,
        record: { id: any }
    ) => {
        try {
            const payload = { [propertyKey]: e.target.checked }
            await updateVendor(record.id, payload)

            const updatedList = vendors[0].map((vendor: { id: any }) => {
                if (vendor.id === record.id) {
                    return { ...record, ...payload }
                }

                return vendor
            })

            setVendors([updatedList, updatedList.length] as TGetVendorsData)
        } catch (error) {
            console.log(error)
        }
    }

    const onDelete = async (vendor: { id: any }) => {
        try {
            setLoading(true)
            await deleteVendor(vendor.id)

            const updatedList = vendors[0].filter(
                (v: { id: any }) => v.id !== vendor.id
            )

            setVendors([[...updatedList], updatedList.length])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetVendors()
    }, [])

    const checkboxFields = ['finish', 'trim', 'accessory']

    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Material Purpose',
            key: 'purpose',
            dataIndex: 'purpose',
            editable: true,
            selections: MATERIAL_PURPOSES_OPTIONS,

            render(purpose: any[]) {
                return purpose?.map((item) => (
                    <Tag key={item}>{capitalize(item)}</Tag>
                ))
            },
        },
        {
            title: 'Finish',
            key: 'finish',
            dataIndex: 'finish',
            editable: true,
        },
        {
            title: 'Trim/molding',
            key: 'trim',
            dataIndex: 'trim',
            editable: true,
        },
        {
            title: 'Trim Classification',
            key: 'trim_classification',
            dataIndex: 'trim_classification',
            editable: true,
            selections: TRIM_MOLDING_CLASSIFICATIONS_OPTIONS,

            render(classification: any[]) {
                return classification?.map((item) => (
                    <Tag key={item}>{capitalize(item)}</Tag>
                ))
            },
        },
        {
            title: 'Accessories/Hardware',
            key: 'accessory',
            dataIndex: 'accessory',
            editable: true,
        },
        {
            title: 'Accessory Category',
            key: 'accessory_category',
            dataIndex: 'accessory_category',
            editable: true,
            selections: HARDWARE_CATEGORIES_OPTIONS,

            render(classification: any[]) {
                return classification?.map((item) => (
                    <Tag key={item}>{capitalize(item)}</Tag>
                ))
            },
        },
        {
            title: 'Operations',
            dataIndex: 'operation',

            render: (_, record: { id: any }) => {
                const editable = isEditing(record)

                return editable ? (
                    <>
                        <Button
                            icon={<SaveOutlined />}
                            size="small"
                            type="link"
                            style={{ marginRight: 8 }}
                            onClick={() => onUpdate(record.id)}
                        />

                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={onCancel}
                        >
                            <Button
                                icon={<CloseOutlined />}
                                size="small"
                                type="link"
                            />
                        </Popconfirm>
                    </>
                ) : (
                    <>
                        <Button
                            icon={<EditOutlined />}
                            type="link"
                            size="small"
                            onClick={() => onEdit(record)}
                        />

                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => onDelete(record)}
                        >
                            <Button
                                icon={<DeleteOutlined />}
                                type="link"
                                size="small"
                            />
                        </Popconfirm>
                    </>
                )
            },
        },
    ]

    const mergedColumns = columns.map((col, index) => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,

            onCell: (record: { id: string }) => ({
                record,
                index,
                onCheck,
                selections: col.selections,
                select: [
                    'purpose',
                    'trim_classification',
                    'accessory_category',
                ].includes(col.dataIndex),

                checkbox: checkboxFields.includes(col.key),
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    })

    return (
        <>
            <Row>
                <NewVendorForm onCreate={onCreate} loading={loading} />
            </Row>

            <Row>
                <Form form={form} style={{ width: '100%' }}>
                    <Col span={24}>
                        <Table
                            bordered
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            columns={mergedColumns}
                            dataSource={vendors[0]}
                            pagination={false}
                            rowKey="id"
                            rowClassName="editable-row"
                            loading={loading}
                        />
                    </Col>
                    <Col span={12}></Col>
                </Form>
            </Row>
        </>
    )
}
