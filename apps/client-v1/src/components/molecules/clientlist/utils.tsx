import { Form, Input, Row, Select } from 'antd'
import get from 'lodash/get'
import React from 'react'
import { Link } from 'react-router-dom'

import { ACTIVE_INACTIVE_STATUSES_OPTIONS } from 'utilities/constants'
import { shortId } from 'utilities/utils'

export const ClientsFilterRow = () => {
    return (
        <Row className="cabinets-filter-row">
            <Form.Item name="s">
                <Input
                    style={{ minWidth: '300px' }}
                    placeholder="Client, Contact"
                />
            </Form.Item>

            <Form.Item name="status">
                <Select
                    style={{ minWidth: '200px' }}
                    allowClear
                    placeholder="Status"
                >
                    {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
                        <Select.Option key={shortId()} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Row>
    )
}

export const columns = [
    {
        title: 'Client',
        dataIndex: 'name',
        key: 'name',
        sorter: true,

        render(name, client: { id: any }) {
            return <Link to={`/clients/${client.id}`}>{name}</Link>
        },
    },
    {
        title: 'Contact',
        dataIndex: 'preferred_contact',
        key: 'preferred_contact',

        render(
            key: string | number,
            client: { [x: string]: { last_name: any } }
        ) {
            return client[key]
                ? //@ts-ignore
                  `${client[key].first_name} ${client[key].last_name}`
                : null
        },
    },
    {
        title: 'Preferred Phone',
        dataIndex: 'preferred_phone',
        key: 'preferred_phone',

        render(key, client) {
            return get(client, key)
        },
    },
    {
        title: 'Preferred Email',
        dataIndex: 'preferred_email',
        key: 'preferred_email',

        render(key: string | number, client: { [x: string]: any }) {
            return get(client[key], 'email')
        },
    },
]

export const initialPath = {
    title: 'Clients',
    path: '/clients',
}
