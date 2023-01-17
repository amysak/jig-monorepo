import {
    Alert,
    Col,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Typography,
} from 'antd'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { getCabinetsByRoomRequest } from '../../../../actions/cabinets'
import { updateRoomRequest } from '../../../../actions/rooms'
import { getRoom, resetRoomLaborRate, updateRoom } from '../../../../api/rooms'
import { store } from '../../../../store'
import { inputNumberCostProps } from '../../../../utilities'
import './laborrates.scss'

const { Title } = Typography

const layout = {
    wrapperCol: { span: 18 },
    labelCol: { span: 6 },
}

const installationLaborProps = {
    base: {
        label: 'Base Cabinet',
    },
    upper: {
        label: 'Upper Cabinet',
    },
    tall: {
        label: 'Tall Cabinet',
    },
    vanity: {
        label: 'Vanity Cabinet',
    },
    filler: {
        label: 'Fillers',
    },
    toe_board: {
        label: 'Toe Board',
    },
    toe_platform: {
        label: 'Toe Platform',
    },
    face_frame: {
        label: 'Face Frame',
    },
    applied_end: {
        label: 'Applied End',
    },
    appliance_panel: {
        label: 'Appliance Panel',
    },
    wainscot_panel: {
        label: 'Wainscot Panel',
    },
}

const shopLaborProps = {
    base: {
        label: 'Base Cabinet',
    },
    upper: {
        label: 'Upper Cabinet',
    },
    tall: {
        label: 'Tall Cabinet',
    },
    vanity: {
        label: 'Vanity Cabinet',
    },
    filler: {
        label: 'Fillers',
    },
    toe_board: {
        label: 'Toe Board',
    },
    toe_platform: {
        label: 'Toe Platform',
    },
    face_frame: {
        label: 'Face Frame',
    },
}

export default function LaborRates() {
    const [form] = Form.useForm()
    const params = useParams<{ id?: string }>()
    const [room, setRoom] = useState({})

    const getRoomData = async () => {
        try {
            const room = await getRoom(params.id)

            setRoom(room)
        } catch (error) {
            console.error(error)
        } finally {
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    const clearLaborRate = async (payload: {} | undefined) => {
        try {
            await updateRoom(params.id, payload)

            setRoom({ ...room, ...payload })
        } catch (error) {
            console.error(error)
        } finally {
        }
    }

    const resetLaborRates = async (category: string, key: string) => {
        try {
            const updatedRoom = await resetRoomLaborRate(params.id, category)

            setRoom({ ...room, [key]: updatedRoom[key] })
        } catch (error) {
            console.error(error)
        } finally {
        }
    }

    const onChange = (values, payload) => {
        try {
            // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
            store.dispatch(updateRoomRequest(room.id, payload))
        } catch {}
    }

    useEffect(() => {
        store.dispatch(getCabinetsByRoomRequest(params.id))

        getRoomData()
    }, [])

    useEffect(() => form.resetFields(), [room])

    const onValuesChange = debounce(onChange, 1000)

    return (
        <Form
            initialValues={room}
            form={form}
            {...layout}
            onValuesChange={onValuesChange}
        >
            <Row className="laborrateswrapper">
                <Col span={12}>
                    <Alert message="Edit Labor Rates if Needed" type="info" />
                </Col>

                <br />
                <br />
                <br />

                <Col span={12} />

                <Col span={8}>
                    <div className="bordered-row">
                        <Title level={4}>Installation Labor</Title>

                        {Object.keys(installationLaborProps).map((key) => (
                            <Form.Item
                                key={key}
                                label={installationLaborProps[key].label}
                                name={['installation_labor', key]}
                            >
                                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                <InputNumber {...inputNumberCostProps} />
                            </Form.Item>
                        ))}

                        <br />
                        <br />

                        <Radio.Group>
                            <Radio.Button
                                className="jig-button"
                                onClick={() =>
                                    resetLaborRates(
                                        'installation',
                                        'installation_labor'
                                    )
                                }
                            >
                                Reset
                            </Radio.Button>

                            <Radio.Button
                                className="jig-button"
                                onClick={() =>
                                    clearLaborRate({ installation_labor: null })
                                }
                            >
                                Clear
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                </Col>

                <Col span={8}>
                    <div className="bordered-row">
                        <Title level={4}>Shop Labor</Title>

                        {Object.keys(shopLaborProps).map((key) => (
                            <Form.Item
                                key={key}
                                label={shopLaborProps[key].label}
                                name={['shop_labor', key]}
                            >
                                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                <InputNumber {...inputNumberCostProps} />
                            </Form.Item>
                        ))}

                        <br />
                        <br />

                        <Radio.Group>
                            <Radio.Button
                                className="jig-button"
                                onClick={() =>
                                    resetLaborRates('shop labor', 'shop_labor')
                                }
                            >
                                Reset
                            </Radio.Button>

                            <Radio.Button
                                className="jig-button"
                                onClick={() =>
                                    clearLaborRate({ shop_labor: null })
                                }
                            >
                                Clear
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                </Col>

                <Col span={8}>
                    <div className="bordered-row">
                        <Title level={4}>Drawer Labor</Title>

                        <Form.Item label="Drawer Box">
                            <Input.Group compact>
                                <Form.Item
                                    name={[
                                        'drawer_labor',
                                        'drawer_box',
                                        'dovetail',
                                    ]}
                                    extra="Dovetail"
                                >
                                    {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                    <InputNumber {...inputNumberCostProps} />
                                </Form.Item>
                                <Form.Item
                                    name={[
                                        'drawer_labor',
                                        'drawer_box',
                                        'rabbet',
                                    ]}
                                    extra="Rabbet"
                                >
                                    {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                    <InputNumber {...inputNumberCostProps} />
                                </Form.Item>
                                <Form.Item
                                    name={[
                                        'drawer_labor',
                                        'drawer_box',
                                        'butt',
                                    ]}
                                    extra="Butt"
                                >
                                    {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                    <InputNumber {...inputNumberCostProps} />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                        <Form.Item label="Tray Box">
                            <Input.Group compact>
                                <Form.Item
                                    name={[
                                        'drawer_labor',
                                        'tray_box',
                                        'dovetail',
                                    ]}
                                    extra="Dovetail"
                                >
                                    {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                    <InputNumber {...inputNumberCostProps} />
                                </Form.Item>
                                <Form.Item
                                    name={[
                                        'drawer_labor',
                                        'tray_box',
                                        'rabbet',
                                    ]}
                                    extra="Rabbet"
                                >
                                    {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                    <InputNumber {...inputNumberCostProps} />
                                </Form.Item>
                                <Form.Item
                                    name={['drawer_labor', 'tray_box', 'butt']}
                                    extra="Butt"
                                >
                                    {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                                    <InputNumber {...inputNumberCostProps} />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                        <br />
                        <br />

                        <Radio.Group>
                            <Radio.Button
                                className="jig-button"
                                onClick={() =>
                                    resetLaborRates(
                                        'drawer box',
                                        'drawer_labor'
                                    )
                                }
                            >
                                Reset
                            </Radio.Button>

                            <Radio.Button
                                className="jig-button"
                                onClick={() =>
                                    clearLaborRate({ drawer_labor: null })
                                }
                            >
                                Clear
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                </Col>
            </Row>
        </Form>
    )
}
