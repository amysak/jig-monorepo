import {
    Alert,
    Col,
    Form,
    InputNumber,
    Row,
    Select,
    Table,
    Typography,
} from 'antd'
import get from 'lodash/get'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getCabinetByRoom } from '../../../../api/cabinets'
import { HardwareContext } from '../../../../store/hardwares'
import {
    countCabDrawerProp,
    getQueryString,
    safeNum,
    shortId,
    toFixed,
} from '../../../../utilities/utils'
import { RenderCell } from '../utils'

const { Text, Title } = Typography

const tblProps = {
    pagination: false,
    rowKey: 'id',
    size: 'small',
}

const getFieldTotal = (data: any[], property: string) => {
    return data?.reduce((total: number, obj: { [x: string]: any }) => {
        total += safeNum(obj[property])

        return total
    }, 0)
}

const getDrawerFrontTotal = (
    cabinets: any[],
    property: string,
    childKey: string
) => {
    return cabinets?.reduce((total, cabinet: { [x: string]: any }) => {
        return total + countCabDrawerProp(cabinet[property], childKey)
    }, 0)
}

const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

function RenderNestedText({ label, children }) {
    return (
        <Col style={{ paddingLeft: '15px' }}>
            <Text>{label}</Text>
            <div>{children}</div>
        </Col>
    )
}

const nestedInputStyle = {
    width: '70%',
}

function SurfaceHardwareForm() {
    const [form] = Form.useForm()
    const hardwareCtx = useContext(HardwareContext)
    const params = useParams<{ id?: string }>()

    const { hardware, classifications, onRoomHardwareItemChange } = hardwareCtx

    const onValuesChange = (values) => {
        onRoomHardwareItemChange(params.id, values)
    }

    React.useEffect(() => {
        form.resetFields()
    }, [hardware])

    return (
        <Form
            form={form}
            initialValues={hardware}
            onValuesChange={onValuesChange}
            {...formLayout}
            className="bordered-row"
        >
            <Row>
                <Col span={14}>
                    <Title level={4}>Surface Hardware</Title>
                </Col>

                <Col span={10}>
                    <Text strong>Suggested Quantity</Text>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item label="Doors" name={['doors', 'id']}>
                        <Select>
                            {/* @ts-expect-error TS(2339): Property 'doorAndDrawers' does not exist on type '... Remove this comment to see the full error message */}
                            {classifications.doorAndDrawers?.map(
                                (hardware: { id: any; name: any }) => {
                                    return (
                                        <Select.Option
                                            value={hardware.id}
                                            key={shortId()}
                                        >
                                            {hardware.name}
                                        </Select.Option>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>{RenderCell(20)}</Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Form.Item label="Drawers" name={['drawers', 'id']}>
                        <Select>
                            {/* @ts-expect-error TS(2339): Property 'doorAndDrawers' does not exist on type '... Remove this comment to see the full error message */}
                            {classifications.doorAndDrawers?.map(
                                (hardware: { id: any; name: any }) => {
                                    return (
                                        <Select.Option
                                            value={hardware.id}
                                            key={shortId()}
                                        >
                                            {hardware.name}
                                        </Select.Option>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>{RenderCell(20)}</Col>
            </Row>
        </Form>
    )
}

function FunctionalHardwareForm() {
    const [form] = Form.useForm()
    const hardwareCtx = useContext(HardwareContext)
    const params = useParams<{ id?: string }>()

    const { hardware, classifications, onRoomHardwareItemChange } = hardwareCtx

    const onValuesChange = (values) => {
        onRoomHardwareItemChange(params.id, values)
    }

    React.useEffect(() => {
        form.resetFields()
    }, [hardware])

    return (
        <Form
            form={form}
            initialValues={hardware}
            onValuesChange={onValuesChange}
            {...formLayout}
            className="bordered-row"
        >
            <Title level={4}>Functional Hardware</Title>
            <Row>
                <Col span={20}>
                    <Form.Item
                        label="Drawer Guide"
                        name={['drawer_guides', 'id']}
                    >
                        <Select>
                            {/* @ts-expect-error TS(2339): Property 'rolloutGuides' does not exist on type '{... Remove this comment to see the full error message */}
                            {classifications.rolloutGuides?.map(
                                (hardware: { id: any; name: any }) => {
                                    return (
                                        <Select.Option
                                            value={hardware.id}
                                            key={shortId()}
                                        >
                                            {hardware.name}
                                        </Select.Option>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={4}>{RenderCell(20)}</Col>
            </Row>

            <Row>
                <Col span={20}>
                    <Form.Item
                        label="Roll-Out Guide"
                        name={['rollout_guides', 'id']}
                    >
                        <Select>
                            {/* @ts-expect-error TS(2339): Property 'rolloutGuides' does not exist on type '{... Remove this comment to see the full error message */}
                            {classifications.rolloutGuides?.map(
                                (hardware: { id: any; name: any }) => {
                                    return (
                                        <Select.Option
                                            value={hardware.id}
                                            key={shortId()}
                                        >
                                            {hardware.name}
                                        </Select.Option>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={4}>{RenderCell(20)}2</Col>
            </Row>

            <Row>
                <Col span={20}>
                    <Form.Item label="Hinge" name={['hinge', 'id']}>
                        <Select>
                            {/* @ts-expect-error TS(2339): Property 'hinges' does not exist on type '{}'. */}
                            {classifications.hinges?.map(
                                (hardware: { id: any; name: any }) => {
                                    return (
                                        <Select.Option
                                            value={hardware.id}
                                            key={shortId()}
                                        >
                                            {hardware.name}
                                        </Select.Option>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={4}>{RenderCell(20)}</Col>
            </Row>

            <Row>
                <Col span={18}>
                    <Form.Item
                        label={
                            <Text style={{ lineHeight: '25px' }}>
                                <br />
                                Leg Levers:
                            </Text>
                        }
                        name={['leg_levers', 'id']}
                        colon={false}
                    >
                        <Select style={{ marginTop: '20px' }}>
                            {/* @ts-expect-error TS(2339): Property 'legs' does not exist on type '{}'. */}
                            {classifications.legs?.map(
                                (hardware: { id: any; name: any }) => {
                                    return (
                                        <Select.Option
                                            value={hardware.id}
                                            key={shortId()}
                                        >
                                            {hardware.name}
                                        </Select.Option>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <br />
                    {RenderCell(20)}
                </Col>
                <Col span={3}>
                    <Text>Quantity per Box</Text>
                    <Form.Item label="" name="functional_quantity_per_box">
                        <InputNumber />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

function SuspensionSystemForm() {
    const [form] = Form.useForm()
    const hardwareCtx = useContext(HardwareContext)
    const params = useParams<{ id?: string }>()

    const { hardware, classifications, onRoomHardwareItemChange } = hardwareCtx

    const onValuesChange = (values) => {
        onRoomHardwareItemChange(params.id, values)
    }

    React.useEffect(() => {
        form.resetFields()
    }, [hardware])

    return (
        <Form
            form={form}
            initialValues={hardware}
            onValuesChange={onValuesChange}
            layout="vertical"
            className="bordered-row"
        >
            <Row>
                <Col span={20}>
                    <Title level={4}>Suspension System</Title>
                </Col>
                <Col span={4}>
                    <Text>Quantity per Box</Text>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Suspension Block"
                        name={['suspension_block', 'id']}
                    >
                        <Select>
                            {/* @ts-expect-error TS(2339): Property 'suspensionBlocks' does not exist on type... Remove this comment to see the full error message */}
                            {classifications.suspensionBlocks?.map(
                                (hardware: { id: any; name: any }) => {
                                    return (
                                        <Select.Option
                                            value={hardware.id}
                                            key={shortId()}
                                        >
                                            {hardware.name}
                                        </Select.Option>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={3}>
                    <RenderNestedText label="Fin.">
                        <Text style={{ lineHeight: '30px' }}> 2</Text>
                    </RenderNestedText>
                </Col>
                <Col span={3}>
                    <RenderNestedText label="Unfin.">
                        <Text style={{ lineHeight: '30px' }}> 4</Text>
                    </RenderNestedText>
                </Col>
                <Col span={3}>
                    <RenderNestedText label="Fin.">
                        <Form.Item name="suspension_quantity_per_box_finished">
                            <InputNumber style={nestedInputStyle} />
                        </Form.Item>
                    </RenderNestedText>
                </Col>
                <Col span={3}>
                    <RenderNestedText label="Unfin.">
                        <Form.Item name="suspension_quantity_per_box_unfinished">
                            <InputNumber style={nestedInputStyle} />
                        </Form.Item>
                    </RenderNestedText>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Suspension Rail"
                        name={['suspension_rail', 'id']}
                    >
                        <Select>
                            {/* @ts-expect-error TS(2339): Property 'suspensionRails' does not exist on type ... Remove this comment to see the full error message */}
                            {classifications.suspensionRails?.map(
                                (hardware: { id: any; name: any }) => {
                                    return (
                                        <Select.Option
                                            value={hardware.id}
                                            key={shortId()}
                                        >
                                            {hardware.name}
                                        </Select.Option>
                                    )
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <br />
                    {RenderCell(20)}
                </Col>
            </Row>
        </Form>
    )
}

export default function CabinetCountTable() {
    const [baseTallCabinetsData, setBaseTallCabinetsData] = useState({
        id: shortId(),
    })
    const [upperCabinetsData, setUpperCabinetData] = useState({ id: shortId() })
    const hardwareCtx = useContext(HardwareContext)
    const [drawerFrontCount, setDrawerFrontCount] = useState(0)
    const [drawerBoxCount, setDrawerBoxCount] = useState(0)
    const [rollOutCount, setRollOutCount] = useState(0)
    const params = useParams<{ id?: string }>()

    const onCreateRoomHardware = async (hardwareId) => {
        try {
            const payload = { roomId: params.id, hardwareId }

            await hardwareCtx.onCreateRoomHardware(payload)
        } catch (error) {
            console.log(error)
        }
    }

    const onCountCabinets = async () => {
        try {
            const baseTallCabs = await getCabinetByRoom(
                params.id,
                getQueryString({ category: 'Base,Tall' })
            )
            const upperCabs = await getCabinetByRoom(
                params.id,
                getQueryString({ category: 'Upper' })
            )

            const allCabs = await getCabinetByRoom(params.id)

            setBaseTallCabinetsData({
                ...baseTallCabinetsData,

                // @ts-expect-error TS(2345): Argument of type '{ name: string; quantity: any; n... Remove this comment to see the full error message
                name: 'Base Vanity & Tall Cabinet',
                quantity: baseTallCabs[1],
                numberOfBaseDoors: getFieldTotal(baseTallCabs[0], 'base_doors'),
            })

            setUpperCabinetData({
                ...upperCabinetsData,

                // @ts-expect-error TS(2345): Argument of type '{ name: string; quantity: any; n... Remove this comment to see the full error message
                name: 'Upper Cabinet',
                quantity: upperCabs[1],
                numberOfUpperDoors: getFieldTotal(upperCabs[0], 'upper_doors'),
            })

            setDrawerFrontCount(
                getDrawerFrontTotal(allCabs[0], 'drawer_part', 'front_height')
            )
            setDrawerBoxCount(
                getDrawerFrontTotal(
                    allCabs[0],
                    'five_part_tray_box',
                    'box_height'
                )
            )
            setRollOutCount(
                getDrawerFrontTotal(allCabs[0], 'tray_part', 'back_height')
            )
        } catch (error) {
            console.error(error)
        }
    }

    const cabinetColumns = [
        {
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Linear Footage',
            key: 'linear_footage',
            dataIndex: 'linear_footage',
        },
    ]

    const doorDrawerColumns = [
        {
            key: 'name',
            dataIndex: 'name',
        },
        {
            key: 'count',
            dataIndex: 'count',
        },
    ]

    const cabinetData = [
        baseTallCabinetsData,
        upperCabinetsData,
        {
            name: 'Finished Upper Cabinet',
            quantity: 0,
            id: shortId(),
        },
        {
            name: 'Total Footage ot Upper Cabinet',
            quantity: 0,
            id: shortId(),
        },
    ]

    const doorDrawerData = [
        {
            name: 'Base Doors',

            // @ts-expect-error TS(2339): Property 'numberOfBaseDoors' does not exist on typ... Remove this comment to see the full error message
            count: baseTallCabinetsData.numberOfBaseDoors,
            id: shortId(),
        },
        {
            name: 'Upper Doors',

            // @ts-expect-error TS(2339): Property 'numberOfUpperDoors' does not exist on ty... Remove this comment to see the full error message
            count: upperCabinetsData.numberOfUpperDoors,
            id: shortId(),
        },
        {
            name: 'Total Doors',

            count: toFixed(
                // @ts-expect-error TS(2339): Property 'numberOfBaseDoors' does not exist on typ... Remove this comment to see the full error message
                baseTallCabinetsData.numberOfBaseDoors +
                    // @ts-expect-error TS(2339): Property 'numberOfUpperDoors' does not exist on ty... Remove this comment to see the full error message
                    upperCabinetsData.numberOfUpperDoors
            ),
            id: shortId(),
        },
        {
            name: 'Drawer Fronts',
            count: drawerFrontCount,
            id: shortId(),
        },
        {
            name: 'Drawer Boxes',
            count: drawerBoxCount,
            id: shortId(),
        },
        {
            name: 'Roll Out Trays',
            count: rollOutCount,
            id: shortId(),
        },
    ]

    React.useEffect(() => {
        // @ts-expect-error TS(2339): Property 'onGetDefaultHardwares' does not exist on... Remove this comment to see the full error message
        hardwareCtx.onGetDefaultHardwares()

        hardwareCtx.onGetRoomHardware(params.id)

        // @ts-expect-error TS(2339): Property 'onGetHardwareClassifications' does not e... Remove this comment to see the full error message
        hardwareCtx.onGetHardwareClassifications(params.id)

        onCountCabinets()
    }, [])

    return (
        <Row>
            <Col span={12} className="bordered-row">
                {/* @ts-expect-error TS(2322): Type '{ className: string; pagination: boolean; ro... Remove this comment to see the full error message */}
                <Table
                    title={() => (
                        // @ts-expect-error TS(2322): Type '{ children: string; strong: true; level: num... Remove this comment to see the full error message
                        <Text strong level={4}>
                            Cabinet Counts
                        </Text>
                    )}
                    columns={cabinetColumns}
                    dataSource={cabinetData}
                    {...tblProps}
                    className="transparent-header"
                />
            </Col>
            <Col span={12} className="bordered-row">
                {/* @ts-expect-error TS(2322): Type '{ pagination: boolean; rowKey: string; size:... Remove this comment to see the full error message */}
                <Table
                    title={() => (
                        // @ts-expect-error TS(2322): Type '{ children: string; strong: true; level: num... Remove this comment to see the full error message
                        <Text strong level={4}>
                            Doors/Drawers Counts
                        </Text>
                    )}
                    columns={doorDrawerColumns}
                    dataSource={doorDrawerData}
                    showHeader={false}
                    {...tblProps}
                />
            </Col>

            <Col span={24} style={{ height: '40px' }} />

            <Col span={24} className="bordered-row">
                <Form>
                    <Form.Item label="Default Hardware">
                        <Select
                            onChange={onCreateRoomHardware}
                            // @ts-expect-error TS(2339): Property 'hardware_name' does not exist on type '{... Remove this comment to see the full error message
                            value={hardwareCtx.hardware.hardware_name?.name}
                        >
                            {/* @ts-expect-error TS(2339): Property 'map' does not exist on type 'number | an... Remove this comment to see the full error message */}
                            {hardwareCtx.defaultHardwares?.[0]?.map(
                                (hardware: {
                                    hardware_name: { name: any }
                                }) => (
                                    <Select.Option
                                        value={get(hardware, 'id')}
                                        key={shortId()}
                                    >
                                        {hardware.hardware_name?.name}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>
                </Form>

                <Alert
                    message="Select Default Hardware or select each hardware item below (leave nothing blank)"
                    type="info"
                />
            </Col>

            <Col span={24}>
                <br />
                <SurfaceHardwareForm />
                <br />
                <FunctionalHardwareForm />
                <br />
                <SuspensionSystemForm />
            </Col>
        </Row>
    )
}
