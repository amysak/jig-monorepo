import { FormNumberInput } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditNailer = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <OneOrTwoSelect
        name={["specifications", "intrinsic", "nailer", "finishedSidesCount"]}
      />

      <FormNumberInput
        label="Height"
        name={["specifications", "intrinsic", "nailer", "height"]}
      />
    </div>
  );
};
