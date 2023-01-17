import { Radio as AntRadio, RadioProps as AntRadioProps } from 'antd'
import { RadioGroupProps as AntRadioGroupProps } from 'antd/lib/radio'
import React, { FC } from 'react'

const { Group: AntGroup } = AntRadio

export type RadioProps = AntRadioProps

export const Radio: FC<RadioProps> = (props) => {
    return <AntRadio {...props} />
}

export type RadioGroupProps = AntRadioGroupProps

export const RadioGroup: FC<RadioGroupProps> = (props) => {
    return <AntGroup {...props} />
}
