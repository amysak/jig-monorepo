import React from 'react'
import { Typography } from 'antd'
interface TableTitleProps {
    title: string
}

const { Title } = Typography

export default function TableTitle({ title }: TableTitleProps) {
    return <Title level={4}>{title}</Title>
}
