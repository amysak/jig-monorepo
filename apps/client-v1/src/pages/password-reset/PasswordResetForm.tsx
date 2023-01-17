import { LockOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Controller, useForm as RuseForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
    Alert,
    Button,
    Divider,
    ErrorList,
    Form,
    Input,
    InputPassword,
    Row,
    Text,
} from 'components/atoms'
import AuthLayout from 'components/templates/authLayout'
import { AuthContext } from '../../store/auth'
import { showSuccessModal } from './Modal'

interface PasswordResetFormProps {
    email: boolean
}

const formLayout = {
    wrapperCol: { span: 24 },
}

export default function PasswordResetForm({ email }: PasswordResetFormProps) {
    const authCtx = useContext(AuthContext)
    const [hasError, setHasError] = useState(false)
    const navigate = useNavigate()

    const {
        handleSubmit,
        formState: { errors },
        control,
        getValues,
    } = RuseForm({
        defaultValues: {
            otp: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
        shouldFocusError: false,
        shouldUseNativeValidation: false,
    })

    const onFinish = useCallback(
        async (data: { otp: string; password: string }) => {
            try {
                const { otp, password } = data

                setHasError(false)

                await authCtx.onVerifyPasswordOTP({
                    otp,
                    password,
                    email,
                })

                showSuccessModal({ onClick: () => navigate('/signin') })
            } catch (error) {
                setHasError(true)
            }
        },
        [authCtx, email, navigate]
    )

    /* #region  otp */
    const lengthOtp = 5

    const otpErrors = useMemo(
        () => [
            errors?.otp?.type === 'required' && (
                <p key="required">Enter OTP Code</p>
            ),
            errors?.otp?.type === 'minLength' && (
                <p key="pattern">{errors?.otp?.message}</p>
            ),
        ],
        [errors?.otp?.message, errors?.otp?.type]
    )
    /* #endregion */

    /* #region  password */
    const minLengthPassword = 6
    const maxLengthPassword = 32

    const passwordErrors = useMemo(
        () => [
            errors?.password?.type === 'pattern' && (
                <p>{errors?.password?.message}</p>
            ),
            errors?.password?.type === 'minLength' && (
                <p>{errors?.password?.message}</p>
            ),
        ],
        [errors?.password?.message, errors?.password?.type]
    )
    /* #endregion */

    const confirmPasswordErrors = useMemo(
        () => [
            errors?.confirmPassword?.type === 'required' && (
                <p>This field is required</p>
            ),
            errors?.confirmPassword?.type === 'validate' && (
                <p>{errors?.confirmPassword?.message}</p>
            ),
        ],
        [errors?.confirmPassword?.message, errors?.confirmPassword?.type]
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
                        message="An error occured. Please, confirm OTP code or try again."
                        type="error"
                        showIcon
                        banner
                    />
                ) : null}

                <Text type="secondary">
                    An OTP code has been sent to your email. Please, enter the
                    code you recieve below to reset your password.
                </Text>

                <Divider />

                <Controller
                    name="otp"
                    control={control}
                    rules={{
                        required: true,
                        minLength: {
                            value: lengthOtp,
                            message: `The min length is ${lengthOtp} characters`,
                        },
                    }}
                    render={({ field: { onChange, ...rest } }) => {
                        const handler = (e) => {
                            if (!(e.target.value.length > lengthOtp))
                                onChange(e)
                        }
                        return (
                            <Input
                                type="text"
                                prefix={<LockOutlined />}
                                placeholder="Enter OTP"
                                size="middle"
                                onChange={handler}
                                {...rest}
                                status={
                                    !isEmpty(errors?.otp) ? 'error' : undefined
                                }
                            />
                        )
                    }}
                />

                <ErrorList errors={otpErrors} />

                <br />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: true,
                        minLength: {
                            value: minLengthPassword,
                            message: 'Password is too short',
                        },
                        pattern: {
                            value: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
                            message:
                                'Must contain atleast one capital, lowercase letters and a number',
                        },
                    }}
                    render={({
                        field: { value, onChange, onBlur, ...rest },
                    }) => {
                        const handler = (e) => {
                            if (!(e.target.value.length >= maxLengthPassword))
                                onChange(e)
                        }
                        return (
                            <InputPassword
                                size="middle"
                                visibilityToggle
                                prefix={<LockOutlined />}
                                placeholder="Enter new password"
                                onChange={handler}
                                onBlur={onBlur}
                                value={value}
                                {...rest}
                                status={
                                    errors?.password?.type === 'required'
                                        ? 'error'
                                        : undefined
                                }
                            />
                        )
                    }}
                />

                <ErrorList errors={passwordErrors} />

                <br />

                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: true,
                        validate: (value) => {
                            const { password } = getValues()
                            return (
                                password === value ||
                                'The passwords should be identical'
                            )
                        },
                    }}
                    render={({
                        field: { value, onChange, onBlur, ...rest },
                    }) => {
                        const handler = (e) => {
                            if (!(e.target.value.length >= maxLengthPassword))
                                onChange(e)
                        }
                        return (
                            <InputPassword
                                size="middle"
                                visibilityToggle
                                prefix={<LockOutlined />}
                                placeholder="Confirm password"
                                onChange={handler}
                                onBlur={onBlur}
                                value={value}
                                {...rest}
                                status={
                                    errors?.confirmPassword?.type === 'required'
                                        ? 'error'
                                        : undefined
                                }
                            />
                        )
                    }}
                />

                <ErrorList errors={confirmPasswordErrors} />

                <br />
                <br />

                {/* @ts-expect-error TS(2322): Type '"end"' is not assignable to type '"top" | "m... Remove this comment to see the full error message */}
                <Row align="end">
                    <Button
                        className="jig-button"
                        htmlType="submit"
                        size="small"
                    >
                        Reset my password
                    </Button>
                </Row>
            </Form>
        </AuthLayout>
    )
}
