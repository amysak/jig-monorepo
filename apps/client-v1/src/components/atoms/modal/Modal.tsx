import { Modal as AntModal, ModalProps as AntModalProps } from 'antd'
import React, { FC } from 'react'

type ModalProps = AntModalProps

const { success: antSuccess } = AntModal

export const Modal: FC<ModalProps> = (props) => {
    return <AntModal {...props} />
}

export const success = antSuccess
