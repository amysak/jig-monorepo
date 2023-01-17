import React, { useContext } from 'react'
import { Table, Typography, Select, Row, Col, Radio, message } from 'antd'

import { shortId } from '../../../utilities/utils'
import { tableSelectStyle } from '../roomtabs/utils'
import { createMaterialTableData } from '../../../utilities'
import { MaterialContext } from '../../../store/materials'

const { Text, Title } = Typography

const tblParams = [
    {
        dataIndex: 'base_platform',
        key: 'base_platform',
        label: 'Unfinished',
    },
]

export default function BasePlatform({ onChange, interiorExteriorMaterials }) {
    const materialCtx = useContext(MaterialContext)
    const { material } = materialCtx

    const onBaseStyleChange = async (event: { target: { value: any } }) => {
        try {
            //@ts-ignore
            await materialCtx.update({ base_style: event.target.value })

            message.success('Success!')
        } catch (error) {
            message.error('Failed!')
            console.log(error)
        }
    }

    const columns = [
        {
            title: '',
            key: 'type',
            dataIndex: 'type',
        },
        {
            title: 'Base Platform Material',
            key: 'material',
            dataIndex: 'material',

            render(value, row) {
                return (
                    <Select
                        style={tableSelectStyle}
                        value={value}
                        onChange={(id) => onChange(id, row, 'material')}
                    >
                        {interiorExteriorMaterials.map(
                            (curr: { id: any; name: any }) => (
                                <Select.Option value={curr.id} key={shortId()}>
                                    {curr.name}
                                </Select.Option>
                            )
                        )}
                    </Select>
                )
            },
        },
    ]

    return (
        <>
            <Row align="bottom">
                {/*//@ts-ignore */}
                {material.base_style === 'separate base platform' ? (
                    <Col span={6}>
                        <Title level={4}>Base Platform</Title>

                        <Table
                            columns={columns}
                            dataSource={createMaterialTableData(
                                material,
                                tblParams,
                                'type'
                            )}
                            className="table-nopadding-cell"
                            pagination={false}
                            rowKey="tableRowKey"
                            bordered
                            size="small"
                        />
                    </Col>
                ) : (
                    <Col span={6} />
                )}
                <Col offset={1} flex="auto">
                    <Text>Base Style &nbsp;</Text>
                    <Radio.Group
                        //@ts-ignore
                        onChange={onBaseStyleChange}
                        //@ts-ignore
                        value={material.base_style}
                    >
                        <Radio value="standard">Standard</Radio>
                        <Radio value="adjustable legs">Adjustable Legs</Radio>
                        <Radio value="separate base platform">
                            Separate Base Platform
                        </Radio>
                    </Radio.Group>
                </Col>
            </Row>
        </>
    )
}
