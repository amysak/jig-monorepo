import React from 'react';
import { Row, Form, Select, Input, Button } from 'antd';

import { shortId } from '../../../../utilities/utils';
import { ACTIVE_INACTIVE_STATUSES_OPTIONS } from '../../../../utilities/constants';

const categories = [
  'Functional Accessories',
  'Counter Accessories',
  'Counter Tops',
  'Complexity Upcharge',
  'Surface Hardware',
  'Functional Hardware'
];
const layout = {
  wrapperCol: { span: 14 },
  labelCol: { span: 10 },
};

const inputStyle = {
  width: '100%'
}


export default function NewHardwareForm({ buttonLabel }) {
  return (
    <Row style={{ width: 300, minHeight: 400 }}>
      <Form {...layout} style={inputStyle}>
        <Form.Item label="Category">
          <Select style={inputStyle}>
            {categories.map((category) => (
              <Select.Option key={shortId()} value={category}>{category}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Classification">
          <Select style={inputStyle}>
            {categories.map((category) => (
              <Select.Option key={shortId()} value={category}>{category}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Name">
          <Input placeholder="Enter hardware name." style={inputStyle} />
        </Form.Item>

        <Form.Item label="Status">
          <Select style={inputStyle}>
            {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
              <Select.Option key={shortId()} value={status.value}>{status.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <br />
        <br />

        <Form.Item
          wrapperCol={{ span: 14, offset: 10 }}
        >
          <Button block className="jig-button">{buttonLabel}</Button>
        </Form.Item>
      </Form>
    </Row>
  );
}

NewHardwareForm.defaultProps = {
  buttonLabel: 'Add'
}

