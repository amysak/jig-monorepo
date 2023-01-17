import { Col, Row } from 'components/atoms'
import React, { useState } from 'react'

import { JobsRoomSelect, ReportTabs } from '../components'

import './reports.scss'

export function Reports() {
    const [selectedJob, setSelectedJob] = useState(null)

    return (
        <Row
            justify="space-between"
            gutter={[20, 20]}
            className="reports-pagewrapper"
        >
            <Col xs={24} lg={11} xxl={8}>
                <JobsRoomSelect
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                />
            </Col>

            <Col xs={24} lg={13} xxl={16}>
                <ReportTabs />
            </Col>
        </Row>
    )
}
