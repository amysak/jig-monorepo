import Icon, { AppstoreOutlined, SwapOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { isNil } from "lodash-es";
import { useState } from "react";
import { CABINET_OPENING_TYPE, CABINET_TYPE, PROFILE_TYPE } from "type-defs";

import { useSetSearch } from "hooks";
import {
  useMatches,
  useMatchRoute,
  useNavigate,
  useSearch,
} from "hooks/router";
import CabinetIcon from "assets/images/setup/cabinet.svg";
import DoorIcon from "assets/images/setup/door.svg";

import { isDivider, isGroup, isStandardMenu, isSubMenu } from "./guards";
import { prepareAntdCollection } from "./prepare-antd-data";

type UseSetupNav = () => {
  setupNav: NonNullable<MenuProps["items"]>;
  openKeys: NonNullable<MenuProps["openKeys"]>;
  onOpenChange: NonNullable<MenuProps["onOpenChange"]>;
};

export const useSetupNav: UseSetupNav = () => {
  const search = useSearch();
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();

  const [setSearch] = useSetSearch();

  const populateSubMenu = (item: NonNullable<MenuProps["items"]>[number]) => {
    if (!item) {
      return item;
    }

    if (isDivider(item)) {
      return item;
    }

    if (isGroup(item)) {
      return item;
    }

    if (isStandardMenu(item)) {
      return {
        ...item,
      };
    }

    return {
      key: item.key,
      icon: item.icon,
      label: item.label,
      onTitleClick: () => {
        const route = matchRoute({ to: item.key });
        const outletUrl = `/setup/${item.key}`;

        return navigate({ to: !isNil(route) ? "/setup" : outletUrl });
      },
      children: item.children.map((child) => {
        if (!child) return child;

        if (isStandardMenu(child)) {
          return {
            ...child,
            onClick: () => {
              setSearch({
                setup: {
                  category:
                    search.setup?.category !== child.key
                      ? (child.key as string)
                      : null,
                },
              });
            },
          };
        }

        if (!isSubMenu(child)) return child;

        if (child.children) {
          return {
            ...child,
            children: child.children.map((nestedChild) => ({
              ...nestedChild,
              onClick: () => {
                setSearch({
                  setup: {
                    [child.key]:
                      search.setup?.[child.key] !== nestedChild?.key
                        ? nestedChild?.key
                        : null,
                  },
                });
              },
            })),
          };
        }

        return child;
      }),
    };
  };

  // TODO:
  type NavSetupItem = NonNullable<MenuProps["items"]>[number] &
    ({ type: "divider"; key?: undefined } | { type?: undefined; key: string });

  // Has to be strict
  const originalLinks: NavSetupItem[] = [
    {
      key: "cabinets",
      icon: <Icon component={CabinetIcon} />,
      label: "Cabinets",
      onTitleClick: (e) => {
        console.log("e => ", e);
      },
      children: [
        {
          key: "type",
          label: "Cabinet Type",
          type: "group",
          children: prepareAntdCollection(Object.values(CABINET_TYPE)),
        },
      ],
    },
    {
      key: "openings",
      icon: <Icon component={DoorIcon} />,
      label: "Cabinet Openings",
      children: prepareAntdCollection(Object.values(CABINET_OPENING_TYPE)),
    },
    {
      key: "profiles",
      icon: <SwapOutlined />,
      label: "Profiles",
      children: [
        {
          key: "type",
          label: "Profile Type",
          type: "group",
          children: prepareAntdCollection(Object.values(PROFILE_TYPE)),
        },
      ],
    },
    { type: "divider" },
    // {
    //   key: "toes",
    //   icon: <AppstoreOutlined />,
    //   label: "Toes",
    //   children: [
    //     {
    //       key: "doors",
    //       label: "Doors",
    //     },
    //     {
    //       key: "drawers",
    //       label: "Drawers",
    //     },
    //     {
    //       key: "fronts",
    //       label: "Drawer Fronts",
    //     },
    //   ],
    //   // type: ,
    // },
  ];

  const populatedNav = originalLinks.map(populateSubMenu);

  const matches = useMatches();

  // We put the key of the menu inside of the route path in cabinets page (for example)
  const routeKeys = originalLinks.map((link) => link?.key);

  const latestMatchRouteName = matches.find((match) =>
    routeKeys.includes(match.route.path)
  )?.route.path;

  const [openKeys, setOpenKeys] = useState(
    latestMatchRouteName ? [latestMatchRouteName] : []
  );

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const rootSubmenuKeys = populatedNav.map((item) => item?.key);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return { setupNav: populatedNav, openKeys, onOpenChange };
};
