import React, { useEffect } from 'react'
import { Route, useNavigate, useParams } from 'react-router-dom'
import { Tabs } from 'antd'

import EndPanels from './EndPanels'
import AppliancePanels from './AppliancePanels'
import WainscotPanels from './WainscotPanels'

const { TabPane } = Tabs
const panes = [
    { tab: 'End Panels', Component: EndPanels, route: 'end-panels' },
    {
        tab: 'Appliance Panels',
        Component: AppliancePanels,
        route: 'appliance-panels',
    },
    {
        tab: 'Wainscot Panels',
        Component: WainscotPanels,
        route: 'wainscot-panels',
    },
]

function Panels() {
    const navigate = useNavigate()
    const params = useParams<{ id?: string; panelTab?: string }>()

    useEffect(() => {
        if (!params.panelTab)
            navigate(`/rooms/${params.id}/panels/end-panels`, {
                replace: true,
            })
    })

    return (
        <Tabs
            defaultActiveKey="end-panels"
            activeKey={params.panelTab}
            onChange={(panelTab) =>
                navigate(`/rooms/${params.id}/panels/${panelTab}`)
            }
            style={{ width: '100%' }}
        >
            {panes.map((pane) => (
                <TabPane key={pane.route} tab={pane.tab}>
                    <Route
                        path={`/rooms/:id?/panels/${pane.route}`}
                        element={<pane.Component />}
                    />
                </TabPane>
            ))}
        </Tabs>
    )
}

export default Panels
