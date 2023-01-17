import { ArrowRightOutlined } from '@ant-design/icons'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button, Col, Form, Row, Typography } from 'antd'
import get from 'lodash/get'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { getCompanyRequest } from '../../../actions/account'
import { createSubscription, retryPayment } from '../../../api/account'
import { capitalize, shortId } from '../../../utilities/utils'
import {
    CARD_ELEMENT_OPTIONS,
    Currency,
    findAccountPlan,
    getExpiry,
    plans,
} from './utils'

import { store } from '../../../store'
import PlanCard from './PlanCard'
import './style.scss'

const { Title, Paragraph } = Typography

export default function SubscriptionForm() {
    //@ts-ignore
    const account = useSelector((state) => state.account)
    const [loading, setLoading] = useState(false)
    const [currentSubscription, setCurrentSubscription] = useState(
        findAccountPlan(account.subscription)
    )
    const elements = useElements()
    const stripe = useStripe()

    const onFinish = async () => {
        if (!(stripe || elements)) return

        const cardElement = elements!.getElement(CardElement)

        const latestInvoicePaymentIntentStatus = localStorage.getItem(
            'latestInvoicePaymentIntentStatus'
        )

        setLoading(true)

        const { error, paymentMethod } = await stripe!.createPaymentMethod({
            type: 'card',

            card: cardElement,
        })

        if (error) {
            setLoading(false)
            return
        }

        if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
            const invoiceId = localStorage.getItem('latestInvoiceId')

            await retryPayment({
                customerId: account.stripe_customer_id,
                paymentMethodId: paymentMethod.id,
                invoiceId: invoiceId!,
                // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
                priceId: currentSubscription!.id,
            })

            return setLoading(false)
        }

        await createSubscription({
            priceId: currentSubscription!.id,
            paymentMethodId: paymentMethod.id,
            customerId: account.stripe_customer_id,
        })

        store.dispatch(getCompanyRequest())

        return setLoading(false)
    }

    return (
        <Form onFinish={onFinish} className="subscription">
            <Title level={4}>
                {get(account, 'subscription.status', '') === 'trialing'
                    ? 'Trial'
                    : 'Current subscription'}{' '}
                will end &nbsp;
                {getExpiry(
                    get(account, 'subscription.current_period_start'),
                    get(account, 'subscription.current_period_end')
                )}
            </Title>

            <Title level={4}>Choose plan</Title>

            <Row>
                {plans.map((plan) => (
                    <Col span={12} key={shortId()}>
                        <PlanCard
                            plan={plan}
                            onSelect={setCurrentSubscription}
                            subscription={currentSubscription}
                        />
                    </Col>
                ))}
            </Row>

            <Row className="card-details-row">
                <Col span={24}>
                    <h4 className="card-details-title">Enter card details.</h4>
                    <h4 className="card-details-title">
                        Your subscription will start now.
                    </h4>
                </Col>

                <Col span={24}>
                    <Paragraph>
                        <ArrowRightOutlined /> Total due{' '}
                        <Currency value={currentSubscription?.cost} />
                    </Paragraph>
                    <Paragraph>
                        <ArrowRightOutlined /> Subscribing to{' '}
                        {capitalize(currentSubscription?.name)}
                    </Paragraph>
                </Col>

                <Col span={24}>
                    <Form.Item className="stripe-form-item">
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={loading}
                            className="jig-button"
                            htmlType="submit"
                        >
                            Subscribe
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
