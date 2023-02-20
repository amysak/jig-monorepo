import { PageSkeleton } from "@jigbid/ui";
import { useQuery } from "@tanstack/react-query";
import { Col, Form, Row, Space } from "antd";
import { debounce } from "lodash-es";

import { api } from "lib/api";
import { useMutateCabinet } from "lib/hooks/queries";
import { queryClient } from "lib/query-client";
import { Cabinet } from "type-defs";
import { CabinetInterior, CabinetMain, CabinetOpenings } from "../components";

export const CabinetMainTab = () => {
  const [form] = Form.useForm<Cabinet>();

  const { data: cabinet, isLoading } = useQuery({
    queryKey: ["cabinets", id],
    queryFn: () => api.cabinets.getById(id),
    onSuccess: form.setFieldsValue,
  });

  const { mutate: mutateCabinet } = useMutateCabinet(id, {
    onSettled: () => {
      queryClient.invalidateQueries(["cabinets", id]);
    },
  });

  if (isLoading) {
    return <PageSkeleton />;
  }
  return (
    <Form
      form={form}
      initialValues={cabinet}
      onValuesChange={debounce((values) => mutateCabinet(values), 300)}
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
