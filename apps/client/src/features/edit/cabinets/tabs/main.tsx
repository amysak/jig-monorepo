import { Col, Form, Row, Space } from "antd";
import { merge } from "lodash-es";

import { Cabinet } from "type-defs";
import { CabinetInterior, CabinetMain, CabinetOpenings } from "../components";
import { useCabinetState } from "../hooks";

export const CabinetMainTab = () => {
  const [form] = Form.useForm<Cabinet>();
  const { cabinetState } = useCabinetState();

  return (
    <Form
      form={form}
      initialValues={cabinetState.cabinet}
      onValuesChange={(values) => {
        cabinetState.cabinet = merge(cabinetState.cabinet, values);
      }}
    >
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          {/* Corner type should be specified if corner cabinet */}
          <Space direction="vertical" style={{ width: "100%" }}>
            <CabinetMain />
            <CabinetOpenings />
          </Space>
        </Col>

        <Col offset={1} flex="auto">
          <CabinetInterior />
        </Col>
      </Row>
    </Form>
  );
};
