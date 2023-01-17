import React from 'react'
import { Button, Checkbox, Form, Radio } from 'antd'

import { itemListingOptions } from '../utils'

export default function JobItemCost() {
    return (
        <Form layout="vertical">
            <Form.Item label="Select Reports to Include">
                <Checkbox>Job Information</Checkbox>
                <Checkbox>Job Cost Breakdown</Checkbox>
                <Checkbox>Detail Cost Markup</Checkbox>
            </Form.Item>

            <Form.Item label="Items Report">
                <Radio.Group onChange={() => null}>
                    <Radio.Button value="include all">Include All</Radio.Button>
                    <Radio.Button value="include none">
                        Include None
                    </Radio.Button>
                    <Radio.Button value="Include Stadard">
                        Include Standard
                    </Radio.Button>
                </Radio.Group>

                <br />
                <br />

                <Checkbox.Group
                    options={itemListingOptions}
                    defaultValue={['molding']}
                    onChange={() => null}
                />

                <br />
                <br />

                <Radio.Group onChange={() => null}>
                    <Radio value="all">All</Radio>
                    <Radio value="selected to show on reports">
                        Selected to Show on Reports
                    </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Select Format for Item Report">
                <Radio.Group>
                    <Radio value="item list">Item List</Radio>
                    <Radio value="purchase">Purchase</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Select Printing Options">
                <Radio.Group>
                    <Radio value="preview/print">Preview/Print</Radio>
                    <Radio value="preview/prompt for printing">
                        Preview/Prompt for printing
                    </Radio>
                    <Radio value="preview/do not print">
                        Preview/Do Not Print
                    </Radio>
                    <Radio value="no preview/print (fastest)">
                        No Preview/Print(fastest)
                    </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Show Print Dialog Box?">
                <Radio.Group>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item>
                <Button className="jig-button">Print Reports</Button>
            </Form.Item>
        </Form>
    )
}
