import { Col, Row, Typography } from 'antd'
import get from 'lodash/get'
import dayjs from 'dayjs'
import React, { Dispatch, SetStateAction } from 'react'

import { useSelector } from 'react-redux'
import './style.scss'
import { Currency, findAccountPlan } from './utils'

const { Title, Text } = Typography

interface TrialCardProps {
    setSubscribing: Dispatch<SetStateAction<boolean>>
}

export function TrialCard(_props: TrialCardProps) {
    //@ts-ignore
    const subscription = useSelector((state) => state.account.subscription)
    const expiry = dayjs(get(subscription, 'trial_end', 0) * 1000).format(
        'MMM Do YYYY'
    )
    const plan = findAccountPlan(subscription)
    //@ts-ignore
    const account = useSelector((state) => state.account)

    return (
        <Col
            className="activecard selected"
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={6}
        >
            <Row justify="space-between">
                <Col span={12}>
                    <Title level={4} className="plancard-name">
                        Current plan
                    </Title>
                </Col>

                <Title level={4} className="plancard-name">
                    {plan.name}
                </Title>
            </Row>

            <Row justify="space-between">
                <Col span={12}>
                    <Title level={4} className="plancard-name">
                        Billed
                    </Title>
                </Col>

                <Currency value={0} />
            </Row>

            <Row>
                <Text strong>Email: </Text>
                <Text>&nbsp; {account.email}</Text>
            </Row>

            <br />

            <Row>
                <Text strong className="expiry">
                    Trial will end {expiry}
                </Text>
            </Row>
        </Col>
    )
}
