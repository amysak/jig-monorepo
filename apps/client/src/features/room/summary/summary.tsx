import { blue } from "@ant-design/colors";
import { FormInput, PageSkeleton } from "@jigbid/ui";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Card, Col, Form, Row, Statistic } from "antd";
import { debounce } from "lodash-es";
import { Room } from "type-defs";

import { api } from "lib/api";
import { useMutateRoom } from "lib/hooks/queries";
import { roomRoute } from "pages/rooms";
import { RoomProgress } from "../components";
import { RoomMaterials } from "./materials";

export const RoomSummary = () => {
  const params = useParams({ from: roomRoute.id });

  const [form] = Form.useForm<Room>();

  const { data: room } = useQuery({
    queryKey: ["rooms", params.roomId],
    queryFn: () => api.rooms.getById(params.roomId),
    // Binding query result to form. This query is being fetched from $roomId route before-hand and can be
    // accessed here much faster.
    // onSuccess: form.setFieldsValue,
  });

  const { mutateAsync: mutateRoom } = useMutateRoom(form.getFieldValue("id"), {
    onSuccess: form.setFieldsValue,
  });

  if (!room) {
    return <PageSkeleton />;
  }

  return (
    <Row justify="space-between">
      <Col span={16}>
        <RoomMaterials />
      </Col>
      <Col span={6}>
        <Form
          form={form}
          initialValues={room}
          onValuesChange={debounce((values) => mutateRoom(values), 300)}
          name="room-form"
          layout="vertical"
        >
          <Card bordered={false}>
            <Statistic
              title="Room total price"
              value={room.totalPrice}
              precision={2}
              prefix="$"
              valueStyle={{ color: blue[4] }}
            />
          </Card>

          <FormInput name="name" label="Name" />

          <RoomProgress id={room.id} type="steps" status={room.status} />
        </Form>
      </Col>
    </Row>
  );
};
