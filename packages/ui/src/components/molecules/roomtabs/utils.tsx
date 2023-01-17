import React from 'react'
import { Typography } from 'antd'

const { Text } = Typography
const tableSelectStyle = {
    width: '100%',
}

const interioFinishes = ['unfinished', 'finished']

function RenderCell(value: number) {
    return <Text style={{ paddingLeft: 15, lineHeight: '30px' }}>{value}</Text>
}

export { interioFinishes, tableSelectStyle, RenderCell }
