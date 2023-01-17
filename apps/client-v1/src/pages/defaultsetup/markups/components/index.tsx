import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Row, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { deleteMarkup, duplicateMarkup } from '../../../../api/markups'
import Toolbar from '../../../cabinetsetup/Toolbar'
import NewMarkupWithPopup from '../NewMarkup'
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
    const params = useParams<{ id?: string }>()
    const navigate = useNavigate()

    const onDelete = async () => {
        try {
            setLoading(true)

            await deleteMarkup(params.id)

            navigate('/default-setup/markups')
        } catch (error) {
            console.log(error)
            setLoading(false)
            message.error('Unable to delete! Please, try again.')
        }
    }

    const onDuplicate = async () => {
        try {
            setLoading(true)

            const markup = await duplicateMarkup({ id: params.id })

            navigate(`/default-setup/markups/${markup.id}`)
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

                <NewMarkupWithPopup />
            </div>
        </Row>
    )
}

PageHeader.defaultProps = {
    label: 'Markups',
    allowAlter: false,
}
