import { FormNumberInput } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditBackStretcher = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <OneOrTwoSelect
        name={["interior", "stretchers", "back", "finishedSidesCount"]}
      />

      <FormNumberInput
        label="Depth"
        name={["interior", "stretchers", "back", "depth"]}
      />
    </div>
  );
};
