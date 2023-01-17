import {
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    Typography,
} from 'antd'
import debounce from 'lodash/debounce'
import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import UILayout from '../../../components/templates/uilayout'

import toast from 'react-hot-toast'
import {
    getOneHardware,
    getSetupHardware,
    updateHardware,
} from '../../../api/hardwares'
import { hardwareClassifications } from '../../../utilities/constants'
import { shortId } from '../../../utilities/utils'
import { PageHeader } from './components'

const { Title } = Typography

export default function Hardware() {
    const [form] = Form.useForm()
    const params = useParams<{ id?: string }>()
    const [hardware, setHardware] = useState<{ id?: string; name?: string }>({})
    const [doorDrawers, setDoorDrawers] = useState([])
    const [drawerRolloutGuides, setDrawerRolloutGuides] = useState([])
    const [hinges, setHinges] = useState([])
    const [legs, setLegs] = useState([])
    const [suspensionBlocks, setSuspensionBlocks] = useState([])
    const [suspensionRails, setSuspensionRails] = useState([])

    const getOne = async () => {
        try {
            const hardware = await getOneHardware(params.id)

            setHardware(hardware)
        } catch (error) {
            console.log(error)
        }
    }

    const getSetupData = async () => {
        try {
            const [
                doors_and_drawers,
                drawer_rollout_guides,
                hinges,
                legs,
                suspension_blocks,
                suspension_rails,
            ] = await Promise.all(
                await hardwareClassifications.map(
                    async (classification) =>
                        await getSetupHardware(
                            `?classification=${classification.value}`
                        )
                )
            )

            setDoorDrawers(doors_and_drawers[0])
            setDrawerRolloutGuides(drawer_rollout_guides[0])
            setHinges(hinges[0])
            setLegs(legs[0])
            setSuspensionBlocks(suspension_blocks[0])
            setSuspensionRails(suspension_rails[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        form.resetFields()
    }, [hardware])

    useEffect(() => {
        getOne()
        getSetupData()
    }, [])

    const onValuesChange = debounce(async (value, values) => {
        try {
            await updateHardware(hardware.id, values)
        } catch (error) {
            toast.error('Failed to update!')
        }
    }, 1000)

    return (
        <UILayout
            ToolbarContent={
                <PageHeader
                    allowAlter
                    label={hardware?.name}
                    parent={{ label: 'Hardwares', path: '/hardwares' }}
                />
            }
        >
            <Form
                onValuesChange={onValuesChange}
                form={form}
                initialValues={hardware}
                layout="vertical"
                className="pagewrapper__maincontent nomargin"
            >
                <Col className="pagewrapper">
                    <Row>
                        <Col span={24}>
                            <Row>
                                <Col span={8}>
                                    <Form.Item
                                        name={['hardware_name', 'name']}
                                        label="Default Name"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col span={8} className="padded-content-left">
                                    <Form.Item
                                        name="base_style"
                                        label="Base Style"
                                    >
                                        <Radio.Group>
                                            <Radio value="standard">
                                                Standard
                                            </Radio>
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
                                        name="description"
                                        label="Description or Purpose"
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        <Divider />

                        <Col span={8} className="bordered-row">
                            <Title level={4}>Fuctional Hardware</Title>
                            <Form.Item
                                label="Drawer Guides"
                                name={['drawer_guides', 'id']}
                            >
                                <Select>
                                    {drawerRolloutGuides.map((hardware) => {
                                        return (
                                            <Select.Option
                                                value={hardware.id}
                                                key={shortId()}
                                            >
                                                {hardware.name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Roll-Out Guide"
                                name={['rollout_guides', 'id']}
                            >
                                <Select>
                                    {drawerRolloutGuides.map((hardware) => {
                                        return (
                                            <Select.Option
                                                value={hardware.id}
                                                key={shortId()}
                                            >
                                                {hardware.name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Hinge" name={['hinge', 'id']}>
                                <Select>
                                    {hinges.map((hardware) => {
                                        return (
                                            <Select.Option
                                                value={hardware.id}
                                                key={shortId()}
                                            >
                                                {hardware.name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Leg Levers"
                                name={['leg_levers', 'id']}
                            >
                                <Select>
                                    {legs.map((hardware) => {
                                        return (
                                            <Select.Option
                                                value={hardware.id}
                                                key={shortId()}
                                            >
                                                {hardware.name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Quantity per Box"
                                name="functional_quantity_per_box"
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>

                        <Col span={8} className="padded-content-left">
                            <Title level={4}>Suspension System</Title>
                            <Form.Item
                                label="Suspension Block"
                                name={['suspension_block', 'id']}
                            >
                                <Select>
                                    {suspensionBlocks.map((hardware) => {
                                        return (
                                            <Select.Option
                                                value={hardware.id}
                                                key={shortId()}
                                            >
                                                {hardware.name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Suspension Rail"
                                name={['suspension_rail', 'id']}
                            >
                                <Select>
                                    {suspensionRails.map((hardware) => {
                                        return (
                                            <Select.Option
                                                value={hardware.id}
                                                key={shortId()}
                                            >
                                                {hardware.name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Quantity per Box">
                                <Input.Group compact>
                                    <Form.Item
                                        name="suspension_quantity_per_box_finished"
                                        label="Finished"
                                    >
                                        <InputNumber placeholder="Fin." />
                                    </Form.Item>

                                    <Form.Item
                                        name="suspension_quantity_per_box_unfinished"
                                        label="Unfinised"
                                    >
                                        <InputNumber placeholder="Unfin." />
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </Col>

                        <Col span={8} className="padded-content-left">
                            <Title level={4}>Surface Hardware</Title>
                            <Form.Item label="Doors" name={['doors', 'id']}>
                                <Select>
                                    {doorDrawers.map((hardware) => {
                                        return (
                                            <Select.Option
                                                value={hardware.id}
                                                key={shortId()}
                                            >
                                                {hardware.name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Drawers" name={['drawers', 'id']}>
                                <Select>
                                    {doorDrawers.map((hardware) => {
                                        return (
                                            <Select.Option
                                                value={hardware.id}
                                                key={shortId()}
                                            >
                                                {hardware.name}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Form>
        </UILayout>
    )
}
