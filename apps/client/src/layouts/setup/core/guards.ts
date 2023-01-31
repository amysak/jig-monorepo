import {
  MenuDividerType,
  MenuItemGroupType,
  MenuItemType,
  SubMenuType,
} from "antd/es/menu/hooks/useItems";

export const isStandardMenu = (item: any): item is MenuItemType => {
  return !item.children && item.label;
};

export const isSubMenu = (item: any): item is SubMenuType => {
  return !!item.children?.length;
};

export const isGroup = (item: any): item is MenuItemGroupType => {
  return item?.type === "group";
};

export const isDivider = (item: any): item is MenuDividerType => {
  return item?.type === "divider";
};
