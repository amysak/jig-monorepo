import { Tabs } from 'antd'
import React from 'react'

import '../../components/molecules/roomtabs/roomtabs.scss'

const RoomMaterials = React.lazy(
    () => import('../../components/molecules/roomtabs/materials/Materials')
)
const Cabinets = React.lazy(
    () => import('../../components/molecules/roomtabs/cabinets/Cabinets')
)
const Panels = React.lazy(
    () => import('../../components/molecules/roomtabs/panels/Panels')
)
const FillterToe = React.lazy(
    () => import('../../components/molecules/roomtabs/filltertoe/FillterToe')
)
const Hardware = React.lazy(
    () => import('../../components/molecules/roomtabs/hardware')
)
const Accessories = React.lazy(
    () => import('../../components/molecules/roomtabs/accessories')
)
const TrimMolding = React.lazy(
    () => import('../../components/molecules/roomtabs/trimmolding')
)
const LaborRates = React.lazy(
    () => import('../../components/molecules/roomtabs/laborrates')
)

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
        title: 'Fillers|Toe',
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
        title: 'Trim|Molding',
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

function SetupRoomTabs() {
    const [currentTab, setCurrentTab] = React.useState('materials')

    return (
        <Tabs
            defaultActiveKey="materials"
            onChange={(tabName) => setCurrentTab(tabName)}
            activeKey={currentTab}
            className="room-tabs"
        >
            {panes.map((pane) => (
                <TabPane tab={pane.title} key={pane.route}>
                    <pane.Content />
                </TabPane>
            ))}
        </Tabs>
    )
}

export default SetupRoomTabs
