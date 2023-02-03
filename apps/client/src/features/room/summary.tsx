import { FormInput, PageSkeleton } from "@jigbid/ui";
import { Card, Form, Typography } from "antd";
import { debounce, isEmpty } from "lodash-es";

import { useMutateRoom } from "hooks/queries";
import { useRoomStore } from "lib/store";

const { Title } = Typography;

export const RoomSummary = () => {
  const [form] = Form.useForm();

  const room = useRoomStore();

  const { mutateAsync: mutateRoom } = useMutateRoom(room.id);

  // If removing this => should populate the form manually
  if (isEmpty(room)) {
    return <PageSkeleton />;
  }

  return (
    <>
      <Card>
        <Title level={5}>Room total price: {room.totalPrice}</Title>
      </Card>

      <Form
        form={form}
        initialValues={room}
        onValuesChange={debounce((values) => mutateRoom(values), 300)}
        name="room-form"
        layout="vertical"
      >
        <FormInput name="name" label="Name" />
      </Form>
    </>
  );
};
