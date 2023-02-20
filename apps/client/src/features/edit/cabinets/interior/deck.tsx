import { FormCheckbox } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditDeck = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <FormCheckbox label="Included" name={["interior", "deck", "included"]} />

      <OneOrTwoSelect name={["interior", "deck", "finishedSidesCount"]} />

      {/* Cabinet depth */}

      <OneOrTwoSelect name={["interior", "deck", "difference"]} />
    </div>
  );
};
