import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Divider, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useContext, useState } from 'react'
import { cancelSubscription } from '../../../api/account'

import { AccountContext } from '../../../store/account'
import './style.scss'
import { Currency, findAccountPlan, getExpiry } from './utils'

const { Title } = Typography

export function ActiveCard() {
    const [loading, setLoading] = useState(false)
    const accountCtx = useContext(AccountContext)
    // @ts-ignore
    const subscriptionPlan = findAccountPlan(accountCtx.account?.subscription)
    // @ts-ignore
    const { subscription } = accountCtx.account ?? {}

    const onCancelSubscription = async () => {
        setLoading(true)

        await cancelSubscription(subscription.id)

        setLoading(false)
    }

    const expiry = getExpiry(
        subscription?.current_period_start,
        subscription?.current_period_end
    )
    const nextBillingDate = dayjs
        .unix(subscription?.current_period_end)
        .format('MMMM D, YYYY')

    return (
        <div className="activeplan">
            <Title level={4}>Billing Cycle</Title>
            <Currency value={subscriptionPlan?.cost} />* billed{' '}
            {/*// @ts-ignore*/}
            {subscriptionPlan?.name?.toLowerCase()}.
            <p>
                {subscription?.status === 'trialing' ? (
                    <span className="expiry">Trial will end </span>
                ) : (
                    'Currently subscription will end '
                )}

                {expiry}
            </p>
            <p>Next billing date {nextBillingDate}.</p>
            <Row justify="space-between" className="activeplan__cta">
                <Button
                    loading={loading}
                    onClick={onCancelSubscription}
                    className="cancel-btn"
                    type="link"
                    icon={<ArrowRightOutlined />}
                >
                    Cancel subscription
                </Button>
            </Row>
        </div>
    )
}

export default function ActivePlan() {
    return (
        <>
            <Title level={3}>Your Plan</Title>

            <Divider className="x5" />

            <ActiveCard />
        </>
    )
}
