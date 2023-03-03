import { Layout, Menu, type LayoutProps } from "antd";
import { FC, ReactNode } from "react";

import backgroundImage from "assets/images/banner/banner-bg.png";
import { Logo } from "components/logo";
import { useHeaderLinks } from "./links";

import { Navigate, useRouter } from "@tanstack/react-router";
import { useAuthorization } from "lib/hooks";
import "./style.scss";

const { Header, Content } = Layout;

type MainLayoutProps = {
  children?: ReactNode;
};

export const MainLayout: FC<MainLayoutProps & LayoutProps> = ({
  children,
  ...props
}) => {
  const headerLinks = useHeaderLinks();

  // TODO: probably wrong
  const router = useRouter();
  const currentTabName = router.state.currentLocation.pathname.split("/")[1];

  // we're in suspend mode
  const { isAuthenticated } = useAuthorization();
  // TODO: 401 page
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

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
