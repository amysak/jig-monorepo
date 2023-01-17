import React from 'react'
import { Row, Col, Tabs, Select } from 'antd'
import { shortId } from '../../../utilities/utils'

import './styles.scss'
import Overview from './Overview'
import Details from './Details'
import CabinetSquareFeet from './CabinetSquareFeet'
import DoorSquareFeet from './DoorSquareFeet'
import DrawerFrontSquareFeet from './DrawerFrontSquareFeet'
import DrawerBoxSqaureFeet from './DrawerBoxSqaureFeet'
import TraySquareFeet from './TraySquareFeet'
import FaceFrameSquareFeet from './FaceFrameSquareFeet'

const { TabPane } = Tabs

const tabs = [
    { Component: Overview, tab: 'Cabinet Overview' },
    { Component: Details, tab: 'Cabinet Details' },
    { Component: CabinetSquareFeet, tab: 'Cabinet Square Feet' },
    { Component: DoorSquareFeet, tab: 'Door Square Feet' },
    { Component: DrawerFrontSquareFeet, tab: 'Drawer Front Sq. FT.' },
    { Component: DrawerBoxSqaureFeet, tab: 'Drawer Box Sq. FT.' },
    { Component: TraySquareFeet, tab: 'Tray Sq. Feet' },
    { Component: FaceFrameSquareFeet, tab: 'Face Frame Sq. FT.' },
]

export function RoomCabinetOverview() {
    return (
        <Col>
            <Row>
                <Col span={4}>
                    <Select>


                        {Array.from(Array(6)).map(() => (
                            <Select.Option key={shortId()}>
                                Cabinet stuff
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            <br />

            <Tabs
                defaultActiveKey="0"
                tabPosition="left"
                className="cabinet-overview-wrapper"
            >
                {tabs.map((tab, index) => (
                    <TabPane tab={tab.tab} key={`${index}`}>
                        <tab.Component />
                    </TabPane>
                ))}
            </Tabs>
        </Col>
    )
}
