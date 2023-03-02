import { FormNumberInput } from "@jigbid/ui";
import { Switch } from "antd";
import { useState } from "react";

import { OneOrTwoSelect } from "./one-or-two";

type ShelfType = "adjustable" | "fixed";

export const EditShelves = () => {
  const [shelfType, setShelfType] = useState<ShelfType>("adjustable");

  return (
    <>
      <Switch
        checkedChildren="Adjustable"
        unCheckedChildren="Fixed"
        defaultChecked
        onChange={(checked) => setShelfType(checked ? "adjustable" : "fixed")}
      />
      <div style={{ textAlign: "right" }}>
        <FormNumberInput
          label="Number of shelves"
          name={["interior", "shelves", shelfType, "quantity"]}
        />

        <OneOrTwoSelect
          name={["interior", "shelves", shelfType, "finishedSidesCount"]}
        />

        <FormNumberInput
          label="Depth difference"
          name={["interior", "shelves", shelfType, "depthDifference"]}
        />
      </div>
    </>
  );
};
