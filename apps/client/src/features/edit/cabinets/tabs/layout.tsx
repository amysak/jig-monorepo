import { Alert, Col, Divider, Row, Space } from "antd";
import { isEmpty } from "lodash-es";

import {
  CabinetDimensions,
  CabinetFaceFrame,
  CabinetLayout,
  CabinetCharacteristics,
  CabinetPreview,
} from "../components";
import { useCabinetState } from "../hooks";

export const CabinetLayoutTab = () => {
  // TODO: Could be moved to hook
  const {
    snapshot: {
      cabinet: {
        exterior: { equipmentRows },
      },
    },
  } = useCabinetState();

  return (
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
                Cabinet characteristics
              </Divider>
              <CabinetCharacteristics filter="exterior" />
            </Col>
          </Row>

          <CabinetLayout />

          {!isEmpty(equipmentRows) ? (
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
};
