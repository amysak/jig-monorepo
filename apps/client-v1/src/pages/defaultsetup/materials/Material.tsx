import { Col, Form, Input, Radio, Row, Tabs } from 'antd'
import debounce from 'lodash/debounce'
import React, { useContext, useEffect } from 'react'
import { Route, useNavigate, useParams } from 'react-router-dom'

import ExteriorTab from '../../../components/molecules/roomtabs/materials/ExteriorTab'
import InteriorTab from '../../../components/molecules/roomtabs/materials/InteriorTab'
import UILayout from '../../../components/templates/uilayout'
import { MaterialContext } from '../../../store/materials'
import { PageHeader } from './components'

const panes = [
    { tab: 'Exterior Parts', Content: ExteriorTab, route: 'exterior' },
    { tab: 'Interior Parts', Content: InteriorTab, route: 'interior' },
]
const { TabPane } = Tabs

function HeaderForm() {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const params = useParams<{ id?: string; tab?: string }>()
    const materialCtx = useContext(MaterialContext)
    const { material } = materialCtx

    useEffect(() => {
        if (!params.tab)
            navigate(`/default-setup/materials/${params.id}/exterior`, {
                replace: true,
            })
    }, [params])

    useEffect(() => {
        form.resetFields()
    }, [material])

    const onValuesChange = debounce(async (value, values) => {
        try {
            await materialCtx.update(values, true)
        } catch (error) {
            console.log(error)
        }
    }, 1000)

    return (
        <Form
            onValuesChange={onValuesChange}
            initialValues={material}
            form={form}
            layout="vertical"
            className="pagewrapper__toprow"
        >
            <Row>
                <Col span={8}>
                    <Form.Item
                        label="Default Name"
                        name={['material_name', 'name']}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8} className="padded-content-left">
                    <Form.Item label="Base Style" name="base_style">
                        <Radio.Group>
                            <Radio value="standard">Standard</Radio>
                            <Radio value="adjustable legs">
                                Adjustable Legs
                            </Radio>
                            <Radio value="separate base platform">
                                Separate Base Platform
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col span={8} className="padded-content-left">
                    <Form.Item
                        label="Description or Purpose"
                        name="description"
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default function Material() {
    const navigate = useNavigate()
    const params = useParams<{ id?: string; tab?: string }>()
    const materialCtx = useContext(MaterialContext)
    const { material } = materialCtx

    useEffect(() => {
        if (!params.tab)
            navigate(`/default-setup/materials/${params.id}/exterior`, {
                replace: true,
            })

        materialCtx.getMaterial(params.id)

        materialCtx.getSetupMaterialsData()
    }, [params])

    return (
        <UILayout
            ToolbarContent={
                <PageHeader
                    allowAlter
                    label={material?.name}
                    parent={{ label: 'Materials', path: '/materials' }}
                />
            }
        >
            <Col className="pagewrapper">
                {/* @ts-expect-error TS(2322): Type '{ material: {}; }' is not assignable to type... Remove this comment to see the full error message */}
                <HeaderForm material={material} />

                <br />
                <br />

                <Tabs
                    defaultActiveKey="exterior"
                    activeKey={params.tab}
                    onChange={(tab) =>
                        navigate(`/default-setup/materials/${params.id}/${tab}`)
                    }
                    style={{ width: '100%' }}
                    className="pagewrapper__maincontent"
                >
                    {panes.map((pane) => (
                        <TabPane key={pane.route} tab={pane.tab}>
                            <Route
                                element={<pane.Content />}
                                path={`/default-setup/materials/:id/${pane.route}`}
                            />
                        </TabPane>
                    ))}
                </Tabs>
            </Col>
        </UILayout>
    )
}
