import { CheckCircleOutlined } from '@ant-design/icons'
import React from 'react'

import { Button, Col, Row, success, Text } from 'components/atoms'

import './Modal.styles.scss'

interface IShowSuccessModal {
    onClick: () => void
}

export const showSuccessModal = ({ onClick }: IShowSuccessModal) => {
    const handleButtonClick = () => {
        modal.destroy()
        onClick()
    }

    const modal = success({
        title: (
            <Row align="middle" justify="center">
                <CheckCircleOutlined className="success-icon" />
            </Row>
        ),
        icon: null,
        content: (
            <Row justify="end" className="success-body">
                <Col xs={24}>
                    <Row justify="center">
                        <Text>Congratulations!</Text>
                    </Row>
                </Col>
                <Col xs={24}>
                    <Row justify="center">
                        <Text> You successfully reset your password.</Text>
                    </Row>
                </Col>
                <Col xs={24} lg={12} xl={8} className="success-body-button-col">
                    <Row justify="end">
                        <Button
                            onClick={handleButtonClick}
                            block
                            className="jig-button"
                            size="small"
                        >
                            <Text>SIGN IN</Text>
                        </Button>
                    </Row>
                </Col>
            </Row>
        ),
        cancelButtonProps: { style: { display: 'none' } },
        okButtonProps: { style: { display: 'none' } },
        className: 'password-reset-modal',
    })
}
