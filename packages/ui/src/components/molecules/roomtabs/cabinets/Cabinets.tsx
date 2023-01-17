import React, { useEffect } from 'react'
import { useNavigate, useParams, Route } from 'react-router-dom'
import { Tabs } from 'antd'

import './cabinets.scss'
import { RoomCabinetOverview } from '../../room-cabinet-overview'

const BaseCabinets = React.lazy(() => import('./BaseCabinets'))

const UpperCabinets = React.lazy(() => import('./UpperCabinets'))

const TallCabinets = React.lazy(() => import('./TallCabinets'))

const VanityCabinets = React.lazy(() => import('./VanityCabinets'))

const { TabPane } = Tabs
const panes = [
    { tab: 'Base Cabinets', Component: BaseCabinets, route: 'base-cabinets' },
    {
        tab: 'Upper Cabinets',
        Component: UpperCabinets,
        route: 'upper-cabinets',
    },
    { tab: 'Tall Cabinets', Component: TallCabinets, route: 'tall-cabinets' },
    {
        tab: 'Vanity Cabinets',
        Component: VanityCabinets,
        route: 'vanity-cabinets',
    },
]

export default function Cabinets() {
    const navigate = useNavigate()
    const params = useParams<{ id?: string; cabinetTab?: string }>()

    useEffect(() => {
        if (!params.cabinetTab)
            navigate(`/rooms/${params.id}/cabinets/base-cabinets`, {
                replace: true,
            })
    })

    return (
        <Tabs
            defaultActiveKey="base-cabinets"
            activeKey={params.cabinetTab}
            onChange={(cabinetTab) =>
                navigate(`/rooms/${params.id}/cabinets/${cabinetTab}`)
            }
            style={{ width: '100%' }}
        >
            {panes.map((pane) => (
                <TabPane key={pane.route} tab={pane.tab}>
                    <Route
                        path={`/rooms/:id?/cabinets/${pane.route}`}
                        element={<pane.Component />}
                    />
                    <Route
                        path={`/rooms/:id?/cabinets/${pane.route}/overview/:cabinetId?`}
                        element={<RoomCabinetOverview />}
                    />
                </TabPane>
            ))}
        </Tabs>
    )
}
