import { Affix, Layout, Menu, MenuProps } from "antd";
import { AppDrawer } from "components/layout/sidebar";
import { isValidElement, ReactNode, useState } from "react";

import { useLocation } from "@tanstack/react-location";
import Toolbar from "components/toolbar";
import { capitalize } from "lodash-es";
import { LocationGenerics } from "router";
import headerLinks from "../header/links";
import "./uilayout.scss";

const { Content } = Layout;

interface MainLayoutProps {
  ToolbarContent?: null | JSX.Element;
  className?: string;
  fixedWidth?: boolean;
  children?: ReactNode;
}

export const UILayout = ({
  ToolbarContent,
  className,
  ...props
}: MainLayoutProps) => {
  const location = useLocation<LocationGenerics>();

  const [current, setCurrent] = useState(
    capitalize(location.current.pathname.replace(/\//g, ""))
  );

  const hasToolbar = isValidElement(ToolbarContent);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(capitalize(e.key));
  };

  return (
    <Layout className={`pagelayout ${className}`}>
      <AppDrawer />
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "transparent",
        }}
      >
        {/* <Affix className="apppageheader">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={headerLinks}
          />
        </Affix> */}
        {/* <Sticky topOffset={100}>
            {({ style, isSticky }) => {
              return (
                <header
                  style={{
                    zIndex: 1500,
                    width: "100%",
                    ...style,
                  }}
                  className={isSticky ? "animated slideInDown" : ""}
                >
                  <Header>
                    <AppHeader />
                  </Header>
                </header>
              );
            }}
          </Sticky> */}

        <div className="pagelayout__contentwrapper">
          {hasToolbar ? <Toolbar>{ToolbarContent}</Toolbar> : null}
          <Content
            className={`${
              hasToolbar ? "pagelayout__contenttoolbar" : "pagelayout__content"
            }`}
          >
            {props.children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

UILayout.defaultProps = {
  ToolbarContent: null,
  className: "",
  fixedWidth: false,
};

export default UILayout;
