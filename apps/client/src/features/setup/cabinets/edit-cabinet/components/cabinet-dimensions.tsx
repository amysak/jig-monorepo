import { FormNumberInput } from "@jigbid/ui";
import { Card, Col, Row } from "antd";

export const CabinetDimensions = () => {
  return (
    <Card>
      <Row justify="space-around" style={{ textAlign: "right" }}>
        <Col>
          <FormNumberInput
            label="Height"
            name={["specifications", "dimensions", "height"]}
          />

          <FormNumberInput
            label="Elevation"
            name={["specifications", "dimensions", "elevation"]}
          />
        </Col>

        <Col>
          <FormNumberInput
            label="Depth"
            name={["specifications", "dimensions", "depth"]}
          />

          <FormNumberInput
            label="Toe kick height"
            name={["specifications", "dimensions", "toeKickHeight"]}
          />
        </Col>
      </Row>
    </Card>
  );
};
