import { FormDatePicker, FormInput, FormSelect } from "@jigbid/ui";
import { Card, Col, Form, Row, Space, Typography } from "antd";

import { JOB_STATUSES_OPTIONS } from "utilities/constants";

const { Text } = Typography;

export const JobFormHeader = () => {
  const form = Form.useFormInstance();

  return (
    <Space direction="vertical">
      <Card>
        <Row>
          <Col span={11}>
            <FormInput label="Job" name="name" />
          </Col>
          <Col offset={1} span={12}>
            <FormInput label="Subdivision" name="subdivision" />
          </Col>

          <Col span={11}>
            <FormDatePicker label="Estimated Date" name="estimateDate" />
          </Col>
          <Col offset={1} span={12}>
            <FormDatePicker label="Proposed Date" name="proposalDate" />
          </Col>
        </Row>
      </Card>

      <Card>
        <Row>
          <Col span={8}>
            <FormInput label="Lot Number" name="lotNumber" />
          </Col>

          <Col span={8} style={{ paddingLeft: "3px" }}>
            <FormSelect
              options={JOB_STATUSES_OPTIONS}
              label="Status"
              name="status"
            />
          </Col>
          <Col span={8}>
            <Form.Item>
              <Row justify="space-between" style={{ paddingLeft: "10px" }}>
                <Text>Job ID</Text>

                <Text>{form.getFieldValue("id")}</Text>
              </Row>
            </Form.Item>
          </Col>
          <Col span={24}>
            <FormInput
              textarea={{ style: { width: "100%" }, rows: 6 }}
              label="Description"
              name="description"
            />
          </Col>
        </Row>
      </Card>
    </Space>
  );
};
