import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd'
import { OptionProps as AntOptionProps } from 'antd/lib/select'
import React from 'react'

const { Option: AntOption } = AntSelect

export type SelectProps = AntSelectProps

export const Select: React.FC<SelectProps> = (props) => {
    return <AntSelect {...props} />
}

export type OptionProps = AntOptionProps

export const Option: React.FC<OptionProps> = (props) => {
    return <AntOption {...props} />
}
