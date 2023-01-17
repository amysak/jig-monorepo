import { Button, Checkbox, Form, Radio } from 'antd'
import React from 'react'
import { reportIncludes } from '../utils'

export default function JobCost() {
    return (
        <Form layout="vertical">
            <Form.Item label="Choose Job Report Type">
                <Radio.Group>
                    <Radio value="detailed">Detailed</Radio>
                    <Radio value="summarized">Summarized</Radio>
                    <Radio value="categorized">Categorized</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Choose Job Report Type">
                <Checkbox.Group
                    options={reportIncludes}
                    onChange={() => null}
                />
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
