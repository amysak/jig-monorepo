import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined
} from '@ant-design/icons'
import {
    Button,
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
    createMaterialType,
    deleteMaterialType,
    getMaterialTypes,
    updateMaterialType
} from '../../../api/material-types'

import { MATERIAL_PURPOSES_OPTIONS } from '../../../utilities/constants'
import { capitalize } from '../../../utilities/utils'
import './styles.scss'

import { TGetMaterialTypesData } from 'api/material-types'

interface NewMaterialFormProps {
    onCreate: (payload: any) => Promise<void>
    loading: boolean
}

function NewMaterialForm({ onCreate, loading }: NewMaterialFormProps) {
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
                <Input placeholder="Enter new Material Type" />
            </Form.Item>

            <Form.Item>
                <Row>
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

    children,

    select,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                >
                    {select ? (
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Select Material Purpose using this Material Type"
                        >
                            {MATERIAL_PURPOSES_OPTIONS.map((purpose) => (
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
            ) : (
                children
            )}
        </td>
    )
}

export default function MaterialTypes() {
    const [form] = Form.useForm()
    const [types, setTypes] = useState<TGetMaterialTypesData>([[], 0])
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

    const getTypes = async () => {
        try {
            setLoading(true)

            const types = await getMaterialTypes()

            setTypes(types)
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    const patchLocalTypes = (id, payload) => {
        //@ts-ignore
        return types[0].map((type: { id: any }) => {
            if (id === type.id) {
                return Object.assign({}, type, payload)
            }

            return type
        })
    }

    const onCreate = async (payload) => {
        try {
            setLoading(true)

            const type = await createMaterialType(payload)
            //@ts-ignore
            setTypes([[type, ...types[0]], type[1] + 1])
        } catch (error) {
            throw new Error(error)
        } finally {
            setLoading(false)
        }
    }

    const onUpdate = async (id) => {
        try {
            setLoading(true)
            const payload = await form.validateFields()
            const types = patchLocalTypes(id, payload)

            await updateMaterialType(id, payload)

            setTypes([types, types.length])
            onCancel()
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async (type: { id: any }) => {
        try {
            setLoading(true)

            await deleteMaterialType(type.id)
            //@ts-ignore
            const updatedList = types[0].filter(
                (t: { id: any }) => t.id !== type.id
            )

            setTypes([updatedList, updatedList.length])
        } catch (error) {
            //@ts-ignore
            conosle.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTypes()
    }, [])

    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Purpose(s)',
            key: 'purpose',
            dataIndex: 'purpose',
            editable: true,

            render(purpose: any[]) {
                return purpose?.map((item) => (
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
                            size="small"
                            type="link"
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

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,

            onCell: (record: { id: string }) => ({
                select: col.dataIndex === 'purpose',
                record,
                dataIndex: col.dataIndex,
                title: col.key,
                editing: isEditing(record),
            }),
        }
    })

    return (
        <>
            <Row>
                <NewMaterialForm onCreate={onCreate} loading={loading} />
            </Row>

            <Form form={form} style={{ width: '100%' }}>
                <Row>
                    <Col span={12}>
                        <Table
                            bordered
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            columns={mergedColumns}
                            //@ts-ignore
                            dataSource={types[0]}
                            pagination={false}
                            rowKey="id"
                            rowClassName="editable-row"
                            loading={loading}
                        />
                    </Col>
                </Row>
            </Form>
        </>
    )
}
