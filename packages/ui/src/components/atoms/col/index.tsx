import { Col as AntCol, ColProps as AntColProps } from 'antd'
import React, { FC } from 'react'

type RowProps = AntColProps

export const Col: FC<RowProps> = (props) => {
    return <AntCol {...props} />
}
