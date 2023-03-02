import { FormNumberInput } from "@jigbid/ui";
import { Card, Form } from "antd";
import { merge } from "lodash-es";

import { Cabinet } from "type-defs";
import { useCabinetState } from "../hooks";

// TODO: Probably will somehow change when type of cabinet is corner
export const CabinetDimensions = () => {
  const [form] = Form.useForm<Cabinet["dimensions"]>();

  const {
    cabinetState: { cabinet },
    snapshot: {
      cabinet: { baseType },
    },
  } = useCabinetState();

  return (
    <Card style={{ textAlign: "right" }}>
      <Form
        form={form}
        initialValues={cabinet.dimensions}
        onValuesChange={(dimensions) => {
          cabinet.dimensions = merge(cabinet.dimensions, dimensions);
        }}
      >
        <FormNumberInput label="Floor to top" name="floorToTop" />
        <FormNumberInput label="Floor to bottom" name="floorToBottom" />
        <FormNumberInput label="Depth" name="depth" />
        <FormNumberInput label="Width" name="width" />
        {(baseType === "standard" || baseType === "adjustable") && (
          <FormNumberInput label="Toe height" name="overridenToeHeight" />
        )}
      </Form>
    </Card>
  );
};
