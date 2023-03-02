import { OneOrTwoSelect } from "./one-or-two";

export const EditSides = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <OneOrTwoSelect label="Sides count" name={["partCounts", "sides"]} />

      <OneOrTwoSelect name={["interior", "back", "finishedSidesCount"]} />
    </div>
  );
};
