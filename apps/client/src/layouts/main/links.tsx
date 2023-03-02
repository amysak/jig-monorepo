import {
  AppstoreOutlined,
  DeliveredProcedureOutlined,
  LayoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Avatar, MenuProps, theme } from "antd";

export const useHeaderLinks = () => {
  const {
    token: { colorLink, colorBgContainer },
  } = theme.useToken();

  const headerLinks: MenuProps["items"] = [
    {
      key: "dashboard",
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <AppstoreOutlined />,
    },
    {
      key: "clients",
      label: <Link>Clients</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: "jobs",
      label: <Link to="/jobs">Jobs</Link>,
      icon: <DeliveredProcedureOutlined />,
    },
    {
      key: "setup",
      label: <Link to="/setup">Setup</Link>,
      icon: <LayoutOutlined />,
    },
    {
      key: "account",
      label: (
        <Link>
          <Avatar
            style={{ color: colorLink, backgroundColor: colorBgContainer }}
            icon={<UserOutlined />}
          />
        </Link>
      ),
      children: [
        {
          key: "bid",
          label: <Link to="/new">Bid client</Link>,
        },
        {
          key: "me",
          label: (
            <Link to="/me" search={{ tabName: "preferences" }}>
              Account management
            </Link>
          ),
        },
        // {
        //   key: "reports",
        //   label: <Link>My reports</Link>,
        // },
        // {
        //   key: "sign-out",
        //   label: <Link>Sign out</Link>,
        // },
        // { label: "Cabinets", path: "cabinets" },
        // { label: "Security", path: "security" },
        // { label: "Users", path: "users" },
        // { label: "Billing", path: "billing" },
        // { label: "Sign out", path: "signout" },
      ],
      // TODO: :hover
    },
  ];

  return headerLinks;
};
