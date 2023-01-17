import { Card as AntCard, CardProps as AntCardProps } from 'antd'
import React, { FC } from 'react'

type CardProps = AntCardProps

export const Card: FC<CardProps> = (props) => {
    return <AntCard {...props} />
}
