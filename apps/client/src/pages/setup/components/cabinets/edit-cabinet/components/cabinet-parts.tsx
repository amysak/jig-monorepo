import { FormNumberInput } from "@jigbid/ui";
import { Card, Col, Row } from "antd";

export const CabinetParts = () => {
  return (
    <Card>
      <Row justify="space-around" style={{ textAlign: "right" }}>
        <Col>
          <FormNumberInput
            label="Doors count"
            name={["specifications", "partCounts", "doors"]}
          />

          <FormNumberInput
            label="Drawers count"
            name={["specifications", "partCounts", "drawers"]}
          />
        </Col>

        <Col>
          <FormNumberInput
            label="Drawer fronts count"
            name={["specifications", "partCounts", "drawerFronts"]}
          />

          <FormNumberInput
            label="Tray count"
            name={["specifications", "partCounts", "trays"]}
          />
        </Col>
      </Row>
    </Card>
  );
};
