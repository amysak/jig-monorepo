import { Layout, Menu, theme, type LayoutProps } from "antd";
import { FC, ReactNode } from "react";

import backgroundImage from "assets/images/banner/banner-bg.png";
import { Logo } from "components/logo";
import { useHeaderLinks } from "./links";

import "./style.scss";
import { useRouter } from "@tanstack/react-router";

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

  const headerLinks = useHeaderLinks();

  // TODO: probably wrong
  const router = useRouter();
  const currentTabName = router.state.currentLocation.pathname.split("/")[1];

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
          selectedKeys={[currentTabName]}
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
