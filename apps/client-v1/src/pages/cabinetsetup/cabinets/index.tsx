import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Spin } from 'antd'

import UILayout from '../../../components/templates/uilayout'
import { CabinetContext } from '../../../store/cabinets'
import { capitalize } from '../../../utilities/utils'
import { PageHeader } from './components'
import Filler from './components/Filler'
import Panel from './components/Panel'
import ToeBoardSkin from './components/ToeBoardSkin'
import ToePlatform from './components/ToePlatform'
import MeasuredCabinet from './MeasuredCabinet'
import CabinetBasic from './___'

const isMeasured = (category: string) =>
    ['base', 'upper', 'tall', 'vanity'].includes(
        category?.toLowerCase()?.replace(/ +(?= )/g, '')
    )

const isPanel = (category: string) =>
    ['appliance panel', 'end panel', 'wainscot panel'].includes(
        category?.toLowerCase()?.replace(/ +(?= )/g, '')
    )

const isFiller = (category: string) =>
    ['filler'].includes(category?.toLowerCase()?.replace(/ +(?= )/g, ''))

const isToeBoardOrToeSkin = (category: string) =>
    ['toe board', 'toe skin'].includes(
        category?.toLowerCase()?.replace(/ +(?= )/g, '')
    )

const isPlatform = (category: string) =>
    ['toe platform'].includes(category?.toLowerCase()?.replace(/ +(?= )/g, ''))

export default function CabinetPage(props: JSX.IntrinsicAttributes) {
    const params = useParams<{ id?: string }>()
    const cabinetCtx = useContext(CabinetContext)

    const { cabinet } = cabinetCtx

    useEffect(() => {
        cabinetCtx.onGetCabinet(params.id)
    }, [])

    let Component = CabinetBasic

    if (isMeasured(cabinet.category)) {
        Component = MeasuredCabinet
    }

    if (isPanel(cabinet.category)) {
        Component = Panel
    }

    if (isFiller(cabinet.category)) {
        Component = Filler
    }

    if (isToeBoardOrToeSkin(cabinet.category)) {
        Component = ToeBoardSkin
    }

    if (isPlatform(cabinet.category)) {
        Component = ToePlatform
    }

    return (
        <UILayout
            ToolbarContent={
                <PageHeader
                    allowAlter
                    label={capitalize(cabinet?.name) ?? ''}
                    parent={{ path: '/cabinets', label: 'Cabinets' }}
                />
            }
        >
            {cabinet.id && cabinet.category ? (
                <Component {...props} />
            ) : (
                <Spin />
            )}
        </UILayout>
    )
}
