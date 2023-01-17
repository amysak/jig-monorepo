import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Row, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { deleteHardware, duplicateHardware } from '../../../../api/hardwares'
import Toolbar from '../../../cabinetsetup/Toolbar'
import NewHardwareWithPopup from '../NewHardware'
interface PageHeaderProps {
    allowAlter?: boolean
    label?: any
    parent?: { label: string; path: string }
}

const toolbarInitial = {
    title: 'Default Setup',
    path: '/default-setup',
}

export function PageHeader({ parent, label, allowAlter }: PageHeaderProps) {
    const [loading, setLoading] = useState(false)
    const params = useParams<{ id?: string }>()
    const navigate = useNavigate()

    const onDelete = async () => {
        try {
            setLoading(true)

            await deleteHardware(params.id)

            navigate('/default-setup/hardwares')
        } catch (error) {
            console.log(error)
            setLoading(false)
            message.error('Unable to delete! Please, try again.')
        }
    }

    const onDuplicate = async () => {
        try {
            setLoading(true)

            const hardware = await duplicateHardware({ id: params.id })

            navigate(`/default-setup/hardwares/${hardware.id}`)
        } catch (error) {
            console.log(error)
            setLoading(false)
            message.error('Unable to duplicate! Please, try again.')
        }
    }

    return (
        <Row justify="space-between">
            <Toolbar initial={toolbarInitial} label={label} parent={parent} />

            <div>
                {allowAlter && (
                    <>
                        <Tooltip placement="bottom" title="Delete">
                            <Popconfirm
                                title="Are you sure"
                                okText="Delete"
                                placement="bottom"
                                onConfirm={onDelete}
                            >
                                <Button
                                    loading={loading}
                                    className="jig-button"
                                    size="small"
                                    icon={<DeleteOutlined />}
                                />
                            </Popconfirm>
                        </Tooltip>
                        &nbsp; &nbsp;
                        <Tooltip placement="bottom" title="Duplicate">
                            <Popconfirm
                                title="Are you sure?"
                                okText="Duplicate"
                                placement="bottom"
                                onConfirm={onDuplicate}
                            >
                                <Button
                                    loading={loading}
                                    className="jig-button"
                                    size="small"
                                    icon={<CopyOutlined />}
                                />
                            </Popconfirm>
                        </Tooltip>
                        &nbsp; &nbsp;
                    </>
                )}

                <NewHardwareWithPopup />
            </div>
        </Row>
    )
}

PageHeader.defaultProps = {
    label: 'Hardwares',
    allowAlter: false,
}
