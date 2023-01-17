import React, { useContext, useEffect, useState } from 'react'

import { message } from 'antd'
import { getDoorsDrawers } from '../../../../api/doors'
import { getSetupFinishes } from '../../../../api/finishes'
import {
    getProfileEdges,
    getProfileFrames,
    getProfilePanels,
} from '../../../../api/profiles'
import { getDefaultTrims } from '../../../../api/trims'
import { MaterialContext } from '../../../../store/materials'
import MainExteriorMaterialTable from '../../material-exterior-tables/MainExteriorMaterialTable'
import MoldingExteriorMaterialTable from '../../material-exterior-tables/MoldingExteriorMaterialTable'

const initialData = []

function ExteriorTab() {
    const materialCtx = useContext(MaterialContext)

    const [doors, setDoors] = useState(initialData)

    const [panels, setPanels] = useState(initialData)

    const [edges, setEdges] = useState(initialData)

    const [frames, setFrames] = useState(initialData)

    const [finishProcesses, setFinishProcesses] = useState(initialData)

    const [paintColors, setPaintColors] = useState(initialData)

    const [glazeColors, setGlazeColors] = useState(initialData)

    const [crowns, setCrowns] = useState(initialData)

    const [lightRails, setLighRails] = useState(initialData)
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
            materialCtx.setLoading(true)

            const [
                doors,
                panels,
                edges,
                frames,
                finishProcesses,
                paintColors,
                glazeColors,
                crowns,
                lightRails,
            ] = await Promise.all([
                getDoorsDrawers(),
                getProfilePanels(),
                getProfileEdges(),
                getProfileFrames(),

                // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
                getSetupFinishes('?category=Finish Process', 'finishProcesses'),

                // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
                getSetupFinishes('?category=Paint Colors', 'paintColors'),

                // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
                getSetupFinishes('?category=Glaze Colors', 'glazeColors'),
                getDefaultTrims('?subclassification=Crown'),
                getDefaultTrims('?subclassification=Light Rail'),
            ])

            setDoors(doors[0])
            setPanels(panels[0])
            setEdges(edges[0])
            setFrames(frames[0])
            setFinishProcesses(finishProcesses[0])
            setPaintColors(paintColors[0])
            setGlazeColors(glazeColors[0])
            setCrowns(crowns[0])
            setLighRails(lightRails[0])
        } catch (error) {
            console.log(error)
        } finally {
            materialCtx.setLoading(false)
        }
    }

    useEffect(() => {
        getData()

        return () => materialCtx.resetState()
    }, [])

    const propsData = {
        doors,
        panels,
        edges,
        frames,
        finishProcesses,
        paintColors,
        glazeColors,
        crowns,
        lightRails,
        onChange,
    }

    return (
        <>
            <MainExteriorMaterialTable {...propsData} />

            <br />
            <br />

            <MoldingExteriorMaterialTable {...propsData} />
        </>
    )
}

export default ExteriorTab
