import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd'
import React, { FC } from 'react'

type ButtonProps = AntButtonProps

export const Button: FC<ButtonProps> = (props) => {
    return <AntButton {...props} />
}
