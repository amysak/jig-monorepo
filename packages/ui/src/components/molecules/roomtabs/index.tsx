import React, { useEffect } from 'react'
import { useNavigate, useParams, Route } from 'react-router-dom'
import { Tabs } from 'antd'

import './roomtabs.scss'

const RoomMaterials = React.lazy(() => import('./materials/Materials'))

const Cabinets = React.lazy(() => import('./cabinets/Cabinets'))

const Panels = React.lazy(() => import('./panels/Panels'))

const FillterToe = React.lazy(() => import('./filltertoe/FillterToe'))

const Hardware = React.lazy(() => import('./hardware'))

const Accessories = React.lazy(() => import('./accessories'))

const TrimMolding = React.lazy(() => import('./trimmolding'))

const LaborRates = React.lazy(() => import('./laborrates'))

const { TabPane } = Tabs
const panes = [
    {
        title: 'Material',
        Content: RoomMaterials,
        route: 'materials',
        subRoute: 'materialTab',
        exact: false,
    },
    {
        title: 'Cabinets',
        Content: Cabinets,
        route: 'cabinets',
        subRoute: 'cabinetTab',
        exact: false,
    },
    {
        title: 'Panels',
        Content: Panels,
        route: 'panels',
        subRoute: 'panelTab',
        exact: false,
    },
    {
        title: 'Fillers | Toe',
        Content: FillterToe,
        route: 'fillers-toe',
        subRoute: 'fillerTab',
        exact: false,
    },
    {
        title: 'Hardware',
        Content: Hardware,
        route: 'hardware',
        subRoute: 'hardwareTab',
        exact: true,
    },
    {
        title: 'Accessories',
        Content: Accessories,
        route: 'accessories',
        subRoute: 'accessoryTab',
        exact: true,
    },
    {
        title: 'Trim | Molding',
        Content: TrimMolding,
        route: 'trim-molding',
        subRoute: 'trimTab',
        exact: true,
    },
    {
        title: 'Labor Rates',
        Content: LaborRates,
        route: 'labor-rates',
        subRoute: 'laborTab',
        exact: true,
    },
]

function RoomTabs() {
    const navigate = useNavigate()
    const params = useParams<{ id?: string; tabName?: string }>()
    useEffect(() => {
        if (!params.tabName)
            navigate(`/rooms/${params.id}/materials/exterior`, {
                replace: true,
            })
    })

    return (
        <Tabs
            defaultActiveKey="materials"
            onChange={(tabName) => navigate(`/rooms/${params.id}/${tabName}`)}
            activeKey={params.tabName}
            className="pagewrapper__maincontent nomargin"
        >
            {panes.map((pane) => (
                <TabPane tab={pane.title} key={pane.route}>
                    <Route
                        path={`/rooms/:id?/${pane.route}/:${pane.subRoute}?`}
                        element={<pane.Content />}
                    />
                </TabPane>
            ))}
        </Tabs>
    )
}

export default RoomTabs
