import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "@tanstack/react-location";
import { Button, Divider, Layout, Menu, Row } from "antd";
import { useState } from "react";

import { Logo } from "components/icon";

import "./styles.scss";
import { sideLinks } from "./links";

const { Sider } = Layout;

export const AppDrawer = () => {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);

  // TODO: switch to CSSinJS (styled-components, emotion, etc.)
  const linkTextStyle = { color: "white" };

  return (
    <Sider
      className="sidepanel"
      collapsible
      collapsedWidth="50px"
      collapsed={isCollapsed}
      onCollapse={(value) => setIsCollapsed(value)}
    >
      <Row className={`sidepanel__header`} justify="space-around">
        <Logo />

        <Button
          shape="round"
          className="sidepanel__header-btn"
          onClick={() => navigate({ to: "/start-bid" })}
          icon={<PlusOutlined />}
        />
      </Row>

      <Divider className="x5" />

      <Menu theme="dark" mode="inline" className="sidepanel__menu">
        {sideLinks.map((link, index) => (
          <Menu.SubMenu key={`${index}`} title={link.label} icon={link.icon}>
            {link.children.map((child: any) => (
              <Menu.Item key={child.label} style={linkTextStyle}>
                <Link to={`${link.key}/${child.key}`}>{child.label}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </Sider>
  );
};
