import { Col, Row, Skeleton } from "antd";

export const RoomSkeleton = () => {
  return (
    <>
      <Row justify="space-between">
        <Col span={12}>
          <Skeleton active paragraph={{ rows: 2 }} title={false} />
          <Skeleton active paragraph={{ rows: 2 }} title={false} />
          <Skeleton active paragraph={{ rows: 2 }} title={false} />
          <Skeleton active paragraph={{ rows: 2 }} title={false} />
        </Col>
        <Col span={6}>
          <Skeleton active paragraph={{ rows: 4 }} title={false} />
          <Skeleton active paragraph={{ rows: 1 }} title={false} />
          <Skeleton active paragraph={{ rows: 4 }} title={false} />
        </Col>
      </Row>
      <Skeleton active paragraph={{ rows: 12 }} />
    </>
  );
};
