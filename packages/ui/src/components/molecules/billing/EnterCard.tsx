import { ArrowRightOutlined } from '@ant-design/icons'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Alert, Button, Col, Collapse, Form, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'

import {
    createTrialSubscription,
    getPlans,
    retryPayment,
} from '../../../api/account'
import { AccountContext } from '../../../store/account'
import { AuthContext } from '../../../store/auth'
import { capitalize, isEmpty, shortId } from '../../../utilities/utils'
import PlanCard from './PlanCard'
import './style.scss'
import { CARD_ELEMENT_OPTIONS, Currency } from './utils'

const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse

const SubscriptionNote = () => {
    return (
        <Collapse defaultActiveKey={['1']}>
            <Panel header="Note" key="1">
                <Paragraph>
                    <ArrowRightOutlined /> You can always cancel your
                    subscrition.
                </Paragraph>
            </Panel>
        </Collapse>
    )
}

export default function EnterCard() {
    const [loading, setLoading] = useState(false)
    const accountCtx = useContext(AccountContext)
    const authCtx = useContext(AuthContext)
    const [plans, setPlans] = useState([])
    const elements = useElements()
    const stripe = useStripe()
    const [currentSubscription, setCurrentSubscription] = useState()

    const getProducts = async () => {
        try {
            const plans = await getPlans()

            setPlans(plans)
        } catch (error) {
            console.error(error)
        }
    }

    const onFinish = async () => {
        if (!(stripe || elements)) return

        setLoading(true)

        try {
            const cardElement = elements?.getElement(CardElement)

            const latestInvoicePaymentIntentStatus = localStorage.getItem(
                'latestInvoicePaymentIntentStatus'
            )

            setLoading(true)

            const { error, paymentMethod } = await stripe?.createPaymentMethod({
                type: 'card',

                card: cardElement,
            })

            if (error) {
                setLoading(false)
                return
            }

            if (
                latestInvoicePaymentIntentStatus === 'requires_payment_method'
            ) {
                const invoiceId = localStorage.getItem('latestInvoiceId')

                await retryPayment({
                    // @ts-ignore
                    customerId: accountCtx.account?.stripe_customer_id,
                    paymentMethodId: paymentMethod.id,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    invoiceId: invoiceId!,
                    // @ts-ignore

                    priceId: currentSubscription?.id,
                })

                return setLoading(false)
            }

            await createTrialSubscription({
                // @ts-ignore
                priceId: currentSubscription?.id,
                paymentMethodId: paymentMethod.id,
                // @ts-ignore
                customerId: accountCtx.account?.stripe_customer_id,
            })

            window.location.reload()
        } catch {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Form onFinish={onFinish} className="subscription" layout="vertical">
            <Title style={{ textAlign: 'center' }} level={3}>
                {/* @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'. */}
                {accountCtx.account?.name}
            </Title>

            <Title style={{ textAlign: 'center' }} level={4}>
                Choose a billing cycle
            </Title>

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
                    <Text strong type="secondary">
                        Enter card details and continue.
                    </Text>
                    <br />
                    <br />
                </Col>

                <Col span={24}>
                    <Paragraph>
                        <ArrowRightOutlined /> Total due{' '}
                        <Currency
                            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                            value={currentSubscription?.unit_amount / 100}
                        />
                    </Paragraph>
                    <Paragraph>
                        <ArrowRightOutlined /> Subscribing to{' '}
                        {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
                        {capitalize(currentSubscription?.nickname)}
                    </Paragraph>
                </Col>

                <Col span={24}>
                    <Alert
                        message={`You will not be charged now. Billing will start ${dayjs()
                            .add(30, 'days')
                            .format('MMM Do YYYY')}`}
                        type="info"
                        showIcon
                    />

                    <SubscriptionNote />
                </Col>

                <Col span={24}>
                    <Form.Item className="stripe-form-item">
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </Form.Item>

                    <br />

                    <Row align="middle" justify="space-between">
                        <Form.Item>
                            <Button
                                disabled={isEmpty(currentSubscription)}
                                loading={loading}
                                className="jig-button"
                                htmlType="submit"
                            >
                                Continue
                            </Button>
                        </Form.Item>

                        <Button type="link" onClick={() => authCtx.onSignOut()}>
                            Sign out
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Form>
    )
}
