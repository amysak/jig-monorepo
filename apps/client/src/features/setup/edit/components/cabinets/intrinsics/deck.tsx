import { FormCheckbox } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditDeck = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <FormCheckbox
        label="Included"
        name={["specifications", "intrinsic", "deck", "included"]}
      />

      <OneOrTwoSelect
        name={["specifications", "intrinsic", "deck", "finishedSidesCount"]}
      />

      {/* Cabinet depth */}

      <OneOrTwoSelect
        name={["specifications", "intrinsic", "deck", "difference"]}
      />
    </div>
  );
};
