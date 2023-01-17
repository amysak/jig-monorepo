import { MailOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'
import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react'
import { Controller, useForm as RuseForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Alert, Button, ErrorList, Form, Input, Row } from 'components/atoms'
import AuthLayout from 'components/templates/authLayout'
import { AuthContext } from '../../store/auth'

interface EnterEmailProps {
    setEmail: Dispatch<SetStateAction<boolean | string>>
}

const formLayout = {
    wrapperCol: { span: 24 },
}

export default function EnterEmail({ setEmail }: EnterEmailProps) {
    const authCtx = useContext(AuthContext)
    const [hasError, setHasError] = useState(false)

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = RuseForm({
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
        shouldFocusError: false,
        shouldUseNativeValidation: false,
    })

    const onFinish = useCallback(
        async (payload: { email: string }) => {
            try {
                setHasError(false)

                await authCtx.onSendOTP(payload)

                setEmail(payload.email)
            } catch (error) {
                setHasError(true)
            }
        },
        [authCtx, setEmail]
    )

    const emailErrors = useMemo(
        () => [
            errors?.email?.type === 'required' && (
                <p key="required">Enter an email</p>
            ),
            errors?.email?.type === 'pattern' && (
                <p key="pattern">{errors?.email?.message}</p>
            ),
        ],
        [errors?.email?.message, errors?.email?.type]
    )

    return (
        <AuthLayout>
            <Form
                onFinish={handleSubmit(onFinish)}
                name="signupform"
                {...formLayout}
                layout="vertical"
                className="authlayout__centerCol-signupform"
            >
                {hasError ? (
                    <Alert
                        message="An error occured. Please, try again."
                        type="error"
                        showIcon
                        banner
                    />
                ) : null}

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Please provide a valid Email',
                        },
                    }}
                    render={({
                        field: { value, onChange, onBlur, ...rest },
                    }) => {
                        const handler = (e) => {
                            if (!(e.target.value.length >= 100)) onChange(e)
                        }
                        return (
                            <Input
                                size="middle"
                                onChange={handler}
                                onBlur={onBlur}
                                placeholder="Enter email address"
                                prefix={<MailOutlined />}
                                value={value}
                                {...rest}
                                status={
                                    !isEmpty(errors?.email)
                                        ? 'error'
                                        : undefined
                                }
                            />
                        )
                    }}
                />

                <ErrorList errors={emailErrors} />

                <br />
                <br />

                {/* @ts-expect-error TS(2322): Type '"end"' is not assignable to type '"top" | "m... Remove this comment to see the full error message */}
                <Row align="end">
                    <Button
                        className="jig-button"
                        htmlType="submit"
                        size="small"
                    >
                        Submit
                    </Button>
                </Row>

                <Row justify="end" style={{ marginTop: '30px' }}>
                    Remember your password?{' '}
                    <Link to="/signin">&nbsp; Sign in</Link>
                </Row>
            </Form>
        </AuthLayout>
    )
}
