import { FormCheckbox, FormNumberInput } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditTop = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <FormCheckbox
        label="Included"
        name={["specifications", "intrinsic", "top", "included"]}
      />

      <OneOrTwoSelect
        name={["specifications", "intrinsic", "top", "finishedSidesCount"]}
      />

      <FormNumberInput
        label="Depth difference"
        name={["specifications", "intrinsic", "top", "depthDifference"]}
      />
    </div>
  );
};
