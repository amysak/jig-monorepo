import { Typography } from 'antd'
import React from 'react'
import { capitalize } from '../../../utilities/utils'
import { Currency } from './utils'
interface PlanCardProps {
    plan:
        | any
        | {
              name: string
              plan: string
              cost: number
              description: string
              id: string
          }
    onSelect: any
    subscription: undefined | Record<string, unknown>
}

const { Title, Text } = Typography

export default function PlanCard(props: PlanCardProps) {
    const activeClass =
        props.plan?.unit_amount === props.subscription?.unit_amount
            ? 'selected'
            : ''

    return (
        <div
            className={`plancard ${activeClass}`}
            onClick={() => props.onSelect(props.plan)}
        >
            <Title level={4} className="plancard-name">
                {capitalize(props.plan.recurring?.interval)}
            </Title>
            <Currency value={props.plan.unit_amount / 100} />

            <Text strong className="plancard-description">
                {props.plan.nickname}
            </Text>
        </div>
    )
}
