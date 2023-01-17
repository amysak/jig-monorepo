import React from 'react'

import { FormItem, Input, Option, Row, Select } from 'components/atoms'
import { JOB_STATUSES_OPTIONS } from 'utilities/constants'
import { shortId } from 'utilities/utils'

export function JobsFilterRow() {
    return (
        <Row className="cabinets-filter-row">
            <FormItem name="name">
                <Input style={{ minWidth: '300px' }} placeholder="Name" />
            </FormItem>

            <FormItem name="status">
                <Select
                    style={{ minWidth: '200px' }}
                    allowClear
                    placeholder="Status"
                >
                    {JOB_STATUSES_OPTIONS.map((option) => (
                        <Option key={shortId()} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            </FormItem>
        </Row>
    )
}
