import { OneOrTwoSelect } from "./one-or-two";

export const EditSides = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <OneOrTwoSelect
        label="Sides count"
        name={["specifications", "partCounts", "sides"]}
      />

      <OneOrTwoSelect
        name={["specifications", "intrinsic", "back", "finishedSidesCount"]}
      />
    </div>
  );
};
