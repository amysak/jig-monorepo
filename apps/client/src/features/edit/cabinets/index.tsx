import { Tabs } from "antd";

import { CabinetContextProvider } from "./hooks";
import { CabinetLayoutTab, CabinetMainTab } from "./tabs";

type CabinetEditProps = {
  id: number;
};

export const CabinetEdit = ({ id }: CabinetEditProps) => {
  return (
    <CabinetContextProvider cabinetId={id}>
      <Tabs
        defaultActiveKey="main"
        style={{ width: "100%" }}
        items={[
          {
            label: "Cabinet main",
            children: <CabinetMainTab />,
            key: "main",
          },
          {
            label: "Exterior Layout",
            children: <CabinetLayoutTab />,
            key: "layout",
          },
        ]}
      />
    </CabinetContextProvider>
  );
};
