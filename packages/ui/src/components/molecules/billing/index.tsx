import React, { useContext } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Row, Col } from 'antd'

import './style.scss'
import ActivePlan from './ActivePlan'
import BillingDetails from './BillingDetails'
import CardPaymentMethod from './CardPaymentMethod'
import { AccountContext } from '../../../store/account'

const stripePromise = loadStripe('pk_test_OgxFi35gjqP08W5uTssf2SUE')

function LifeTimeAccess() {
    return <div className="lifetime">Lifetime Access</div>
}

export default function Subscription() {
    const accountCtx = useContext(AccountContext)

    return (
        <Elements stripe={stripePromise}>
            <Row>
                <Col span={12}>
                    {/*// @ts-ignore */}
                    {accountCtx.account.subscription?.status === 'lifetime' ? (
                        <LifeTimeAccess />
                    ) : (
                        <>
                            <ActivePlan />
                            <BillingDetails />
                            <CardPaymentMethod />
                        </>
                    )}
                </Col>
            </Row>
        </Elements>
    )
}
