import React, { useState } from 'react'

import EnterEmail from './EnterEmail'
import PasswordResetForm from './PasswordResetForm'

export default function PasswordReset() {
    const [email, setEmail] = useState(false)

    const viewComponent = email ? (
        <PasswordResetForm email={email} />
    ) : (
        <EnterEmail setEmail={setEmail} />
    )

    return viewComponent
}
