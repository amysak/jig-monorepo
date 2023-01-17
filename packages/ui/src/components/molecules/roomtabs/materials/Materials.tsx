import { Button, Col, Form, Popover, Row, Select, Tabs } from 'antd'
import React, { useContext, useEffect } from 'react'
import { Route, useNavigate, useParams } from 'react-router-dom'

import FinishMaterialCostPopver from './finishmaterialcostpopover'
import MaterialCostPopover from './materialcostpopover'
import ProfileCostPopver from './profilecostpopover'

import { useSelector } from 'react-redux'
import { MaterialContext } from '../../../../store/materials'
import { shortId } from '../../../../utilities/utils'
import '../roomtabs.scss'

const ExteriorTab = React.lazy(() => import('./ExteriorTab'))

const InteriorTab = React.lazy(() => import('./InteriorTab'))

const { TabPane } = Tabs
const popoverProps = {
    placement: 'leftBottom',
    trigger: 'click',
    style: {
        width: '500px',
        height: '1000px',
    },
}

function DefaultMaterialSelectForm() {
    const [form] = Form.useForm()
    const materialCtx = useContext(MaterialContext)
    const { material, defaultMaterials } = materialCtx

    // @ts-expect-error TS(2339): Property 'room' does not exist on type 'DefaultRoo... Remove this comment to see the full error message
    const room = useSelector((state) => state.room)

    const onChange = (values: { material_name: { name: any } }) => {
        const selectedMaterial = defaultMaterials[0].find(
            (material: { id: any }) => {
                return material.id === values.material_name.name
            }
        )

        materialCtx.createMaterialForARoom(room.id, {
            materialId: selectedMaterial.id,
        })
    }

    React.useEffect(() => {
        form.resetFields()
    }, [material])

    return (
        <Form form={form} initialValues={material} onValuesChange={onChange}>
            <Form.Item
                label="Default materials"
                name={['material_name', 'name']}
                extra="Select Default Materials or select each material below (leave nothing blank)"
            >
                <Select style={{ width: '50%', margin: '0 5px' }}>
                    {defaultMaterials[0].map(
                        (material: {
                            id: any
                            material_name: { name: any }
                        }) => (
                            <Select.Option value={material.id} key={shortId()}>
                                {material.material_name?.name ?? 'Missing name'}
                            </Select.Option>
                        )
                    )}
                </Select>
            </Form.Item>
        </Form>
    )
}

function RoomMaterials() {
    const navigate = useNavigate()
    const params = useParams<{ id?: string }>()
    const materialCtx = useContext(MaterialContext)

    useEffect(() => {
        materialCtx.getMaterialByRoomId(params.id)

        materialCtx.getDefaultMaterialsData()

        materialCtx.getSetupMaterialsData()
    }, [])

    useEffect(() => {
        // @ts-expect-error TS(2339): Property 'materialTab' does not exist on type '{}'... Remove this comment to see the full error message
        if (!params.materialTab)
            navigate(`/rooms/${params.id}/materials/exterior`, {
                replace: true,
            })
    }, [params])

    return (
        <Row>
            <Col flex="auto">
                <DefaultMaterialSelectForm />
            </Col>

            <Col
                span={6}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
                {/* @ts-expect-error TS(2322): Type '{ children: Element; placement: string; trig... Remove this comment to see the full error message */}
                <Popover content={<MaterialCostPopover />} {...popoverProps}>
                    <Button style={{ margin: '0 2px' }} className="jig-button">
                        Material Costs
                    </Button>
                </Popover>

                {/* @ts-expect-error TS(2322): Type '{ children: Element; placement: string; trig... Remove this comment to see the full error message */}
                <Popover
                    content={<FinishMaterialCostPopver />}
                    {...popoverProps}
                >
                    <Button style={{ margin: '0 2px' }} className="jig-button">
                        Finished Materials Costs
                    </Button>
                </Popover>

                {/* @ts-expect-error TS(2322): Type '{ children: Element; placement: string; trig... Remove this comment to see the full error message */}
                <Popover content={<ProfileCostPopver />} {...popoverProps}>
                    <Button style={{ margin: '0 2px' }} className="jig-button">
                        Profile Costs
                    </Button>
                </Popover>
            </Col>

            <Col span={24}>
                <Tabs
                    defaultActiveKey="exterior"
                    // @ts-expect-error TS(2339): Property 'materialTab' does not exist on type '{}'... Remove this comment to see the full error message
                    activeKey={params.materialTab}
                    onChange={(materialTab) =>
                        navigate(`/rooms/${params.id}/materials/${materialTab}`)
                    }
                >
                    <TabPane tab="Exterior Parts" key="exterior">
                        <Route
                            path={`/rooms/:id?/materials/exterior`}
                            element={<ExteriorTab />}
                        />
                    </TabPane>

                    <TabPane tab="Interior Parts" key="interior">
                        <Route
                            path={`/rooms/:id?/materials/interior`}
                            element={<InteriorTab />}
                        />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}

export default RoomMaterials
