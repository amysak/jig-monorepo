import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Button, Popconfirm } from 'antd'

import CabinetCountTable from './CabinetCountTable'
import DoorSurfaceHardware from './DoorSurfaceHardware'
import DrawerSurfaceHardware from './DrawerSurfaceHardware'
import FunctionalHardware from './FunctionalHardware'
import AddHarwarePopover from './AddHardwarePopover'

import './hardware.scss'
import { HardwareContext } from '../../../../store/hardwares'
import { useParams } from 'react-router'
import { getQueryString } from '../../../../utilities/utils'

function Hardware() {
    const param = useParams()
    const hardwareCtx = useContext(HardwareContext)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)

            await hardwareCtx.onDeleteAllRoomHardware(param.id)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const query = getQueryString({ surface_application: 'door,drawer' })

        hardwareCtx.onGetRoomAccessorySetup(param.id, query)
    }, [])

    return (
        <Row>
            <Col span={12}>
                <CabinetCountTable />
            </Col>

            <Col span={12}>
                <div style={{ padding: '0 10px' }}>
                    <Row align="middle" style={{ position: 'relative' }}>
                        <AddHarwarePopover label="Add Hardware" />

                        <Popconfirm
                            okText="Yes"
                            onConfirm={onDelete}
                            title="Are you sure you want to delete all Hardwares from this room?"
                        >
                            <Button
                                loading={loading}
                                size="small"
                                className="add-hardware-btn"
                                // @ts-expect-error TS(2322): Type '"danger"' is not assignable to type '"link" ... Remove this comment to see the full error message
                                type="danger"
                            >
                                Delete All Hardware
                            </Button>
                        </Popconfirm>
                    </Row>

                    <br />

                    <DoorSurfaceHardware />
                    <br />
                    <br />

                    <DrawerSurfaceHardware />
                    <br />
                    <br />

                    <FunctionalHardware />
                </div>
            </Col>
        </Row>
    )
}

export default Hardware
