import {
    Calendar as AntCalendar,
    CalendarProps as AntCalendarProps,
} from 'antd'
import * as React from 'react'

export type CalendarProps<DateType> = AntCalendarProps<DateType>

export const Calendar: React.FC<CalendarProps<any>> = (props) => {
    return <AntCalendar {...props} />
}
