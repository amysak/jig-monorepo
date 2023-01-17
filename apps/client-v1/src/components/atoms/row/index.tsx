import { Row as AntRow, RowProps as AntRowProps } from 'antd'
import React, { FC } from 'react'

type RowProps = AntRowProps

export const Row: FC<RowProps> = (props) => {
    return <AntRow {...props} />
}
