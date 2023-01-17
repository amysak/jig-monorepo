import { ResponsivePie } from '@nivo/pie'
import React from 'react'

const data = [
    {
        id: 'rust',
        label: 'rust',
        value: 570,
        color: 'hsl(26, 70%, 50%)',
    },
    {
        id: 'scala',
        label: 'scala',
        value: 384,
        color: 'hsl(199, 70%, 50%)',
    },
    {
        id: 'c',
        label: 'c',
        value: 178,
        color: 'hsl(325, 70%, 50%)',
    },
    {
        id: 'hack',
        label: 'hack',
        value: 428,
        color: 'hsl(38, 70%, 50%)',
    },
    {
        id: 'lisp',
        label: 'lisp',
        value: 348,
        color: 'hsl(289, 70%, 50%)',
    },
]

// eslint-disable-next-line react/display-name
export default () => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
            },
        ]}
        fill={[
            {
                match: {
                    id: 'ruby',
                },
                id: 'dots',
            },
            {
                match: {
                    id: 'c',
                },
                id: 'dots',
            },
            {
                match: {
                    id: 'go',
                },
                id: 'dots',
            },
            {
                match: {
                    id: 'python',
                },
                id: 'dots',
            },
            {
                match: {
                    id: 'scala',
                },
                id: 'lines',
            },
            {
                match: {
                    id: 'lisp',
                },
                id: 'lines',
            },
            {
                match: {
                    id: 'elixir',
                },
                id: 'lines',
            },
            {
                match: {
                    id: 'javascript',
                },
                id: 'lines',
            },
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 60,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                        },
                    },
                ],
            },
        ]}
    />
)
