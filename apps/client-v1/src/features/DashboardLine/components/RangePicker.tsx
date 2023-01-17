import { Select, SelectProps } from 'components/atoms'
import { upperFirst } from 'lodash'
import * as React from 'react'

import { Ranges } from '../utils'

import './RangePicker.styles.scss'

interface RangePickerProps {
    range: Ranges
    isLoading: boolean
    onSelectRange: (selectedRange: Ranges) => void
}

const options: SelectProps['options'] = [
    { value: Ranges.week, label: Ranges.week },
    { value: Ranges.month, label: Ranges.month },
    { value: Ranges.year, label: Ranges.year },
]

const _options = options.map(({ value }) => ({
    value,
    label: upperFirst(value as string),
}))

export const RangePicker: React.FC<RangePickerProps> = ({
    range,
    onSelectRange,
    isLoading,
}) => {
    return (
        <Select
            loading={isLoading}
            className="line-range-picker"
            defaultValue={range}
            style={{ minWidth: 100 }}
            options={_options}
            onSelect={onSelectRange}
        />
    )
}
