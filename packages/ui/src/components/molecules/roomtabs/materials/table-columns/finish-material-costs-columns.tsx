import React from 'react'
import { Typography } from 'antd'
interface BigTitleProps {
    title: string
    text: string
}

const { Title, Text } = Typography

function BigTitle(props: BigTitleProps) {
    return (
        <>
            <Title level={4} style={{ color: '#ffffff' }}>
                {props.title}
            </Title>
            <Text style={{ color: '#ffffff' }}>{props.text}</Text>
        </>
    )
}

const finishMaterialCostsColumns = [
    {
        title: '',
        key: 'type',
        dataIndex: 'type',
    },
    {
        title: 'Finishing Source',
        key: 'finishing_source',
        dataIndex: 'finishing_source',
    },
    {
        title: <BigTitle title="Per Sq. Ft. Cost" text="In-House" />,
        children: [
            {
                title: 'Finishing Material',
                key: 'finishing_material',
                dataIndex: 'finishing_material',
            },
            {
                title: 'Finishing Labor',
                key: 'finishing_labor',
                dataIndex: 'finishing_labor',
            },
        ],
    },
    {
        title: 'Outsourced',
        key: 'outsourced',
        dataIndex: 'outsourced',
    },
    {
        title: 'Chosen for this Job',
        children: [
            {
                title: 'Finishing Material',
                key: 'finishing_material',
                dataIndex: 'finishing_material',
            },
            {
                title: 'Finishing Labor',
                key: 'finishing_labor',
                dataIndex: 'finishing_labor',
            },
        ],
    },
    {
        title: <BigTitle title="Per Item Cost" text="(per finished side)" />,
        children: [
            {
                title: 'Complex',
                key: 'complex',
                dataIndex: 'complex',
            },
            {
                title: 'Simple',
                key: 'simple',
                dataIndex: 'simple',
            },
        ],
    },
]

export default finishMaterialCostsColumns
