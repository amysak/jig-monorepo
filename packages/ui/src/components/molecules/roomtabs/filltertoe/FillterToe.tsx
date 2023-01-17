import React, { useEffect } from 'react'
import { useNavigate, useParams, Route } from 'react-router-dom'
import { Tabs } from 'antd'
import { FillerToeProvider } from './store'

const FillerTable = React.lazy(() => import('./FillerTable'))

const ToeSkin = React.lazy(() => import('./ToeSkin'))

const ToePlaform = React.lazy(() => import('./ToePlaform'))

const { TabPane } = Tabs
const panes = [
    { tab: 'Fillers', Component: FillerTable, route: 'fillers' },
    { tab: 'Toe Board', Component: ToeSkin, route: 'toe-skin' },
    { tab: 'Toe Platform', Component: ToePlaform, route: 'toe-platform' },
]

export default function FillterToe() {
    const navigate = useNavigate()
    const params = useParams<{ id?: string; fillerTab?: string }>()

    useEffect(() => {
        if (!params.fillerTab) {
            navigate(`/rooms/${params.id}/fillers-toe/fillers`, {
                replace: true,
            })
        }
    }, [])

    return (
        <FillerToeProvider>
            <Tabs
                defaultActiveKey="fillers"
                activeKey={params.fillerTab}
                onChange={(fillerTab) =>
                    navigate(`/rooms/${params.id}/fillers-toe/${fillerTab}`)
                }
                style={{ width: '100%' }}
            >
                {panes.map((pane) => (
                    <TabPane key={pane.route} tab={pane.tab}>
                        <Route
                            path={`/rooms/:id?/fillers-toe/${pane.route}`}
                            element={<pane.Component />}
                        />
                    </TabPane>
                ))}
            </Tabs>
        </FillerToeProvider>
    )
}
