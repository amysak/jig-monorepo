import { Button, Divider, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { AccountContext } from '../../../store/account'

import MailingAddressForm from '../companysetup/mailaddressform'

const { Title } = Typography

function BillingDetailsView() {
    const accountCtx = useContext(AccountContext)

    // @ts-ignore
    const { mailing_address: address = {} } = accountCtx.account

    return (
        <>
            <Title level={4} className="billingdetails__title">
                {/*// @ts-ignore */}
                {accountCtx.account.name}
            </Title>
            {/*// @ts-ignore */}
            <p className="billingdetails__email">{accountCtx.account.email}</p>

            <section className="billingdetails__address">
                <p>{address?.street}</p>
                <p>
                    {address?.state}, {address?.zip}
                </p>
                <p>{address?.city}</p>
            </section>
        </>
    )
}

export default function BillingDetails() {
    const [updating, setUpdating] = useState(false)

    return (
        <>
            <Title level={3}>Billing Details</Title>

            <Divider className="x5" />
            <div className="billingdetails">
                {updating ? (
                    <MailingAddressForm simple />
                ) : (
                    <BillingDetailsView />
                )}

                <Button
                    size="small"
                    onClick={() => setUpdating(!updating)}
                    className="billingdetails__edit"
                >
                    {updating ? 'Cancel' : 'Edit'}
                </Button>
            </div>
        </>
    )
}
