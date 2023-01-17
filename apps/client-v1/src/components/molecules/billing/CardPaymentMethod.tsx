import { ArrowRightOutlined } from '@ant-design/icons'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { getSubscriptionCard } from '../../../api/account'
import { AccountContext } from '../../../store/account'
import { capitalize, months } from '../../../utilities/utils'
import { CARD_ELEMENT_OPTIONS } from './utils'

import VisaCardSVG from '../../../assets/images/payments/visa.svg'
import MasterCardSVG from '../../../assets/images/payments/mastercard.svg'

const { Title } = Typography

export default function CardPaymentMethod() {
    const [form] = Form.useForm()
    const [paymentMethod, setPaymentMethod] = useState<{
        card?: { last4: string; brand: string; exp_year: string }
    }>({})
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const elements = useElements()
    const stripe = useStripe()
    const accountCtx = useContext(AccountContext)

    const getPaymentMethod = async () => {
        try {
            const paymentMethod = await getSubscriptionCard()

            setPaymentMethod(paymentMethod)
        } catch (error) {}
    }

    const onUpdateCard = async () => {
        if (!(stripe || elements)) return

        try {
            setLoading(true)

            const cardElement = elements?.getElement(CardElement)

            const { paymentMethod } = await stripe?.createPaymentMethod({
                type: 'card',

                card: cardElement,
            })

            // eslint-disable-next-line no-undef
            // @ts-ignore
            await updatePaymentMethod({
                // @ts-ignore
                priceId: accountCtx.account.subscription.id,

                paymentMethodId: paymentMethod?.id,
                // @ts-ignore
                customerId: accountCtx.account?.stripe_customer_id,
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getPaymentMethod()
    }, [])

    const CardImage =
        paymentMethod.card?.brand === 'visa' ? VisaCardSVG : MasterCardSVG

    return (
        <div className="paymentmethod">
            <Title level={3}>Payment Method</Title>
            {updating ? (
                <Form form={form} onFinish={onUpdateCard} layout="vertical">
                    <Col span={24}>
                        <Form.Item name="name" label="Name on card">
                            <Input placeholder="Example: John Doe" />
                        </Form.Item>

                        <Form.Item className="paymentmethod__cardinput">
                            <CardElement options={CARD_ELEMENT_OPTIONS} />
                        </Form.Item>

                        <Row align="middle" justify="space-between">
                            <Button
                                size="small"
                                loading={loading}
                                className="jig-button"
                                htmlType="submit"
                            >
                                Continue
                            </Button>

                            <Button
                                size="small"
                                type="text"
                                loading={loading}
                                onClick={() => setUpdating(false)}
                            >
                                Cancel
                            </Button>
                        </Row>
                    </Col>
                </Form>
            ) : null}
            {/*// @ts-ignore*/}
            {!updating && paymentMethod.card ? (
                <div className="paymentmethod__details">
                    <CardImage className="paymentmethod__details-cardimage" />
                    Pay with {capitalize(paymentMethod.card.brand)} ending with{' '}
                    {paymentMethod.card.last4}, expires {/*// @ts-ignore*/}
                    {months[paymentMethod.card.exp_month - 1]}{' '}
                    {paymentMethod.card.exp_year}
                </div>
            ) : null}
            {!updating ? (
                <Row justify="space-between" className="paymentmethod__cta">
                    <Button
                        loading={loading}
                        onClick={() => setUpdating(true)}
                        className="cancel-btn"
                        type="link"
                        icon={<ArrowRightOutlined />}
                    >
                        Change Card
                    </Button>
                </Row>
            ) : null}
        </div>
    )
}
