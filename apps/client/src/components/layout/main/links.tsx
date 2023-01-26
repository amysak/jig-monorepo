import {
  AppstoreOutlined,
  DeliveredProcedureOutlined,
  LayoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "@tanstack/react-location";
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
      label: <Link to="/clients">Clients</Link>,
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
    // TODO: put inside account?
    // {
    //   key: "reports",
    //   label: <Link to="/reports">Reports</Link>,
    //   icon: <ProfileOutlined />,
    // },
    {
      key: "account",
      label: (
        <Link to="/account">
          <Avatar
            style={{ color: colorLink, backgroundColor: colorBgContainer }}
            icon={<UserOutlined />}
          />
        </Link>
      ),
      // classes: "icon account",
      children: [
        {
          label: <Link to="/account">Account management</Link>,
          key: "management",
        },
        {
          label: <Link to="/reports">My reports</Link>,
          key: "reports",
        },
        {
          label: <Link>Sign out</Link>,
          key: "sign-out",
        },
        // { label: "Cabinets", path: "cabinets" },
        // { label: "Security", path: "security" },
        // { label: "Users", path: "users" },
        // { label: "Billing", path: "billing" },
        // { label: "Sign out", path: "signout" },
      ].map((item) => ({ ...item, style: { color: colorLink } })),
      // TODO: :hover
    },
  ];

  return headerLinks;
};
