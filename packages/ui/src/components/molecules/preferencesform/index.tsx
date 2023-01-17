import { Checkbox, Col, Form, Input, Select, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

import { AccountContext } from '../../../store/account'
import { shortId } from '../../../utilities/utils'
import './preferenceform.scss'

import { getDefaultHardwares } from '../../../api/hardwares'
import { getDefaultLetters } from '../../../api/letters'
import { getDefaultMarkups } from '../../../api/markups'
import { getDefaultMaterials } from '../../../api/materials'
import { getDefaultTerms } from '../../../api/terms'

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

function PreferencesForm() {
    const [form] = Form.useForm()
    const accountCtx = useContext(AccountContext)

    const [markups, setMarkups] = useState([])
    const [terms, setTerms] = useState([])
    const [hardwares, setHardwares] = useState([])
    const [materials, setMaterials] = useState([])
    const [, setLetters] = useState([])

    const getPageData = async () => {
        try {
            const [markups, terms, hardwares, materials, letters] =
                await Promise.all([
                    await getDefaultMarkups(),
                    await getDefaultTerms(),
                    await getDefaultHardwares(),
                    await getDefaultMaterials(),
                    await getDefaultLetters(),
                ])

            setMarkups(markups[0])
            setTerms(terms[0])
            setHardwares(hardwares[0])
            setMaterials(materials[0])
            setLetters(letters[0])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPageData()
    }, [])

    const onValuesChange = async (value, _values) => {
        try {
            await accountCtx.updateAccountPreferences(value)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Col span={12}>
            <Form
                onValuesChange={onValuesChange}
                form={form}
                initialValues={accountCtx.preference}
                layout="vertical"
            >
                <Title level={3}>Preferences</Title>

                <Form.Item
                    name={['markup', 'id']}
                    label="Preferred Default Markups."
                    extra="Typical Markups for Builder jobs where two or three payment terms are offered."
                >
                    <Select>
                        {markups.map((option) => (
                            <Option key={shortId()} value={option.id}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={['term', 'id']}
                    label="Preferred Default Terms."
                    extra="2% discount may be taken if this invoice is paid within 10days of delivery, net 30 days."
                >
                    <Select>
                        {terms.map((option, key) => (
                            <Option key={key} value={option.id}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={['material', 'id']}
                    label="Preferred Default Material."
                    extra="Cortina Door, Cherry DLV, Nat-Carmel-DLV Finish."
                >
                    <Select>
                        {materials.map((option, key) => (
                            <Option key={key} value={option.id}>
                                {option?.material_name?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name={['hardware', 'id']}
                    label="Preferred Default Hardware."
                    extra="$3.25 Budget Knob, Grass DynamicNT Guide for Dovetailed Drawer."
                >
                    <Select>
                        {hardwares.map((option, key) => (
                            <Option key={key} value={option.id}>
                                {option?.hardware_name?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="delivery_text_for_report"
                    label="Delivery Default for Reports."
                >
                    <TextArea rows={3} style={{ width: '70%' }} />
                </Form.Item>

                <Form.Item
                    name="suspend_automatic_recalculation"
                    valuePropName="checked"
                >
                    <Checkbox>
                        <Text type="danger">
                            Suspend Automatic Re-calculation
                        </Text>
                    </Checkbox>
                </Form.Item>
            </Form>
        </Col>
    )
}

export default PreferencesForm
