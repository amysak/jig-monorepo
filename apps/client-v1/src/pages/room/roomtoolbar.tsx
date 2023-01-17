import { LeftOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Form, Input, Typography } from 'antd'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import debounce from 'lodash/debounce'
import get from 'lodash/get'
import { useSelector } from 'react-redux'
import { updateJob } from '../../api/jobs'
import JigModal from '../../components/organisms/modal'

interface JobNoteTitleProps {
    label: string
    title: string
}

const { Title, Text } = Typography

function JobNoteTitle({ label, title }: JobNoteTitleProps) {
    return (
        <>
            <Text strong>{title}</Text>
            <Text>{label}</Text>
        </>
    )
}

function JobNotesPopover() {
    // @ts-expect-error TS(2339): Property 'room' does not exist on type 'DefaultRoo... Remove this comment to see the full error message
    const room = useSelector((state) => state.room)
    const [form] = Form.useForm()

    const onValuesChange = debounce(async (values: { subdivision: any }) => {
        try {
            await updateJob(room.job.id, values)

            toast.success('Sucessfully updated.')
        } catch (error) {
            console.log(error)

            toast.error('Failed to update.')
        }
    }, 1000)

    useEffect(() => {
        form.resetFields()
    }, [room])

    return (
        <JigModal title="Job Notes" label="Notes">
            <Form
                onValuesChange={onValuesChange}
                form={form}
                initialValues={room?.job ?? {}}
                className=""
                layout="vertical"
            >
                <Text strong>
                    Enter any specific notes in the appropriate box below
                </Text>

                <Form.Item
                    name="external_notes"
                    label={
                        <JobNoteTitle
                            label="these notes can be printed with Estimates and Proposals"
                            title="External Notes: "
                        />
                    }
                >
                    <Input.TextArea rows={15} />
                </Form.Item>

                <Form.Item
                    name="internal_notes"
                    label={
                        <JobNoteTitle
                            label="these notes do not print on any reports"
                            title="Internal Notes: "
                        />
                    }
                >
                    <Input.TextArea rows={14} />
                </Form.Item>
            </Form>
        </JigModal>
    )
}

function RoomPageToolbar() {
    // @ts-expect-error TS(2339): Property 'room' does not exist on type 'DefaultRoo... Remove this comment to see the full error message
    const room = useSelector((state) => state.room)

    return (
        <>
            <Col span={2}>
                <Title level={4} style={{ cursor: 'pointer' }}>
                    <Link to="/rooms">
                        <LeftOutlined />
                        &nbsp; Back
                    </Link>
                </Title>
            </Col>
            <Col span={4}>
                <Title level={4}>{get(room, 'job.name', '')}</Title>
            </Col>
            <Col
                span={18}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
                <Title level={4}></Title>
            </Col>

            <Divider style={{ margin: '5px' }} />

            <Col span={2} style={{ display: 'flex', alignItems: 'center' }}>
                <Text strong>ROOMS</Text>
            </Col>
            <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <Text strong>{room.name}</Text>
            </Col>
            <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                <Text strong>Suspend Automatic Re-calculation &nbsp;</Text>
                <Checkbox />
            </Col>
            <Col
                flex="auto"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
                <Button className="jig-button" style={{ marginRight: '10px' }}>
                    Current Room Total $1,959.41 (UPDATE TOTALS)
                </Button>

                <JobNotesPopover />
            </Col>
        </>
    )
}

export default RoomPageToolbar
