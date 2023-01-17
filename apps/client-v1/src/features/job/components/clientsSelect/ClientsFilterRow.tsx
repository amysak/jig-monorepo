import React from 'react'

import { FormItem, Input, Option, Row, Select } from 'components/atoms'
import { ACTIVE_INACTIVE_STATUSES_OPTIONS } from 'utilities/constants'

export function ClientsFilterRow() {
    return (
        <Row className="cabinets-filter-row">
            <FormItem name="s">
                <Input style={{ minWidth: '300px' }} />
            </FormItem>

            <FormItem name="status">
                <Select
                    style={{ minWidth: '200px' }}
                    allowClear
                    placeholder="Status"
                >
                    {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            </FormItem>
        </Row>
    )
}
