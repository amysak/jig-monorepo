import Icon, {
  AppstoreAddOutlined,
  BuildOutlined,
  DollarOutlined,
  FormatPainterOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import {
  Link,
  useNavigate,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { MenuProps } from "antd";
import { ReactNode, useState } from "react";
import { CABINET_OPENING_TYPE, CABINET_TYPES, PROFILE_TYPES } from "type-defs";

import CabinetIcon from "assets/images/setup/cabinet.svg";
import DoorIcon from "assets/images/setup/door.svg";
import { useSetSearch } from "lib/hooks";
import { setupRoute } from "pages/setup";

import { isDivider, isGroup, isStandardMenu, isSubMenu } from "./guards";
import { prepareAntdCollection } from "./prepare-antd-data";

type UseSetupNav = () => {
  setupNav: NonNullable<MenuProps["items"]>;
  openKeys: NonNullable<MenuProps["openKeys"]>;
};

export const useSetupNav: UseSetupNav = () => {
  const { latestLocation } = useRouter().state;

  const navigate = useNavigate({ from: setupRoute.id });
  const search = useSearch({ from: setupRoute.id });
  const [setSearch] = useSetSearch();

  const populateSubMenu = (item: NonNullable<MenuProps["items"]>[number]) => {
    if (!item || isDivider(item) || isGroup(item)) {
      return item;
    }

    // Standard menu means no sub menu
    if (isStandardMenu(item)) {
      return {
        ...item,
        label: (
          <Link from="/setup" to={item.key as any}>
            {item.label}
          </Link>
        ),
        onClick: () => setOpenKeys([item.key as string]),
      };
    }

    // Submenu
    return {
      ...item,
      onTitleClick: () => {
        const onRoute = latestLocation.pathname.includes(item.key);

        // TODO:
        navigate({ to: onRoute ? "/setup" : (item.key as any) });
        setOpenKeys(onRoute ? [] : [item.key]);
      },
      children: item.children.map((child) => {
        if (!child) return child;

        if (isStandardMenu(child)) {
          return {
            ...child,
            onClick: () => {
              const onRoute = latestLocation.pathname.includes(
                child.key as string
              );

              navigate({
                to: onRoute
                  ? (item.key as any)
                  : (`${item.key}/${child.key}` as any),
              });
              setOpenKeys(
                onRoute ? [item.key] : ([item.key, child.key] as string[])
              );
            },
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
                  [child.key]:
                    search[child.key] !== nestedChild?.key
                      ? nestedChild?.key
                      : null,
                }),
            })),
          };
        }

        return child;
      }),
    };
  };

  // Ant Design is unreal to use for type inferring
  type NavSetupItem = {
    key: string;
    label: string;
    icon?: ReactNode;
    onTitleClick?: (event: unknown) => void;
    children?: NavSetupItem[];
  } & ({ type: "divider"; key?: undefined } | { type?: string; key: string });

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
          children: prepareAntdCollection(CABINET_TYPES),
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
          children: prepareAntdCollection(CABINET_OPENING_TYPE),
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
          children: prepareAntdCollection(PROFILE_TYPES),
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
            "Trim",
            "Molding",
            "Accessory",
            // Done to avoid duplicating key
            "Hardware",
            "Misc",
            // Others are uppercase just for consistency
          ]),
        },
      ],
    },
    {
      key: "extensions",
      icon: <PlusCircleOutlined />,
      label: "Extensions",
      children: prepareAntdCollection(["panels", "fillers", "toes"]),
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
      children: prepareAntdCollection(["material", "hardware"]),
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

  // We put the key of the menu inside of the route path in cabinets page (for example)
  const getKeys = (links: NavSetupItem[]): string[] => {
    const keys = links.map((link) => {
      if (!link.children) return link.key;

      return [link.key, ...getKeys(link.children)];
    });

    return keys.flat().filter(Boolean);
  };

  const routeKeys = getKeys(originalLinks);
  const latestMatches = latestLocation?.pathname.split("/") || [];
  const [openKeys, setOpenKeys] = useState(
    latestMatches.filter((key) => routeKeys.includes(key))
  );

  return { setupNav: populatedNav, openKeys };
};
