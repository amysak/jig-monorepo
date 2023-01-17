import { ApartmentOutlined, SettingOutlined } from "@ant-design/icons";
import { SubMenuType } from "antd/es/menu/hooks/useItems";

export const sideLinks: SubMenuType[] = [
  {
    label: "Cabinet Setup",
    key: "/cabinet-setup",
    icon: <SettingOutlined />,
    children: [
      { label: "Cabinets", key: "cabinets" },
      { label: "Door/Drawers", key: "door-drawers" },
      { label: "Door/Drawer Profiles", key: "door-drawer-profiles" },
      { label: "Accessories/Hardware", key: "accessories-hardwares" },
      { label: "Trim/Moldings", key: "trim-moldings" },
      { label: "Materials", key: "materials" },
      { label: "Finishes", key: "finishes" },
      { label: "Labor Rates", key: "labor-rates" },
    ],
  },
  {
    label: "Default Setup",
    key: "/default-setup",
    icon: <ApartmentOutlined />,
    children: [
      { label: "Terms", key: "terms" },
      { label: "Markups", key: "markups" },
      { label: "Materials", key: "materials" },
      { label: "Hardware", key: "hardwares" },
      { label: "Letters", key: "letters" },
      { label: "Cabinet Specifications", key: "cabinet-specifications" },
    ],
  },
];
