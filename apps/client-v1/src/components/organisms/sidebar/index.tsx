import {
  ApartmentOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Divider, Layout, Menu, Row } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../atoms/logo";
import "./styles.scss";

const { Sider } = Layout;

const links = [
  {
    text: "Cabinet Setup",
    path: "/cabinet-setup",
    Icon: SettingOutlined,
    children: [
      { text: "Cabinets", path: "cabinets" },
      { text: "Door/Drawers", path: "door-drawers" },
      { text: "Door/Drawer Profiles", path: "door-drawer-profiles" },
      { text: "Accessories/Hardware", path: "accessories-hardwares" },
      { text: "Trim/Moldings", path: "trim-moldings" },
      { text: "Materials", path: "materials" },
      { text: "Finishes", path: "finishes" },
      { text: "Labor Rates", path: "labor-rates" },
    ],
  },
  {
    text: "Default Setup",
    path: "/default-setup",
    Icon: ApartmentOutlined,
    children: [
      { text: "Terms", path: "terms" },
      { text: "Markups", path: "markups" },
      { text: "Materials", path: "materials" },
      { text: "Hardware", path: "hardwares" },
      { text: "Letters", path: "letters" },
      { text: "Cabinet Specifications", path: "cabinet-specifications" },
    ],
  },
];

export default function AppDrawer() {
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
          onClick={() => navigate("/start-bid")}
          icon={<PlusOutlined />}
        />
      </Row>

      <Divider className="x5" />

      <Menu theme="dark" mode="inline" className="sidepanel__menu">
        {links.map((link, index) => (
          <Menu.SubMenu key={`${index}`} title={link.text} icon={<link.Icon />}>
            {link.children.map((child) => (
              <Menu.Item key={child.text} style={linkTextStyle}>
                <Link to={`${link.path}/${child.path}`}>{child.text}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </Sider>
  );
}
