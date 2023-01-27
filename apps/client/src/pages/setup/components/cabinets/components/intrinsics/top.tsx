import { FormCheckbox, FormNumberInput } from "@jigbid/ui";

export const EditCabinetTop = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <FormCheckbox
        label="Included"
        name={["specifications", "intrinsic", "top", "included"]}
      />

      <FormNumberInput
        label="Finished sides"
        name={["specifications", "intrinsic", "top", "finishedSidesCount"]}
      />

      <FormNumberInput
        label="Depth difference"
        name={["specifications", "intrinsic", "top", "depthDifference"]}
      />
    </div>
  );
};
