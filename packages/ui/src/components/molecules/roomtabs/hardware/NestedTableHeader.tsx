import React from 'react'

import { Typography } from 'antd'
interface NestedTableHeaderProps {
    title: string
    subtitle: string
}

const { Title, Text } = Typography

export default function NestedTableHeader({
    title,
    subtitle,
}: NestedTableHeaderProps) {
    return (
        <>
            <Title level={4}>{title}</Title>
            <Text>{subtitle}</Text>
        </>
    )
}
