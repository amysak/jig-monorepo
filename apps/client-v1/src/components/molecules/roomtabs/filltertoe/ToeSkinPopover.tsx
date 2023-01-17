import React from 'react';
import faker from 'faker';

import { Row, Col, Table, Checkbox, Typography, Input, Button } from 'antd';
import { shortId } from '../../../../utilities/utils';

const { Title, Text } = Typography;

const columns = [
  {
    title: 'Toe Skin Name',
    key: 'name',
    dataIndex: 'name',
    width: 300,
  },
  {
    title: 'Toe Kick height',
    key: 'height',
    dataIndex: 'height',
  },
  {
    title: 'Toe Width',
    key: 'width',
    dataIndex: 'width',
  },
  {
    title: 'Favourite',
    key: 'favourite',
    dataIndex: 'favourite',
    render() {
      return (
        <Checkbox />
      )
    }
  },
];



const data = Array.from(Array(5)).map(() => ({
  id: shortId(),
  name: faker.commerce.department(),
}));

export default function ToeSkinPopover() {
  return (
    <Row style={{ width: 500, overflow: 'auto' }}>
      <Col span={24}>
        <Title level={4} style={{ textAlign: 'center' }}>Add a Toe Skin</Title>
      </Col>

      <Col span={6}>
        <Text strong>1. Search by name</Text>
      </Col>
      <Col span={18}>
        <Input.Search placeholder="search by name" />
      </Col>

      <Col span={12}>
        <Text strong>2. Choose a Toe Skin from the list below</Text>
      </Col>

      <Col>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          size="small"
          bordered
          rowKey="id"
        />
      </Col>

      <Col span={24}>
        <br />
        <br />
        <Button className="jig-button" block>Add Toe Skin</Button>
      </Col>
    </Row>
  );
}
