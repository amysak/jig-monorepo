import { Tabs } from 'antd'
import { Card } from 'components/atoms'
import React from 'react'

import EstimateProposal from './EstimateProposal'
import JobCost from './JobCost'
import JobItemCost from './JobItemCost'

import './ReportTabs.styles.scss'

export function ReportTabs() {
    return (
        <Card size="default" className="report-card">
            <Tabs className="report-tabs">
                <Tabs.TabPane tab="Estimate/Proposal" key="1">
                    <EstimateProposal />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Job Item Cost" key="2">
                    <JobItemCost />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Job Cost" key="3">
                    <JobCost />
                </Tabs.TabPane>
            </Tabs>
        </Card>
    )
}
