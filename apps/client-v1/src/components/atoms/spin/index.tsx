import { Spin as AntSpin, SpinProps as AntSpinProps } from 'antd'
import React, { FC } from 'react'

type SpinProps = AntSpinProps

export const Spin: FC<SpinProps> = (props) => {
    return <AntSpin {...props} />
}
