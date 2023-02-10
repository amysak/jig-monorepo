import { useQuery } from "@tanstack/react-query";
import { Col, Divider, Form, Row } from "antd";
import { debounce } from "lodash-es";
import { Cabinet } from "type-defs";

import {
  CabinetDimensions,
  CabinetIntrinsics,
  CabinetMain,
  CabinetParts,
} from "features/setup";
import { api } from "lib/api";
import { useMutateCabinet } from "lib/hooks/queries";
import { queryClient } from "lib/query-client";

type CabinetEditProps = {
  id: number;
};

export const CabinetEdit = ({ id }: CabinetEditProps) => {
  const [form] = Form.useForm<Cabinet>();
  const setFormFields = (cabinet: Cabinet) => {
    form.setFieldsValue(cabinet);
  };

  const { data: cabinet, isLoading } = useQuery({
    queryKey: ["cabinets", id],
    queryFn: () => api.cabinets.getById(id),
    onSuccess: setFormFields,
  });

  const { mutate: mutateCabinet } = useMutateCabinet(id, {
    onSettled: () => {
      queryClient.invalidateQueries(["cabinets", id]);
    },
  });

  return (
    <Form
      form={form}
      initialValues={cabinet}
      onValuesChange={debounce((values) => mutateCabinet(values), 300)}
    >
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <CabinetMain />

          <Divider orientation="left">Cabinet dimensions</Divider>

          <CabinetDimensions />

          <Divider orientation="left">Cabinet parts</Divider>

          <CabinetParts />
        </Col>

        {/* Potentially needs different solution
            this is done because canvas renders before data is received
            and is not re-rendered when data is fetched */}
        <Col offset={1} flex="auto">
          {!isLoading && <CabinetIntrinsics />}
        </Col>
      </Row>
    </Form>
  );
};
