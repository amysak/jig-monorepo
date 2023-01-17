import React, { lazy, useEffect, Suspense } from 'react'
import { Route, useNavigate, useParams } from 'react-router-dom'
import { Row, Tabs } from 'antd'

const { TabPane } = Tabs

const PreferencesForm = lazy(() => import('../preferencesform'))
const PreferredContructionForm = lazy(
    () => import('../preferredcontructionform')
)

const Vendors = lazy(() => import('../vendors'))

const MaterialTypes = lazy(() => import('../materialtypes'))

const panes = [
    { title: 'Preferences', Content: PreferencesForm, route: 'preferences' },
    {
        title: 'Preferred Contruction Methods',
        Content: PreferredContructionForm,
        route: 'construction-methods',
    },
    {
        title: 'Material Types',
        Content: MaterialTypes,
        route: 'material-types',
    },
    { title: 'Vendors', Content: Vendors, route: 'vendors' },
]

function Preferences({ style }: { style?: React.CSSProperties }) {
    const navigate = useNavigate()
    const params = useParams<{ subTab?: string }>()

    useEffect(() => {
        if (!params.subTab)
            navigate('/account/cabinets/preferences', { replace: true })
    }, [])

    return (
        <Row style={style}>
            <Tabs
                defaultActiveKey="preferences"
                onChange={(tabName) => navigate(`/account/cabinets/${tabName}`)}
                style={{ width: '100%' }}
                activeKey={params.subTab}
            >
                {panes.map((pane) => (
                    <TabPane tab={pane.title} key={pane.route}>
                        <Suspense>
                            <Route
                                path={`/account/cabinets/${pane.route}`}
                                element={<pane.Content />}
                            />
                        </Suspense>
                    </TabPane>
                ))}
            </Tabs>
        </Row>
    )
}

export default Preferences
