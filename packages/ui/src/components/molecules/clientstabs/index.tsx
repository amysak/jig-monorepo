import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import { Route, useNavigate, useParams } from 'react-router-dom'

import { ClientDefaultSettings } from 'features/Terms'

import ClientContactInfo from '../clientcontactinfo'
import ClientJobList from '../clientjoblist'

const { TabPane } = Tabs

const panes = [
    {
        title: 'Contact Info',
        Content: ClientContactInfo,
        route: 'contact-info',
    },
    {
        title: 'Default Settings',
        Content: ClientDefaultSettings,
        route: 'default-settings',
    },
    { title: 'Jobs', Content: ClientJobList, route: 'jobs' },
]

function ClientTab() {
    const navigate = useNavigate()
    const params = useParams<{ id?: string; tabName?: string }>()

    useEffect(() => {
        if (!params.tabName)
            navigate(`/clients/${params.id}/contact-info`, {
                replace: true,
            })
    })

    return (
        <>
            <Tabs
                defaultActiveKey="contact-info"
                onChange={(tabName) =>
                    navigate(`/clients/${params.id}/${tabName}`)
                }
                activeKey={params.tabName}
                style={{ width: '100%' }}
                className="pagewrapper__maincontent nomargin"
            >
                {panes.map((pane) => (
                    <TabPane tab={pane.title} key={pane.route}>
                        <Route element={<pane.Content />} />
                    </TabPane>
                ))}
            </Tabs>
        </>
    )
}

export default ClientTab
