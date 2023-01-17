import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Row, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { deleteTerm, duplicateTerm } from '../../../../api/terms'
import Toolbar from '../../../cabinetsetup/Toolbar'
import NewTermWithPopup from '../NewTerm'
interface PageHeaderProps {
    label: string | any
    allowAlter?: boolean
    parent?: { label: string; path: string }
}

const toolbarInitial = {
    title: 'Default Setup',
    path: '/default-setup',
}

export function PageHeader({ parent, label, allowAlter }: PageHeaderProps) {
    const [loading, setLoading] = useState(false)
    const params = useParams<{ termId?: string }>()
    const navigate = useNavigate()

    const onDelete = async () => {
        try {
            setLoading(true)

            await deleteTerm(params.termId)

            navigate('/default-setup/terms')
        } catch (error) {
            console.log(error)
            setLoading(false)
            message.error('Unable to delete! Please, try again.')
        }
    }

    const onDuplicate = async () => {
        try {
            setLoading(true)

            const term = await duplicateTerm({ id: params.termId })

            navigate(`/default-setup/terms/${term.id}`)
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

                <NewTermWithPopup />
            </div>
        </Row>
    )
}

PageHeader.defaultProps = {
    label: 'Terms',
    allowAlter: false,
}
