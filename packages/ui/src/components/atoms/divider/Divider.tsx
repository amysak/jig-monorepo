import { Divider as AntDivider, DividerProps as AntDividerProps } from 'antd'
import React, { FC } from 'react'

type DividerProps = AntDividerProps

export const Divider: FC<DividerProps> = (props) => {
    return <AntDivider {...props} />
}
