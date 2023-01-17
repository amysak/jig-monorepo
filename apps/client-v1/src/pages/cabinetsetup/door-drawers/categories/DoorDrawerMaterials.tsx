import {
    Button,
    Col,
    Form,
    Popover,
    Row,
    Select,
    Table,
    Typography,
} from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    getSetupMaterials,
    TGetSetupMaterialsData,
} from '../../../../api/materials'
import { DoorContext } from '../../../../store/door'
import { capitalize, getQueryString } from '../../../../utilities/utils'
interface AddMaterialFormProps {
    door: any
}

interface DoorDrawerMaterialsProps {
    columns: { title: string; dataIndex: string; key: string }[] | any[]
    door: any
}

const { Title, Text } = Typography

function AddMaterialForm({ door }: AddMaterialFormProps) {
    const [form] = Form.useForm()
    const [materials, setMaterials] = useState<TGetSetupMaterialsData>([[], 0])
    const [loading, setLoading] = useState(false)
    const doorCtx = useContext(DoorContext)
    const params = useParams<{ id?: string }>()

    const layout = {
        wrapperCol: { span: 18 },
        labelCol: { span: 6 },
        style: { width: '400px', height: '200px' },
    }

    const getMaterialsUsingDoorType = async () => {
        try {
            const purpose = door?.category
            const filter = { purpose }

            const query = getQueryString(filter)
            const materials = await getSetupMaterials(query)

            setMaterials(materials)
        } catch (error) {
            console.error(error)
        } finally {
        }
    }

    useEffect(() => {
        getMaterialsUsingDoorType()
    }, [door])

    const onFinish = async (values) => {
        try {
            setLoading(true)

            await doorCtx.onAddMaterialToDoor(params.id, values)

            form.resetFields()
        } catch {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => form.resetFields(), [door])

    return (
        <Form form={form} onFinish={onFinish} {...layout}>
            <Row justify="space-between" style={{ height: '100%' }}>
                <Col span={24}>
                    <Title level={4}>
                        Add Material for this {capitalize(door.category) ?? ''}
                    </Title>

                    <Form.Item label="Material Purpose">
                        <Text>{capitalize(door.category) ?? ''}</Text>
                    </Form.Item>

                    <Form.Item label="Material Type">
                        <Text>{door?.material_type?.name ?? ''}</Text>
                    </Form.Item>

                    <Form.Item label="Material Name" name="materialId">
                        <Select>
                            {materials?.[0]?.map((material) => {
                                return (
                                    <Select.Option
                                        value={material.id}
                                        key={material.id}
                                    >
                                        {material.name}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </Col>

                <Col
                    span={24}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Form.Item>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="jig-button"
                        >
                            Add Material
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default function DoorDrawerMaterials({
    door,
    columns,
}: DoorDrawerMaterialsProps) {
    return (
        <>
            <div>
                <Popover
                    trigger="click"
                    placement="right"
                    content={<AddMaterialForm door={door} />}
                >
                    <Button className="jig-button" size="small">
                        Add Material
                    </Button>
                </Popover>
                <br />
                <br />
            </div>

            <Col span={24}>
                <Table
                    title={() => (
                        <Title level={4}>
                            {capitalize(door?.category)} Material
                        </Title>
                    )}
                    columns={columns}
                    dataSource={door.materials}
                    pagination={false}
                    size="small"
                    style={{ width: '100%' }}
                    rowKey="id"
                />
            </Col>
        </>
    )
}
