import { useNavigate, useSearch } from "@tanstack/react-router";
import { Tabs } from "antd";
import { ReactNode } from "react";

import { UserInfo, UserPreferences } from "features/user";
import { UILayout } from "layouts/ui";
import { useAuthorization } from "lib/hooks";
import { UserTab } from "lib/validation";
import { meRoute } from "./routes";

const panes: { key: UserTab; label: string; children: ReactNode }[] = [
  {
    label: "My Preferences",
    children: <UserPreferences />,
    key: "preferences",
  },
  {
    label: "Personal Info",
    children: <UserInfo />,
    key: "info",
  },
];

export default function MePage() {
  const { user } = useAuthorization();
  const { tabName } = useSearch({ from: meRoute.id });
  const navigate = useNavigate({ from: meRoute.id });

  return (
    <UILayout>
      <Tabs
        // onSelect={(info) => info.selectedKeys}
        defaultActiveKey={tabName}
        onChange={(key) =>
          navigate({ to: meRoute.id, search: { tabName: key as UserTab } })
        }
        items={panes}
      />
    </UILayout>
  );
}
