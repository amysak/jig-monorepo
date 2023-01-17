import {
    DatePicker as AntDatePicker,
    DatePickerProps as AntDatePickerProps,
} from 'antd'
import { RangePickerProps as AntRangePickerProps } from 'antd/lib/date-picker'
import * as React from 'react'

const { RangePicker: AntRangePicker } = AntDatePicker

export type DatePickerProps = AntDatePickerProps

export const DatePicker: React.FC<DatePickerProps> = (props) => {
    return <AntDatePicker {...props} />
}

export type RangePickerProps = AntRangePickerProps

export const RangePicker: React.FC<RangePickerProps> = (props) => {
    return <AntRangePicker {...props} />
}
