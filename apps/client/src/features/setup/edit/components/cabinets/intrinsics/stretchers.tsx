import { FormNumberInput } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditStretchers = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <FormNumberInput
        label="Top & front stretcher depth"
        name={["specifications", "intrinsic", "stretchers", "top", "depth"]}
      />

      <OneOrTwoSelect
        name={[
          "specifications",
          "intrinsic",
          "stretchers",
          "top",
          "finishedSidesCount",
        ]}
      />

      <FormNumberInput
        label="Stretcher below drawer depth"
        name={["specifications", "intrinsic", "stretchers", "bottom", "depth"]}
      />

      <OneOrTwoSelect
        name={[
          "specifications",
          "intrinsic",
          "stretchers",
          "bottom",
          "finishedSidesCount",
        ]}
      />
    </div>
  );
};
