import { SyncOutlined, UploadOutlined } from '@ant-design/icons'
import { Row } from 'antd'
import React from 'react'

interface UploadButtonProps {
    onChange: (event: any) => Promise<void>
    loading: boolean
    forId: string
}

export default function UploadButton({
    onChange,
    loading,
    forId,
}: UploadButtonProps) {
    const props = {
        onChange,
        multiple: false,
        type: 'file',
        name: forId,
        id: forId,
        style: { display: 'none' },
        accept: 'image/png, image/jpeg',
    }

    return (
        <Row>
            <input {...props} />
            <label
                htmlFor={forId}
                className="ant-btn ant-btn-text ant-btn-sm"
                style={{ display: 'flex', alignItems: 'center' }}
            >
                {loading ? (
                    <SyncOutlined spin />
                ) : (
                    <>
                        <UploadOutlined />
                        <span>Click to upload</span>
                    </>
                )}
            </label>
        </Row>
    )
}
