import { PageSkeleton } from "@jigbid/ui";
import { useQuery } from "@tanstack/react-query";
import { Form, Tabs } from "antd";
import { debounce } from "lodash-es";
import { Cabinet } from "type-defs";

import { api } from "lib/api";
import { useMutateCabinet } from "lib/hooks/queries";
import { queryClient } from "lib/query-client";
import { CabinetLayoutTab, CabinetMainTab } from "./tabs";

type CabinetEditProps = {
  id: number;
};

export const CabinetEdit = ({ id }: CabinetEditProps) => {
  const [form] = Form.useForm<Cabinet>();

  return (
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
  );
};
