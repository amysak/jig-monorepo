import { FormNumberInput } from "@jigbid/ui";
import { Card } from "antd";

// TODO: Probably will somehow change when type of cabinet is corner
export const CabinetDimensions = () => {
  return (
    <Card style={{ textAlign: "right" }}>
      <FormNumberInput
        label="Floor to top"
        name={["dimensions", "floorToTop"]}
      />
      <FormNumberInput
        label="Floor to bottom"
        name={["dimensions", "floorToBottom"]}
      />
      <FormNumberInput label="Depth" name={["dimensions", "depth"]} />
      <FormNumberInput label="Width" name={["dimensions", "width"]} />
    </Card>
  );
};
