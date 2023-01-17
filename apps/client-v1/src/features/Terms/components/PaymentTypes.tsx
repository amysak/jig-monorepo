import React from 'react'

import {
    Alert,
    FormItem,
    InputGroup,
    InputNumber,
    Radio,
    RadioGroup,
} from 'components/atoms'
import { inputNumberPercentProps } from 'utilities'

export const ThreePayment = () => {
    return (
        <>
            <FormItem label="Enter the percentage of the first payment">
                <InputGroup compact>
                    <FormItem name="first_payment_percentage">
                        <InputNumber {...inputNumberPercentProps} />
                    </FormItem>
                </InputGroup>
            </FormItem>

            <FormItem label="Enter the percentage of the second payment">
                <InputGroup compact>
                    <FormItem name="second_payment_percentage">
                        <InputNumber {...inputNumberPercentProps} />
                    </FormItem>
                </InputGroup>
            </FormItem>

            <FormItem
                shouldUpdate
                label="These Terms for Estimates or Proposals will read as follows"
            >
                {(form) => {
                    const firstPayment =
                        form.getFieldValue('first_payment_percentage') ?? 0
                    const secondPayment =
                        form.getFieldValue('second_payment_percentage') ?? 0

                    return `${firstPayment}% deposit required to place job into production schedule, ${secondPayment}% due upon delivery, ${secondPayment}% balance due upon completion.`
                }}
            </FormItem>
        </>
    )
}

export const TwoPayment = () => {
    return (
        <>
            <FormItem label="Enter the percentage of the first payment">
                <InputGroup compact>
                    <FormItem name="first_payment_percentage">
                        <InputNumber {...inputNumberPercentProps} />
                    </FormItem>
                </InputGroup>
            </FormItem>

            <FormItem
                shouldUpdate
                label="These Terms for Estimates or Proposals will read as follows"
            >
                {(form) => {
                    const value = form.getFieldValue('first_payment_percentage')

                    return `${value}% deposit required to place job into production schedule, balance due prior to delivery.`
                }}
            </FormItem>
        </>
    )
}

export const NetNoDiscount = () => {
    return (
        <>
            <FormItem
                name="number_of_days_balance_is_due"
                label="Number of days when the balance is due"
            >
                <InputNumber min={0} />
            </FormItem>

            <FormItem
                shouldUpdate
                label="These Terms for Estimates or Proposals will read as follows"
            >
                {(form) => {
                    const days =
                        form.getFieldValue('number_of_days_balance_is_due') ?? 0

                    return (
                        <Alert
                            message={`Net ${days} days`}
                            banner
                            type="info"
                        />
                    )
                }}
            </FormItem>
        </>
    )
}

export function NetWithDiscount() {
    return (
        <>
            <FormItem label="Discount %">
                <InputGroup compact>
                    <FormItem name="discount">
                        <InputNumber {...inputNumberPercentProps} />
                    </FormItem>
                </InputGroup>
            </FormItem>

            <FormItem label="Number of days that discount is available">
                <InputGroup compact>
                    <FormItem name="number_of_days_discount_is_available">
                        <InputNumber />
                    </FormItem>
                </InputGroup>
            </FormItem>

            <FormItem label="Number of days when the balance is due">
                <InputGroup compact>
                    <FormItem name="number_of_days_balance_is_due">
                        <InputNumber />
                    </FormItem>
                </InputGroup>
            </FormItem>

            <FormItem
                name="adjust_total"
                label="Adjust Total to compensate for discount amount"
            >
                <RadioGroup>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </RadioGroup>
            </FormItem>

            <FormItem
                shouldUpdate
                label="These Terms for Estimates or Proposals will read as follows"
            >
                {(form) => {
                    const discount = form.getFieldValue('discount') ?? 0
                    const discountDays =
                        form.getFieldValue(
                            'number_of_days_discount_is_available'
                        ) ?? 0
                    const dueDays =
                        form.getFieldValue('number_of_days_balance_is_due') ?? 0

                    return `${discount}% discount may be taken if this invoice is paid within ${discountDays} days of delivery, net ${dueDays} days.`
                }}
            </FormItem>
        </>
    )
}
