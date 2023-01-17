import isEmpty from 'lodash/isEmpty'
import React, { useCallback, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import {
    Alert,
    Button,
    ErrorList,
    Form,
    Input,
    InputPassword,
    Row,
} from 'components/atoms'
import { FormItem } from 'components/atoms/form/Form'
import AuthLayout from 'components/templates/authLayout'

import './SignUp.scss'

interface SignUpPageProps {
    onFinish: (payload: any) => Promise<void>
    loading: boolean
    error: string | null
}

const formLayout = {
    wrapperCol: { span: 24 },
}

export function SignUpPage({ onFinish, error }: SignUpPageProps) {
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
        shouldFocusError: false,
        shouldUseNativeValidation: false,
    })

    const onSubmit = useCallback(
        (data) => {
            onFinish(data)
        },
        [onFinish]
    )

    const firstNameErrors = useMemo(
        () => [
            errors?.first_name?.type === 'required' && (
                <p key="required">Enter a first name</p>
            ),
            errors?.first_name?.type === 'minLength' && (
                <p key="pattern">{errors?.first_name?.message}</p>
            ),
        ],
        [errors?.first_name?.message, errors?.first_name?.type]
    )
    const lastNameErrors = useMemo(
        () => [
            errors?.last_name?.type === 'required' && (
                <p key="required">Enter a last name</p>
            ),
            errors?.last_name?.type === 'minLength' && (
                <p key="pattern">{errors?.last_name?.message}</p>
            ),
        ],
        [errors?.last_name?.message, errors?.last_name?.type]
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

    return (
        <AuthLayout>
            <Form
                onFinish={handleSubmit(onSubmit)}
                name="signupform"
                {...formLayout}
                layout="vertical"
                className="authlayout__centerCol-signupform"
            >
                {error && (
                    <Alert message={error} type="error" showIcon banner />
                )}

                <Controller
                    name="first_name"
                    control={control}
                    rules={{
                        required: true,
                        minLength: {
                            value: 2,
                            message: 'The min length is 2 characters',
                        },
                    }}
                    render={({ field: { onChange, ...rest } }) => {
                        const handler = (e) => {
                            if (!(e.target.value.length >= 100)) onChange(e)
                        }
                        return (
                            <FormItem label="First Name" name="First Name">
                                <Input
                                    placeholder="First Name"
                                    size="middle"
                                    onChange={handler}
                                    {...rest}
                                    status={
                                        !isEmpty(errors?.first_name)
                                            ? 'error'
                                            : undefined
                                    }
                                />
                            </FormItem>
                        )
                    }}
                />

                <ErrorList errors={firstNameErrors} />

                <Controller
                    name="last_name"
                    control={control}
                    rules={{
                        required: true,
                        minLength: {
                            value: 2,
                            message: 'The min length is 2 characters',
                        },
                    }}
                    render={({ field: { onChange, ...rest } }) => {
                        const handler = (e) => {
                            if (!(e.target.value.length >= 100)) onChange(e)
                        }
                        return (
                            <FormItem label="Last Name" name="Last Name">
                                <Input
                                    placeholder="Last Name"
                                    size="middle"
                                    onChange={handler}
                                    {...rest}
                                    status={
                                        !isEmpty(errors?.last_name)
                                            ? 'error'
                                            : undefined
                                    }
                                />
                            </FormItem>
                        )
                    }}
                />

                <ErrorList errors={lastNameErrors} />

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
                            <FormItem label="Email" name="Email">
                                <Input
                                    size="middle"
                                    placeholder="Email"
                                    onChange={handler}
                                    onBlur={onBlur}
                                    value={value}
                                    {...rest}
                                    status={
                                        !isEmpty(errors?.email)
                                            ? 'error'
                                            : undefined
                                    }
                                />
                            </FormItem>
                        )
                    }}
                />

                <ErrorList errors={emailErrors} />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: true,
                        minLength: {
                            value: 6,
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
                            if (!(e.target.value.length >= 32)) onChange(e)
                        }
                        return (
                            <FormItem name="Password" label="Password">
                                <InputPassword
                                    visibilityToggle
                                    size="middle"
                                    placeholder="Password"
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
                            </FormItem>
                        )
                    }}
                />

                <ErrorList errors={passwordErrors} />

                <br />

                <br />

                {/* @ts-expect-error TS(2322): Type '"end"' is not assignable to type '"top" | "m... Remove this comment to see the full error message */}
                <Row align="end">
                    <Button
                        className="jig-button"
                        htmlType="submit"
                        size="small"
                    >
                        Create account
                    </Button>
                </Row>

                <Row justify="end" style={{ marginTop: '30px' }}>
                    Already have an account?{' '}
                    <Link to="/signin">&nbsp; Sign in</Link>
                </Row>
            </Form>
        </AuthLayout>
    )
}
