import { createElement, FC, ReactNode, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { LayoutProps, MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import headerLinks from "../header/links";
import { sideLinks } from "../sidebar/links";

import "./sidebar.scss";

const { Header, Content, Footer, Sider } = Layout;

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps & LayoutProps> = ({
  children,
  ...props
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Layout {...props}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={headerLinks}
        />
      </Header>
      <Layout>
        <Sider
          className="sidepanel"
          collapsible
          collapsedWidth="50px"
          collapsed={isCollapsed}
          onCollapse={(value) => setIsCollapsed(value)}
          width={200}
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            theme="dark"
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={sideLinks}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
