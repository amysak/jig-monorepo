import { Col, Row } from "antd";
import { FC } from "react";
import { Clients } from "./Clients";
import { Jobs } from "./Jobs";
import { Revenue } from "./Revenue";

type DashboardLinesProps = any;

export const DashboardLines: FC<DashboardLinesProps> = () => {
  return (
    <Row gutter={[24, 10]} align="top" justify="space-between">
      <Col xs={24} md={24} xl={12}>
        <Clients />
      </Col>

      <Col xs={24} md={24} xl={12}>
        <Jobs />
      </Col>

      <Col xs={24} md={24} xxl={24}>
        <Revenue />
      </Col>
    </Row>
  );
};
