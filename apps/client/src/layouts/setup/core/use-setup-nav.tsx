import Icon, {
  AppstoreAddOutlined,
  BuildOutlined,
  DollarOutlined,
  FormatPainterOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { useState } from "react";
import { CABINET_OPENING_TYPE, CABINET_TYPE, PROFILE_TYPE } from "type-defs";

import CabinetIcon from "assets/images/setup/cabinet.svg";
import DoorIcon from "assets/images/setup/door.svg";
import { useSetSearch } from "hooks";
import { useMatches, useNavigate, useRouter, useSearch } from "hooks/router";

import { isDivider, isGroup, isStandardMenu, isSubMenu } from "./guards";
import { prepareAntdCollection } from "./prepare-antd-data";

type UseSetupNav = () => {
  setupNav: NonNullable<MenuProps["items"]>;
  openKeys: NonNullable<MenuProps["openKeys"]>;
  onOpenChange: NonNullable<MenuProps["onOpenChange"]>;
};

export const useSetupNav: UseSetupNav = () => {
  const search = useSearch();
  const router = useRouter();
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
        onClick: () => {
          setOpenKeys([item.key as string]);
          navigate({ to: `/setup/${item.key}` });
        },
      };
    }

    return {
      key: item.key,
      icon: item.icon,
      label: item.label,
      onTitleClick: () => {
        const onRoute = !!router.state.matches.find(
          (match) => match.route.path === item.key
        );

        return navigate({ to: onRoute ? "/setup" : `/setup/${item.key}` });
      },
      children: item.children.map((child) => {
        if (!child) return child;

        if (isStandardMenu(child)) {
          return {
            ...child,
            onClick: () => navigate({ to: `/setup/${item.key}/${child.key}` }),
          };
        }

        if (!isSubMenu(child)) return child;

        if (child.children) {
          return {
            ...child,
            children: child.children.map((nestedChild) => ({
              ...nestedChild,
              onClick: () =>
                setSearch({
                  setup: {
                    [child.key]:
                      search.setup?.[child.key] !== nestedChild?.key
                        ? nestedChild?.key
                        : null,
                  },
                }),
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
      children: [
        {
          key: "category",
          label: "Opening Category",
          type: "group",
          children: prepareAntdCollection(Object.values(CABINET_OPENING_TYPE)),
        },
      ],
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
    {
      key: "equipment",
      icon: <AppstoreAddOutlined />,
      label: "Equipment",
      children: [
        {
          key: "category",
          label: "Equipment Category",
          type: "group",
          // TODO: enum
          children: prepareAntdCollection([
            "trim",
            "molding",
            "accessory",
            "hardware",
            "misc",
          ]),
        },
      ],
    },
    {
      key: "extensions",
      icon: <PlusCircleOutlined />,
      label: "Extensions",
      children: prepareAntdCollection(["panels", "fillers", "toe-kicks"]),
    },
    {
      key: "materials",
      icon: <BuildOutlined />,
      label: "Materials",
    },
    {
      key: "finishes",
      icon: <FormatPainterOutlined />,
      label: "Finishes",
    },
    {
      key: "prices",
      icon: <DollarOutlined />,
      label: "Prices",
      // TODO: enum
      children: prepareAntdCollection(["markups", "terms", "upcharges"]),
    },
    {
      key: "sets",
      icon: <SettingOutlined />,
      label: "Sets",
      // TODO: enum
      children: prepareAntdCollection(["material-sets", "hardware-sets"]),
    },
    // { type: "divider" },
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
