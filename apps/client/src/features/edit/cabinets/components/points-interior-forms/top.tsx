import { FormCheckbox, FormNumberInput } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditTop = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <FormCheckbox label="Included" name={["interior", "top", "included"]} />

      <OneOrTwoSelect name={["interior", "top", "finishedSidesCount"]} />

      <FormNumberInput
        label="Depth difference"
        name={["interior", "top", "depthDifference"]}
      />
    </div>
  );
};
