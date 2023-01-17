import React from 'react'
import { Col, Row, Table, Typography, Button, Radio } from 'antd'

const { Title } = Typography

const tblProps = {
    pagination: false,
}

export default function Details() {
    const columns = [
        {
            title: 'Material',
            key: 'material',
            dataIndex: 'material',
        },
        {
            title: 'Cost Sq. Ft',
            key: 'cost',
            dataIndex: 'cost',
        },
        {
            title: 'Sq. Ft. Cab.',
            key: 'material',
            dataIndex: 'material',
        },
        {
            title: 'Cost/Cab',
            key: 'material',
            dataIndex: 'material',
        },
        {
            title: 'Cab/Qty',
            key: 'material',
            dataIndex: 'material',
        },
        {
            title: 'Total Cost',
            key: 'material',
            dataIndex: 'material',
        },
        {
            title: 'Cost/Cab',
            key: 'material',
            dataIndex: 'material',
        },
    ]

    const cabCols = [
        {
            title: '',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: '',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Cost/Cab',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Cab/Qty',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Total Costs',
            key: 'title',
            dataIndex: 'title',
        },
    ]

    const labourCostCols = [
        {
            title: '',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Qty',
            key: 'quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Labor Rate',
            key: 'labor_rate',
            dataIndex: 'labor_rate',
        },
        {
            title: 'Total Labor',
            key: 'total_labor',
            dataIndex: 'total_labor',
        },
    ]

    const finishChargeCols = [
        {
            title: '',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Qty/Cab',
            key: 'quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Parts Qty',
            key: 'parts_qty',
            dataIndex: 'parts_qty',
        },
        {
            title: 'Finish Chg/Part',
            key: 'finish_chg_part',
            dataIndex: 'finish_chg_part',
        },
        {
            title: 'Finish Charge',
            key: 'finish_charge',
            dataIndex: 'finish_charge',
        },
    ]

    const inhouseLaborCostCols = [
        {
            title: '',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Qty/Sq Ft.',
            key: 'qty_square_ft',
            dataIndex: 'qty_square_ft',
        },
        {
            title: 'Sq. Ft/Part',
            key: 'parts_qty',
            dataIndex: 'parts_qty',
        },
        {
            title: 'Cost/Cabinet',
            key: 'finish_chg_part',
            dataIndex: 'finish_chg_part',
        },
        {
            title: 'Qty',
            key: 'finish_chg_part',
            dataIndex: 'finish_chg_part',
        },
        {
            title: 'Finish Cost',
            key: 'finish_charge',
            dataIndex: 'finish_charge',
        },
    ]

    const totalCostCol = [
        {
            title: 'Total Cost',
            key: 'total',
            dataIndex: 'total',
        },
        {
            title: 'With Markup',
            key: 'markup',
            dataIndex: 'markup',
        },
        {
            title: 'Sales Tax',
            key: 'sales',
            dataIndex: 'sales',
        },
        {
            title: 'With Tax',
            key: 'tax',
            dataIndex: 'tax',
        },
        {
            title: 'With Discount Reciprocal',
            key: 'discount',
            dataIndex: 'discount',
        },
    ]

    return (
        <Row>
            <Col span={12}>
                <Table columns={cabCols} />

                <Table columns={columns} />

                <Table columns={labourCostCols} />

                <Table columns={finishChargeCols} />

                <Table columns={inhouseLaborCostCols} />
            </Col>

            <Col span={12}>
                <Row className="padded-content-left">
                    <Col span={24}>
                        Finished Interior{' '}
                        <Radio.Group>
                            <Radio value="finished">F</Radio>
                            <Radio value="unfinished">U</Radio>
                        </Radio.Group>
                    </Col>
                    <Col span={24}>Category: Face Frame</Col>
                    <Col span={24}>Cabinet: Type</Col>
                    <Col span={24}>Style: Upper</Col>

                    <br />
                    <br />

                    <Button>Per Items Markup</Button>
                </Row>



                {/* @ts-expect-error TS(2326): Types of property 'pagination' are incompatible. */}
                <Table
                    columns={totalCostCol}
                    dataSource={[
                        {
                            total: 'Material Cost',
                            markup: '$4.66',
                            sales: '$4.66',
                            tax: '$4.66',
                            discount: '$4.66',
                        },
                        {
                            total: 'Shop Labor Cost',
                            markup: '$4.66',
                            sales: '$4.66',
                            tax: '$4.66',
                            discount: '$4.66',
                        },
                        {
                            total: 'Installation Labor',
                            markup: '$4.66',
                            sales: '$4.66',
                            tax: '$4.66',
                            discount: '$4.66',
                        },
                        {
                            total: 'Total Cabinet Cost',
                            markup: '$4.66',
                            sales: '$4.66',
                            tax: '$4.66',
                            discount: '$4.66',
                        },
                    ]}
                    className="padded-content-left"
                    style={{ marginTop: '10px' }}
                    {...tblProps}
                />

                <Row
                    className="padded-content-left"
                    style={{ marginTop: '10px' }}
                >
                    <Col span={24}>
                        <Title level={4}>Installation Labor Cost</Title>
                    </Col>

                    <Col span={24}>
                        <Button>Additional Cost</Button>
                    </Col>

                    <Col span={24}>


                        {/* @ts-expect-error TS(2326): Types of property 'pagination' are incompatible. */}
                        <Table
                            columns={[
                                {
                                    title: '',
                                    key: 'title',
                                    dataIndex: 'title',
                                },
                                {
                                    title: 'Instl. Rate',
                                    key: 'rate',
                                    dataIndex: 'rate',
                                },
                                {
                                    title: 'Qty',
                                    key: 'quantity',
                                    dataIndex: 'quantity',
                                },
                                {
                                    title: 'Total Labor',
                                    key: 'total',
                                    dataIndex: 'total',
                                },
                            ]}
                            dataSource={[
                                {
                                    title: 'Installation Labor',
                                    qty: 3,
                                    rate: 40,
                                    total: 10,
                                },
                                {
                                    title: 'Additional Instl. Labor',
                                    qty: 3,
                                    rate: 40,
                                    total: 10,
                                },
                            ]}
                            {...tblProps}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
