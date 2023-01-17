import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'


function JigModal({ children, title = '', label = '' }) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            <Button
                onClick={() => setIsVisible(!isVisible)}
                size="small"
                className="jig-button"
                icon={<PlusOutlined />}
            >
                {label}
            </Button>

            <Modal
                title={title}
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                okText="Submit"
                footer={null}
            >
                {children}
            </Modal>
        </>
    )
}

export default JigModal
