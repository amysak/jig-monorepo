import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Divider, Input, Layout, Menu, Segmented } from "antd";
import { FC, ReactNode } from "react";

import { useMatches, useSearch } from "hooks/router";
import { SetupViews, toggleActions, useToggles } from "lib/store";

import { useSetupNav } from "./core";

import "./setup.scss";
import { useSetSearch } from "hooks";
import { debounce } from "lodash-es";

const { Sider, Content } = Layout;
const { Search } = Input;

type SetupLayoutProps = {
  children: ReactNode;
};

export const SetupLayout: FC<SetupLayoutProps> = ({ children }) => {
  const search = useSearch();
  const [setSearch] = useSetSearch();

  const toggles = useToggles();

  const { setupNav, openKeys, onOpenChange } = useSetupNav();

  const matches = useMatches();

  const [parent] = useAutoAnimate();

  return (
    <Layout
      style={{
        minHeight: 800,
      }}
      className="setup-layout pagelayout"
    >
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
          {matches.length > 1 && (
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
              defaultValue={search.setup?.search}
            />
          )}
        </div>
        <Menu
          selectedKeys={openKeys.concat(
            search.setup ? (Object.values(search.setup) as string[]) : []
          )}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          items={setupNav}
        />
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
};

export default SetupLayout;
