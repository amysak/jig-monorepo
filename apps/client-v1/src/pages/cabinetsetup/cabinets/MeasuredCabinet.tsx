import {
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    Tabs,
    Typography,
} from 'antd'
import debounce from 'lodash/debounce'
import React, { useContext, useEffect } from 'react'
import { Route, useNavigate, useParams } from 'react-router-dom'

import DoorSpecification from './tabs/DoorSpecification'
import FaceFrameSpecification from './tabs/FaceFrameSpecification'
import FivePartDrawerBox from './tabs/FivePartDrawerBox'
import FivePartTrayBox from './tabs/FivePartTrayBox'
import MetalDrawerSystem from './tabs/MetalDrawerSystem'
import MetalTraySystem from './tabs/MetalTraySystem'
import CabinetSpecifications from './tabs/specifications'

import { CabinetContext } from '../../../store/cabinets'
import { inputNumberCostProps } from '../../../utilities'
import {
    ACTIVE_INACTIVE_STATUSES_OPTIONS,
    CABINET_STYLES,
} from '../../../utilities/constants'
import { capitalize, shortId } from '../../../utilities/utils'
import './cabinet.scss'

const { Title } = Typography
const formLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
}

function LeftSide() {
    const [form] = Form.useForm()
    const cabinetCtx = useContext(CabinetContext)

    const { cabinet } = cabinetCtx

    React.useEffect(() => form.resetFields(), [cabinet])

    const onValuesChange = debounce(
        async (value, values: { cabinet_height: any }) => {
            await cabinetCtx.onUpdateCabinet(cabinet.id, values)
        },
        1000
    )

    return (
        <Form
            form={form}
            initialValues={cabinet}
            onValuesChange={onValuesChange}
            {...formLayout}
            className="pagewrapper__leftside"
        >
            <Form.Item label="Name" name="name">
                <Input placeholder="Enter Cabinet Name" />
            </Form.Item>

            <Form.Item name="interior" label="Interior">
                <Radio.Group style={{ width: '100%' }}>
                    <Radio value="f">F</Radio>
                    <Radio value="u">U</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="favourite"
                valuePropName="checked"
                label="Favourite"
            >
                <Checkbox />
            </Form.Item>

            <Form.Item name="corner" valuePropName="checked" label="Corner">
                <Checkbox />
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
                {() => {
                    if (!form.getFieldValue('corner')) return null

                    return (
                        <Form.Item label="Corner Style" name="corner_style">
                            <Select>
                                {['blind', 'diagonal', '90 degree'].map(
                                    (value) => (
                                        <Select.Option value={value}>
                                            {capitalize(value)}
                                        </Select.Option>
                                    )
                                )}
                            </Select>
                        </Form.Item>
                    )
                }}
            </Form.Item>

            <Form.Item name="status" label="Status">
                <Select>
                    {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
                        <Select.Option value={option.value} key={shortId()}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="style" label="Style">
                <Select>
                    {CABINET_STYLES.map((style) => (
                        <Select.Option value={style} key={style}>
                            {capitalize(style)}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Title level={4}>Size</Title>

            <Form.Item name="cabinet_height" label="Floor to Top of Cabinet">
                <InputNumber />
            </Form.Item>
            <Form.Item name="cabinet_depth" label="Cabinet Depth">
                <InputNumber />
            </Form.Item>

            <Title level={4}>Door and Drawer Counts</Title>
            <Form.Item label="Number of Opennings" name="number_of_opennings">
                <InputNumber max={5} min={0} />
            </Form.Item>
            <Form.Item name="upper_doors" label="Number of Upper Doors">
                <InputNumber />
            </Form.Item>
            <Form.Item name="base_doors" label="Number of Base Doors">
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item
                name="number_of_drawer_fronts"
                label="Number of Drawer Fronts"
            >
                <InputNumber max={5} min={0} />
            </Form.Item>

            <Form.Item
                label="Number of Drawer Boxes"
                name="number_of_drawers_boxes"
            >
                <InputNumber max={5} min={0} />
            </Form.Item>

            <Form.Item label="Roll out Trays" name="number_of_rollout_trays">
                <InputNumber max={5} min={0} />
            </Form.Item>

            <Title level={4}>Additional Costs</Title>
            <Form.Item
                name="additional_material_cost"
                label="Additional Material Cost"
            >
                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                <InputNumber {...inputNumberCostProps} />
            </Form.Item>
            <Form.Item
                name="additional_installation_cost"
                label="Additional Installation Labor"
            >
                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                <InputNumber {...inputNumberCostProps} />
            </Form.Item>
            <Form.Item
                name="additional_shop_labor"
                label="Additional Shop Labor"
            >
                {/* @ts-expect-error TS(2322): Type '{ min: number; step: number; controls: boole... Remove this comment to see the full error message */}
                <InputNumber {...inputNumberCostProps} />
            </Form.Item>
        </Form>
    )
}

export default function MeasuredCabinet() {
    const navigate = useNavigate()
    const params = useParams<{ id?: string; cabinetTab?: string }>()

    useEffect(() => {
        if (!params.cabinetTab)
            navigate(
                `/cabinet-setup/cabinets/${params.id}/cabinet-specifications`,
                { replace: true }
            )
    })

    const panes = [
        {
            tab: 'Cabinet Specifications',
            Component: CabinetSpecifications,
            route: 'cabinet-specifications',
        },
        {
            tab: 'Door Specifications',
            Component: DoorSpecification,
            route: 'door-specifications',
        },
        {
            tab: 'Metal Drawer System',
            Component: MetalDrawerSystem,
            route: 'metal-drawer-system',
        },
        {
            tab: 'Five Part Drawer Box',
            Component: FivePartDrawerBox,
            route: 'five-part-drawer-box',
        },
        {
            tab: 'Metal Tray System',
            Component: MetalTraySystem,
            route: 'metal-tray-system',
        },
        {
            tab: 'Five Part Tray Box',
            Component: FivePartTrayBox,
            route: 'five-part-tray-box',
        },
        {
            tab: 'Face Frame Specifications',
            Component: FaceFrameSpecification,
            route: 'face-frame-specifications',
        },
    ]

    return (
        <Row className="pagewrapper">
            <Col span={5}>
                <LeftSide />
            </Col>
            <Col span={19}>
                <div className="pagewrapper__maincontent">
                    <Tabs
                        defaultActiveKey="cabinet-pecifications"
                        activeKey={params.cabinetTab}
                        onChange={(cabinetTab) =>
                            navigate(
                                `/cabinet-setup/cabinets/${params.id}/${cabinetTab}`
                            )
                        }
                        style={{ width: '100%' }}
                    >
                        {panes.map((pane) => (
                            <Tabs.TabPane key={pane.route} tab={pane.tab}>
                                <Route
                                    path={`/cabinet-setup/cabinets/:id?/${pane.route}`}
                                    element={<pane.Component />}
                                />
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </div>
            </Col>
        </Row>
    )
}
