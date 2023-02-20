import { Alert, Col, Divider, Form, Row, Space } from "antd";
import { isEmpty } from "lodash-es";

import { Cabinet } from "type-defs";
import {
  CabinetDimensions,
  CabinetFaceFrame,
  CabinetLayout,
  CabinetParts,
  CabinetPreview,
} from "../components";

export const CabinetLayoutTab = () => {
  const form = Form.useFormInstance();
  const dimensions = form.getFieldValue([
    "dimensions",
  ]) as Cabinet["dimensions"];

  const content = !dimensions.floorToTop ? (
    <Alert
      message={`
        If you do not specify default height for this cabinet, you won't be able to 
        set default layout, because then scaling of parts for different cabinet heights
        will be impossible.
      `}
      type="error"
    />
  ) : (
    <Row>
      <Col span={12}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Divider orientation="left" orientationMargin={0}>
                Cabinet dimensions
              </Divider>
              <CabinetDimensions />
            </Col>

            <Col span={12}>
              <Divider orientation="left" orientationMargin={0}>
                Cabinet parts
              </Divider>
              <CabinetParts filter="exterior" />
            </Col>
          </Row>

          <CabinetLayout />

          {!isEmpty(form.getFieldValue("equipmentRows")) ? (
            <CabinetFaceFrame />
          ) : (
            <Alert
              type="error"
              message={`
                Unless you specify rows in the cabinet layout, 
                system will use it's default algorithm or prediction for calculating 
                face frame stile heights and rails widths.
              `}
            />
          )}
        </Space>
      </Col>
      <Col offset={1} span={10}>
        <Divider orientation="right" orientationMargin={0}>
          Cabinet layout preview
        </Divider>
        <CabinetPreview />
      </Col>

      <br />
    </Row>
  );

  return content;
};
