import {
    Checkbox as AntCheckbox,
    CheckboxProps as AntCheckboxProps,
} from 'antd'
import React, { FC } from 'react'

type CheckboxProps = AntCheckboxProps

export const Checkbox: FC<CheckboxProps> = (props) => {
    return <AntCheckbox {...props} />
}
