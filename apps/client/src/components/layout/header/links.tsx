import {
  AppstoreOutlined,
  DeliveredProcedureOutlined,
  LayoutOutlined,
  ProfileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "@tanstack/react-location";
import { MenuProps } from "antd";

export const headerLinks: MenuProps["items"] = [
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
    key: "rooms",
    label: <Link to="/rooms">Rooms</Link>,
    icon: <LayoutOutlined />,
  },
  {
    key: "reports",
    label: <Link to="/reports">Reports</Link>,
    icon: <ProfileOutlined />,
  },
  {
    key: "account",
    label: <Link to="/account">Account</Link>,
    icon: <UserOutlined />,
    // classes: "icon account",
    children: [
      // { label: "Company", path: "company" },
      // { label: "Cabinets", path: "cabinets" },
      // { label: "Security", path: "security" },
      // { label: "Users", path: "users" },
      // { label: "Billing", path: "billing" },
      // { label: "Sign out", path: "signout" },
    ],
  },
];

export default headerLinks;
