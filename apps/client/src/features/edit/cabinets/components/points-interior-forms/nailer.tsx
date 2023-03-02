import { FormNumberInput } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditNailer = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <OneOrTwoSelect name={["interior", "nailer", "finishedSidesCount"]} />

      <FormNumberInput label="Height" name={["interior", "nailer", "height"]} />
    </div>
  );
};
