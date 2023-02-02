import { FormNumberInput } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditBackStretcher = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <OneOrTwoSelect
        name={[
          "specifications",
          "intrinsic",
          "stretchers",
          "back",
          "finishedSidesCount",
        ]}
      />

      <FormNumberInput
        label="Depth"
        name={["specifications", "intrinsic", "stretchers", "back", "depth"]}
      />
    </div>
  );
};
