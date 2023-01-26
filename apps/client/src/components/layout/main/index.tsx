import { useLocation } from "@tanstack/react-location";
import { Layout, Menu, theme, type LayoutProps } from "antd";
import { FC, ReactNode } from "react";

import backgroundImage from "assets/images/banner/banner-bg.png?webp&imagetools";
import { Logo } from "../../icon";
import { headerLinks } from "./links";

import "./style.scss";

const { Header, Content } = Layout;

type MainLayoutProps = {
  children?: ReactNode;
};

export const MainLayout: FC<MainLayoutProps & LayoutProps> = ({
  children,
  ...props
}) => {
  const {
    token: { colorLink },
  } = theme.useToken();

  // TODO: probably wrong
  const location = useLocation();
  const currentTabName = location.current.pathname.split("/")[1];

  return (
    <Layout
      {...props}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="main-layout"
    >
      <Header className="app-header">
        <Logo />

        <Menu
          defaultSelectedKeys={[currentTabName]}
          theme="dark"
          mode="horizontal"
          items={headerLinks}
          disabledOverflow={true}
          style={{ color: colorLink }}
        />
      </Header>
      <Content
        className="pagelayout"
        style={{
          padding: "24px 48px 48px",
          margin: 0,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
