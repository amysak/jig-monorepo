import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../store/auth'
import { SignUpPage } from './Signup'

function ConnectedSignUpPage() {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>('')

    const onFinish = async (payload: { email: string }) => {
        try {
            setLoading(true)
            payload.email = payload.email?.toLowerCase()

            await authCtx.onSignup(payload)

            navigate('/getting-started')
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return <SignUpPage onFinish={onFinish} loading={loading} error={error} />
}

export default ConnectedSignUpPage
