import { Empty as AntEmpty, EmptyProps as AntEmptyProps } from 'antd'
import React, { FC } from 'react'

export type EmptyProps = AntEmptyProps

export const PRESENTED_IMAGE_SIMPLE = AntEmpty.PRESENTED_IMAGE_SIMPLE

export const Empty: FC<EmptyProps> = (props) => {
    return <AntEmpty {...props} />
}
