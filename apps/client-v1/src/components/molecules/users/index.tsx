import React from 'react'
import { Row, Tabs } from 'antd'
import UsersListTable from '../userlisttable'
import NewUserForm from '../newuserform'

const { TabPane } = Tabs

const panes = [
    { title: 'Users', Content: UsersListTable },
    { title: 'New User', Content: NewUserForm },
]

function Users({ style }: { style?: React.CSSProperties }) {
    const [currentTabKey, setCurrentTabKey] = React.useState('0')

    return (
        <Row style={style}>
            <Tabs
                defaultActiveKey="0"
                onChange={(index) => setCurrentTabKey(index)}
                activeKey={currentTabKey}
                style={{ width: '100%' }}
            >
                {panes.map((pane, index) => (
                    <TabPane tab={pane.title} key={`${index}`}>
                        <pane.Content />
                    </TabPane>
                ))}
            </Tabs>
        </Row>
    )
}

export default Users
