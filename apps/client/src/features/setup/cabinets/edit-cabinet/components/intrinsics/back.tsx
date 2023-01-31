import { FormCheckbox, FormSelect } from "@jigbid/ui";
import { OneOrTwoSelect } from "./one-or-two";

export const EditBack = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <FormCheckbox
        label="Included"
        name={["specifications", "intrinsic", "back", "included"]}
      />

      <FormSelect
        label="Position"
        name={["specifications", "intrinsic", "back", "position"]}
        // TODO: consider creating enum obj in enums.ts
        options={[
          { label: "Behind nailer", value: "behind" },
          { label: "In front of nailer", value: "front" },
        ]}
      />

      <OneOrTwoSelect
        name={["specifications", "intrinsic", "back", "finishedSidesCount"]}
      />
    </div>
  );
};
