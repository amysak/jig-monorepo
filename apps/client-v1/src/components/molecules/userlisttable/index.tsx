import { CloseOutlined } from '@ant-design/icons'
import { Col, Row, Table, Typography } from 'antd'
import React from 'react'

import { useSelector } from 'react-redux'
import { getAccountUsersRequest } from '../../../actions/account'
import { store } from '../../../store'
import { capitalize } from '../../../utilities/utils'

const { Paragraph } = Typography

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',

        render(cell, user: { first_name: any; last_name: any }) {
            return `${user.first_name} ${user.last_name}`
        },
    },
    {
        title: 'Priviledge',
        dataIndex: 'priviledge',
        key: 'priviledge',

        render(priviledge: string) {
            return capitalize(priviledge)
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',

        render(status: string) {
            return capitalize(status)
        },
    },
    {
        title: '',
        key: '',

        render: (text, record: { deletable: any }) => {
            return record.deletable ? (
                <CloseOutlined style={{ fontSize: '20px' }} />
            ) : null
        },
    },
]

function UsersListTable() {
    // @ts-expect-error TS(2339): Property 'account' does not exist on type 'Default... Remove this comment to see the full error message
    const users = useSelector((state) => state.account.users)
    React.useEffect(() => {
        store.dispatch(getAccountUsersRequest())
    }, [])

    return (
        <Col>
            <Row>
                <Paragraph strong>
                    Select a User to modify ther account settings or their
                    printing preferences.
                </Paragraph>
            </Row>

            <Row style={{ marginTop: '20px' }}>
                <Table
                    dataSource={users.data}
                    // @ts-expect-error TS(2322): Type '({ title: string; dataIndex: string; key: st... Remove this comment to see the full error message
                    columns={columns}
                    pagination={false}
                    size="small"
                    style={{ width: '100%' }}
                    rowKey="id"
                />
            </Row>
        </Col>
    )
}

export default UsersListTable
