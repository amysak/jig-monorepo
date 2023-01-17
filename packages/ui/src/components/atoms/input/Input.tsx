import {
    Input as AntInput,
    InputNumber as AntInputNumber,
    InputNumberProps as AntInputNumberProps,
    InputProps as AntInputProps,
} from 'antd'
import { GroupProps as AntGroupProps } from 'antd/lib/input/Group'
import { PasswordProps as AntPasswordProps } from 'antd/lib/input/Password'
import { TextAreaProps as AntTextAreaProps } from 'antd/lib/input/TextArea'
import React, { FC } from 'react'

const {
    Password: AntPassword,
    Group: AntGroup,
    TextArea: AntTextArea,
} = AntInput

export type InputProps = AntInputProps

export const Input: FC<InputProps> = (props) => {
    return <AntInput {...props} />
}

export type PasswordProps = AntPasswordProps

export const InputPassword: FC<PasswordProps> = (props) => {
    return <AntPassword {...props} />
}

export type GroupProps = AntGroupProps

export const InputGroup: FC<GroupProps> = (props) => {
    return <AntGroup {...props} />
}

export type InputTextAreaProps = AntTextAreaProps

export const InputTextArea: FC<InputTextAreaProps> = (props) => {
    return <AntTextArea {...props} />
}

export type InputNumberProps = AntInputNumberProps

export const InputNumber: FC<InputNumberProps> = (props) => {
    return <AntInputNumber {...props} />
}
