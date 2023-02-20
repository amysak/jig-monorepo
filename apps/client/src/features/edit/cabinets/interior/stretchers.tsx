import { FormNumberInput } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditStretchers = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <FormNumberInput
        label="Top & front stretcher depth"
        name={["interior", "stretchers", "top", "depth"]}
      />

      <OneOrTwoSelect
        name={["interior", "stretchers", "top", "finishedSidesCount"]}
      />

      <FormNumberInput
        label="Stretcher below drawer depth"
        name={["interior", "stretchers", "bottom", "depth"]}
      />

      <OneOrTwoSelect
        name={["interior", "stretchers", "bottom", "finishedSidesCount"]}
      />
    </div>
  );
};
