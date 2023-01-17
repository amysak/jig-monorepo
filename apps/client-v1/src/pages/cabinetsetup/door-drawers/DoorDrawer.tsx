import {
    Avatar,
    Col,
    Form,
    Input,
    message,
    Radio,
    Row,
    Select,
    Statistic,
    Typography,
} from 'antd'
import debounce from 'lodash/debounce'
import React, { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { uploadDoorImage } from '../../../api/doors'
import { getMaterialTypes } from '../../../api/material-types'
import UploadButton from '../../../components/atoms/upload-button'
import UILayout from '../../../components/templates/uilayout'
import {
    DRAWER_CATEGORIES_OPTIONS,
    IN_OUT_SOURCE_OPTIONS,
} from '../../../utilities/constants'
import { capitalize, getQueryString, shortId } from '../../../utilities/utils'

import { getProfilesByCategory } from '../../../api/profiles'
import { getVendors } from '../../../api/vendors'
import { DoorContext } from '../../../store/door'
import { buildSelectOptions } from '../../../utilities'
import DoorFields from './categories/Doors'
import DrawerBoxFields from './categories/DrawerBox'
import { PageHeader } from './components'
import './style.scss'

interface ProfileSelectorProps {
    door: any
    category: string
    name: string
    label: string
}

interface IllustationProps {
    category: any
    imageURL: any
}

const { Title } = Typography

function isDoorOrDrawerFront(category: string) {
    const categories = ['drawer front', 'door']

    return categories.includes(category?.toLowerCase())
}

function isTrayOrDrawerBox(category: string) {
    const categories = ['drawer box', 'tray']

    return categories.includes(category?.toLowerCase())
}

function SourceTitle() {
    return <Title level={4}>Source</Title>
}

function ProfileSelector({
    category,
    name,
    label,
    door,
}: ProfileSelectorProps) {
    const [loading, setLoading] = useState(false)
    const [profiles, setProfiles] = useState([])
    const imageURL = door?.[name]?.image_url

    const getProfiles = async () => {
        try {
            setLoading(true)

            const profiles = await getProfilesByCategory(category)

            setProfiles(profiles[0])
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfiles()
    }, [])

    return (
        <div className="profile-form">
            <Form.Item name={[name, 'id']} label={label}>
                <Select style={{ width: '100%' }} loading={loading}>
                    {profiles.map((profile) => (
                        <Select.Option key={profile.id} value={profile.id}>
                            {profile.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <div className="profile-image-wrapper">
                <Avatar src={imageURL} shape="square" size={200} />
                <Form.Item name={[name, 'upcharge']}>
                    <Statistic
                        formatter={(value) => <Title level={3}>${value}</Title>}
                    />
                </Form.Item>
            </div>
        </div>
    )
}

function Illustation({ category, imageURL }: IllustationProps) {
    const [loading, setLoading] = useState(false)
    const [url, setURL] = useState('')
    const params = useParams<{ id?: string }>()

    useEffect(() => {
        setURL(imageURL)
    }, [imageURL])

    const onChange = async (event: { target: { files: any[] } }) => {
        const data = new FormData()

        const file = event.target.files[0]

        data.append('file', file)

        data.append('doorId', params.id)

        try {
            setLoading(true)

            const result = await uploadDoorImage(data)

            setURL(result.url)

            message.success(`${file.name} file uploaded successfully.`)
        } catch (error) {
            message.error(`${file.name} file upload failed.`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="profile-form" style={{ paddingTop: '24px' }}>
            <Row justify="space-between">
                <Title level={4}>
                    {capitalize(category) || ''} Illustration{' '}
                </Title>

                <UploadButton
                    onChange={onChange}
                    forId="doordrawer"
                    loading={loading}
                />
            </Row>

            <div className="profile-image-wrapper">
                <img
                    src={
                        url ||
                        'https://via.placeholder.com/150?text=Missing Image'
                    }
                />
            </div>
        </div>
    )
}

export default function DoorDrawer() {
    const [form] = Form.useForm()
    const doorCtx = useContext(DoorContext)
    const [source, setSource] = useState('')
    const params = useParams<{ id?: string }>()
    const [vendors, setVendors] = useState([])
    const [types, setTypes] = useState([])

    const { door } = doorCtx

    const getTypes = async () => {
        const types = await getMaterialTypes(`?purpose=door`)

        setTypes(types[0])
    }

    const getVendorData = async () => {
        const query = getQueryString()

        const vendors = await getVendors(query)

        setVendors(vendors[0])
    }

    const onChangeSource = ({ target }) => {
        setSource(target?.value)
    }

    useEffect(() => {
        doorCtx.getOneDoor(params.id)
    }, [])

    useEffect(() => {
        form.resetFields()

        getVendorData()

        getTypes()

        setSource(door?.source)
    }, [door])

    const onValuesChange = debounce(async (value, values) => {
        await doorCtx.onChange(params.id, values)
    }, 1000)

    if (!door) return <p>loading...</p>

    return (
        <UILayout
            ToolbarContent={
                <PageHeader
                    allowAlter
                    label={capitalize(door?.category)}
                    parent={{ path: '/door-drawers', label: 'Doors/Drawers' }}
                />
            }
        >
            <Row className="pagewrapper">
                <Col span={6} className="side-page-filter">
                    <Form
                        onValuesChange={onValuesChange}
                        form={form}
                        initialValues={doorCtx.door}
                        layout="vertical"
                        className="pagewrapper__leftside"
                    >
                        <Form.Item label="Name" name="name">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Category" name="category">
                            <Select>
                                {DRAWER_CATEGORIES_OPTIONS.map((drawer) => (
                                    <Select.Option
                                        key={shortId()}
                                        value={drawer.value}
                                    >
                                        {drawer.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Material Type"
                            name={['material_type', 'id']}
                        >
                            <Select>
                                {buildSelectOptions(
                                    types,

                                    door?.material_type
                                ).map((option) => (
                                    <Select.Option
                                        key={shortId()}
                                        value={option.id}
                                    >
                                        {option.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Vendor" name={['vendor', 'id']}>
                            <Select>
                                {vendors.map((option) => (
                                    <Select.Option
                                        key={shortId()}
                                        value={option.id}
                                    >
                                        {option.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Internal Note (non-printable)"
                            name="internal_note"
                        >
                            <Input.TextArea rows={6} />
                        </Form.Item>

                        <Illustation
                            category={door?.category}
                            imageURL={door?.image_url}
                        />
                    </Form>
                </Col>

                <Col span={18}>
                    <Form
                        onValuesChange={onValuesChange}
                        form={form}
                        initialValues={door}
                        layout="vertical"
                        className=""
                    >
                        <div className="pagewrapper__maincontent">
                            <Row className="" align="middle">
                                <Col xs={24} sm={16} md={19} lg={19} xl={21}>
                                    <Title level={4}>
                                        Cost per {capitalize(door?.category)}
                                    </Title>

                                    <Row>
                                        {isTrayOrDrawerBox(door?.category) ? (
                                            <DrawerBoxFields.CostPerDrawerBox
                                                door={door}
                                                source={source}
                                            />
                                        ) : null}

                                        {isDoorOrDrawerFront(door?.category) ? (
                                            <DoorFields.CostPerDoors
                                                // @ts-expect-error TS(2322): Type '{ door: any; source: string; }' is not assig... Remove this comment to see the full error message
                                                door={door}
                                                source={source}
                                            />
                                        ) : null}
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="source-options-wrapper">
                                <Col span={12}>
                                    <Form.Item
                                        label={<SourceTitle />}
                                        name="source"
                                    >
                                        <Radio.Group onChange={onChangeSource}>
                                            {IN_OUT_SOURCE_OPTIONS.map(
                                                (option) => (
                                                    <Radio.Button
                                                        value={option.value}
                                                        key={shortId()}
                                                    >
                                                        {option.label}
                                                    </Radio.Button>
                                                )
                                            )}
                                        </Radio.Group>
                                    </Form.Item>

                                    <br />
                                    <br />

                                    {isTrayOrDrawerBox(door?.category) && (
                                        <DrawerBoxFields.JoinType />
                                    )}
                                </Col>

                                <Col span={12} className="right">
                                    {isTrayOrDrawerBox(door?.category) ? (
                                        <DrawerBoxFields.DrawerBoxInOut
                                            source={source}
                                        />
                                    ) : null}

                                    {isDoorOrDrawerFront(door?.category) ? (
                                        <DoorFields.DoorInOut
                                            // @ts-expect-error TS(2322): Type '{ source: string; door: any; }' is not assig... Remove this comment to see the full error message
                                            source={source}
                                            door={door}
                                        />
                                    ) : null}
                                </Col>
                            </Row>

                            <br />

                            <Row>
                                {isDoorOrDrawerFront(door?.category) ? (
                                    <>
                                        <Col span={6}>
                                            <ProfileSelector
                                                door={door}
                                                category="panels"
                                                name="panel_profile"
                                                label="Panel Profile"
                                            />
                                        </Col>
                                        <Col span={6}>
                                            <ProfileSelector
                                                door={door}
                                                category="edges"
                                                name="edge_profile"
                                                label="Edge Profile"
                                            />
                                        </Col>
                                        <Col span={6}>
                                            <ProfileSelector
                                                door={door}
                                                category="frames"
                                                name="frame_profile"
                                                label="Frame Profile"
                                            />
                                        </Col>
                                    </>
                                ) : null}
                            </Row>
                        </div>
                    </Form>

                    <Row className="pagewrapper__maincontent auto-height">
                        {isTrayOrDrawerBox(door?.category) && (
                            <DrawerBoxFields.DrawerBoxMaterialsMatrix
                                door={door}
                                source={source}
                            />
                        )}

                        {isDoorOrDrawerFront(door?.category) && (
                            <DoorFields.DoorMaterials
                                door={door}
                                source={source}
                            />
                        )}
                    </Row>
                </Col>
            </Row>
        </UILayout>
    )
}
