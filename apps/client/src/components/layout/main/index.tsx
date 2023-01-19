import { PlusOutlined } from "@ant-design/icons";
import { Link, useLocation } from "@tanstack/react-location";
import { Button, Divider, Layout, Menu, Row, type LayoutProps } from "antd";
import { FC, ReactNode, useState } from "react";

import backgroundImage from "assets/images/banner/banner-bg.png?webp&imagetools";
import { Logo } from "../../icon";
import { headerLinks } from "../header/links";
import { sideLinks } from "../sidebar/links";

import "./style.scss";

const { Header, Content, Sider } = Layout;

type MainLayoutProps = {
  children?: ReactNode;
};

export const MainLayout: FC<MainLayoutProps & LayoutProps> = ({
  children,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const location = useLocation();
  const currentTabName = location.current.pathname.split("/")[1];

  console.log("backgroundImage => ", backgroundImage);

  return (
    <Layout {...props} className="pagelayout">
      <Header className="apppageheader" style={{ justifyContent: "flex-end" }}>
        <Menu
          defaultSelectedKeys={[currentTabName]}
          theme="dark"
          mode="horizontal"
          items={headerLinks}
        />
      </Header>
      <Layout>
        <Sider
          className="sidepanel"
          theme="dark"
          collapsible
          collapsedWidth="50px"
          collapsed={isCollapsed}
          onCollapse={(value) => setIsCollapsed(value)}
          width={200}
        >
          <Row className={`sidepanel__header`} justify="space-around">
            <Logo />

            <Link to="/start-bid">
              <Button
                shape="round"
                className="sidepanel__header-btn"
                icon={<PlusOutlined />}
              />
            </Link>
          </Row>

          <Divider className="x5" />

          <Menu
            mode="inline"
            theme="dark"
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={sideLinks}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
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
