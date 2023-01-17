import { Divider, message, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

import { getDoorsDrawers } from '../../../../api/doors'
import { getSetupFinishes } from '../../../../api/finishes'
import { getSetupMaterials } from '../../../../api/materials'
import { MaterialContext } from '../../../../store/materials'
import BasePlatform from '../../material-interior-tables/BasePlatform'
import DrawerTrayBoxes from '../../material-interior-tables/DrawerTrayBoxes'
import FinishedExterior from '../../material-interior-tables/FinishedExterior'
import FinishedInterior from '../../material-interior-tables/FinishedInterior'
import ThicknessForm from '../../material-interior-tables/ThicknessForm'
import UnFinishedExterior from '../../material-interior-tables/UnFinishedExterior'
import UnifinisedMaterial from '../../material-interior-tables/UnfinishedInterior'

const { Title } = Typography

const initialState = {
    interiorExteriorMaterials: [],
    finishendMaterials: [],
    backMaterials: [],
    finishProcesses: [],
    paintColors: [],
    glazeColors: [],
    drawerBoxes: [],
    trays: [],
}

function InteriorTab() {
    const materialCtx = useContext(MaterialContext)
    const [entities, setEntities] = useState(initialState)
    const { material } = materialCtx

    const onChange = async (
        id,
        row: { key: string | number; id: any },
        columnKey
    ) => {
        try {
            const rest = material[row.key] ? material[row.key] : {}
            const payload = {
                [row.key]: {
                    ...rest,
                    id: row.id,
                    [columnKey]: id,
                },
            }

            await materialCtx.update(payload)

            message.success('Success!')
        } catch (error) {
            message.error('Failed!')
            console.log(error)

            throw new Error(error)
        }
    }

    const getData = async () => {
        try {
            const [
                interiorExteriorMaterials,
                finishendMaterials,
                backMaterials,
                finishProcesses,
                paintColors,
                glazeColors,
                drawerBoxes,
                trays,
            ] = await Promise.all([
                getSetupMaterials('?purpose=interior/exterior'),
                getSetupMaterials('?purpose=Finished End'),
                getSetupMaterials('?purpose=back'),
                getSetupFinishes('?category=Finish Process'),
                getSetupFinishes('?category=Paint Colors'),
                getSetupFinishes('?category=Glaze Colors'),
                getDoorsDrawers('?category=drawer box'),
                getDoorsDrawers('?category=tray'),
            ])

            setEntities({
                interiorExteriorMaterials: interiorExteriorMaterials[0],
                finishendMaterials: finishendMaterials[0],
                backMaterials: backMaterials[0],
                finishProcesses: finishProcesses[0],
                paintColors: paintColors[0],
                glazeColors: glazeColors[0],
                drawerBoxes: drawerBoxes[0],
                trays: trays[0],
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()

        return () => materialCtx.resetState()
    }, [])

    const propsData = {
        interiorExteriorMaterials: entities.interiorExteriorMaterials,
        finishendMaterials: entities.finishendMaterials,
        backMaterials: entities.backMaterials,
        finishProcesses: entities.finishProcesses,
        paintColors: entities.paintColors,
        glazeColors: entities.glazeColors,
        drawerBoxes: entities.drawerBoxes,
        trays: entities.trays,
        onChange,
        material,
    }

    return (
        <>
            <Title level={4}>Interior Parts</Title>

            <UnifinisedMaterial {...propsData} />

            <br />

            <UnFinishedExterior {...propsData} />

            <br />

            <FinishedInterior {...propsData} />

            <br />

            <FinishedExterior {...propsData} />

            <br />

            {/* @ts-expect-error TS(2559): Type '{ interiorExteriorMaterials: any[]; finishen... Remove this comment to see the full error message */}
            <ThicknessForm {...propsData} />

            <Divider />

            <DrawerTrayBoxes {...propsData} />

            <br />

            <BasePlatform {...propsData} />
        </>
    )
}

export default InteriorTab
