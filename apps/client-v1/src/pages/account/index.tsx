import React, { lazy, Suspense, useEffect } from 'react'
import { Route, useNavigate, useParams } from 'react-router-dom'
import { Col, Typography, Tabs, Row } from 'antd'

import UILayout from '../../components/templates/uilayout'

import './account.scss'

const CompanySetup = lazy(
    () => import('../../components/molecules/companysetup')
)
const CabinetPreference = lazy(
    () => import('../../components/molecules/preferences')
)

const NewUserForm = lazy(() => import('../../components/molecules/newuserform'))

const Users = lazy(() => import('../../components/molecules/users'))

const Billing = lazy(() => import('../../components/molecules/billing'))

const { Title } = Typography
const { TabPane } = Tabs
const panes = [
    { title: 'Company', Content: CompanySetup, route: 'company' },
    { title: 'Cabinets', Content: CabinetPreference, route: 'cabinets' },
    { title: 'Security', Content: NewUserForm, route: 'security' },
    { title: 'Users', Content: Users, route: 'users' },
    { title: 'Billing', Content: Billing, route: 'billing' },
]

function AccountPage() {
    const navigate = useNavigate()
    const params = useParams<{ tabName?: string }>()

    useEffect(() => {
        if (!params.tabName) navigate('/account/company', { replace: true })
    }, [])

    return (
        <UILayout>
            {/* @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'FlexType... Remove this comment to see the full error message */}
            <Col flex className="pagewrapper">
                <Row>
                    <Title>Account</Title>
                </Row>

                <Tabs
                    defaultActiveKey="company"
                    onChange={(tabName) => navigate(`/account/${tabName}`)}
                    activeKey={params.tabName}
                    tabPosition="left"
                    tabBarStyle={{ backgroundColor: 'transparent' }}
                    size="small"
                >
                    {panes.map((pane) => (
                        <TabPane
                            className="pagewrapper__maincontent"
                            key={pane.route}
                            tab={pane.title}
                        >
                            <Suspense fallback={''}>
                                <Route
                                    path={`/account/${pane.route}/:subTab?`}
                                    element={<pane.Content />}
                                />
                            </Suspense>
                        </TabPane>
                    ))}
                </Tabs>
            </Col>
        </UILayout>
    )
}

export default AccountPage
