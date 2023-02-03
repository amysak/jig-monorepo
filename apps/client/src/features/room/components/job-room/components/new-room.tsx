import { FormInput, FormNumberInput, FormSelect } from "@jigbid/ui";
import { Button, Form, Row, Typography } from "antd";

import { useMatch } from "hooks/router";
import { useCreateRoom } from "hooks/queries";

const { Title } = Typography;

const elevations = [
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "east", label: "East" },
  { value: "west", label: "West" },
  { value: "island", label: "Island" },
];

const layout = {
  wrapperCol: { span: 14 },
  labelCol: { span: 10 },
};

export function NewRoom() {
  const {
    params: { id },
  } = useMatch();

  const { mutate: createRoom } = useCreateRoom(id);

  return (
    <Form
      {...layout}
      onFinish={(values) => {
        createRoom(values);
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Add a Room
      </Title>

      <FormInput
        name="name"
        label="Room Name"
        rules={[{ required: true, message: "Please enter a Room name." }]}
      />

      <FormSelect
        name="elevation"
        label="Elevation"
        options={elevations}
        rules={[{ required: true, message: "Please select an elevation." }]}
      />

      <FormNumberInput label="Room Quantity" name="quantity" />

      {/* <FormNumberInput label="Sort Order" name="sort_order"/> */}

      <br />

      <Row justify="end">
        <Button size="small" className="jig-button" htmlType="submit">
          Add Room
        </Button>
      </Row>
    </Form>
  );
}
