import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Outlet, useSearch } from "@tanstack/react-location";
import { Divider, Input, Layout, Menu, Segmented, theme } from "antd";
import { FC } from "react";

import { LocationGenerics } from "router";
import { SetupViews, toggleActions, useToggles } from "store";

import { useSetupNav } from "./core";

import "./cabinet-setup.scss";

const { Sider, Content } = Layout;
const { Search } = Input;

// TODO: do we need this component?
export const SetupHome: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const search = useSearch<LocationGenerics>();

  const { view } = useToggles();

  const { setupNav, openKeys, onOpenChange } = useSetupNav();

  return (
    <Layout
      style={{
        minHeight: 800,
      }}
      className="setup-layout"
    >
      <Sider
        style={{ background: colorBgContainer, marginRight: 10 }}
        width={256}
      >
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
          value={view}
          style={{ margin: "0 5px" }}
        />
        <Divider />
        <Search
          size="middle"
          placeholder="Search"
          allowClear
          style={{ marginBottom: 10 }}
          // onSearch={onSearch}
        />
        <Menu
          selectedKeys={
            search.setup ? (Object.values(search.setup) as string[]) : []
          }
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          items={setupNav}
        />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default SetupHome;
