import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMatches, useSearch } from "@tanstack/react-router";
import { Divider, Input, Layout, Menu, Segmented } from "antd";
import { debounce } from "lodash-es";
import { FC, ReactNode } from "react";

import { useSetSearch } from "lib/hooks";
import { SetupViews, toggleActions, useToggles } from "lib/store";
import { setupRoute } from "pages/setup";

import { useSetupNav } from "./core";

import "./setup.scss";

const { Sider, Content } = Layout;
const { Search } = Input;

type SetupLayoutProps = {
  children: ReactNode;
};

export const SetupLayout: FC<SetupLayoutProps> = ({ children }) => {
  const matches = useMatches();
  const search = useSearch({ from: setupRoute.id });
  const [setSearch] = useSetSearch();

  const { setupNav, openKeys } = useSetupNav();
  const toggles = useToggles();

  const [parent] = useAutoAnimate();

  return (
    <Layout className="setup-layout pagelayout">
      <Sider width={256} className="setup-sider">
        <Segmented
          block
          options={[
            {
              label: "Table",
              value: "table",
              icon: <BarsOutlined />,
            },
            {
              label: "Card",
              value: "card",
              icon: <AppstoreOutlined />,
            },
          ]}
          onChange={(value) => toggleActions.setView(value as SetupViews)}
          value={toggles.setup.view}
          style={{ margin: "0 5px" }}
        />
        <Divider />
        <div ref={parent}>
          {matches.at(-1)?.id !== "/setup/" && (
            <Search
              className="setup-search"
              size="middle"
              placeholder="Search"
              allowClear
              style={{
                marginBottom: 20,
              }}
              onChange={debounce(
                (event) =>
                  setSearch({ setup: { search: event.target.value || null } }),
                300
              )}
              defaultValue={search.search}
            />
          )}
        </div>
        <Menu
          selectedKeys={openKeys.concat(
            [search.type, search.category].filter(Boolean) as string[]
          )}
          openKeys={openKeys}
          mode="inline"
          items={setupNav}
        />
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
};

export default SetupLayout;
