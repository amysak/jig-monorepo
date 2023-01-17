import { Alert as AntAlert, AlertProps as AntAlertProps } from 'antd'
import React, { FC } from 'react'

type AlertProps = AntAlertProps

export const Alert: FC<AlertProps> = (props) => {
    return <AntAlert {...props} />
}
