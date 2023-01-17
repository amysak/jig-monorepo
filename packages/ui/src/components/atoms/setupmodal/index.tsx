import React from 'react'
import { useNavigate } from 'react-router-dom'

import { CloseOutlined } from '@ant-design/icons'
import { Row } from 'antd'

import Logo from '../logo'
import './setupmodal.scss'
interface SetupModalProps {
    children: React.ReactNode
    header: React.ReactNode
}

export default function SetupModal({ children, header }: SetupModalProps) {
    const navigate = useNavigate()

    return (
        <Row className="setupmodal">
            <div className="setupmodal__wrapper">
                <div className="setupmodal__header">
                    <div className="setupmodal__header-icons">
                        <Logo />

                        <CloseOutlined
                            onClick={() => navigate(-1)}
                            className="setupmodal__header-icons--close"
                        />
                    </div>

                    {header}
                </div>

                <div className="setupmodal__content">{children}</div>
            </div>
        </Row>
    )
}
