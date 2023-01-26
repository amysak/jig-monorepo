import {
  CopyOutlined,
  DeleteOutlined,
  StarOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import { Link, useSearch } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { capitalize } from "lodash-es";

import { useCabinetDeletion, useCabinetMutation } from "hooks/queries";
import { LocationGenerics } from "router";
import { Cabinet, CabinetSpecifications, CabinetType } from "type-defs";

export const useCabinetColumns = () => {
  const search = useSearch<LocationGenerics>();

  const queryClient = useQueryClient();

  const { mutateAsync: mutateCabinetAsync } = useCabinetMutation();
  const { mutateAsync: deleteCabinetAsync } = useCabinetDeletion();

  const columns: ColumnsType<Cabinet> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "25%",
      render(cabinetName: string, row: { id: number }) {
        return <Link to={`/setup/cabinets/${row.id}`}>{cabinetName}</Link>;
      },
    },
    {
      key: "favourite",
      dataIndex: "favourite",
      title: <StarTwoTone />,
      render(favourite: boolean, row) {
        const handleClick = async () => {
          await mutateCabinetAsync({
            id: row.id,
            values: {
              favourite: !favourite,
            },
          });
          await queryClient.invalidateQueries(["cabinets", search]);
        };

        if (favourite) {
          return <StarTwoTone twoToneColor="#00a6fb" onClick={handleClick} />;
        }

        return <StarOutlined onClick={handleClick} />;
      },
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      // filters: Object.values(CABINET_TYPE).map((type) => ({
      //   text: capitalize(type),
      //   value: type,
      // })),
      filteredValue: search.filters?.type,
      render: (type: CabinetType) => <Tag className="type-tag">{type}</Tag>,
    },
    {
      key: "style",
      dataIndex: "specifications",
      title: "Style",
      render: (specifications: CabinetSpecifications) =>
        specifications.isFramed ? "Face Frame" : "Full Access",
    },
    {
      key: "baseType",
      dataIndex: "specifications",
      title: "Base Type",
      render: (specifications: CabinetSpecifications) =>
        capitalize(specifications.baseType),
    },
    {
      key: "placement",
      dataIndex: "specifications",
      title: "Placement",
      render: (specifications: CabinetSpecifications) =>
        capitalize(specifications.placement),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => (
        <Space size="middle">
          <DeleteOutlined
            className="actions-icon"
            onClick={async () => {
              await deleteCabinetAsync(row.id);
              await queryClient.invalidateQueries(["cabinets", search]);
            }}
          />
          <CopyOutlined
            className="actions-icon"
            onClick={() => {
              // const { id: _, ...rest } = row;
              // TODO use creation hook
              // api.cabinets.create(rest);
            }}
          />
        </Space>
      ),
    },
  ];

  const specificationsColumns: ColumnsType<CabinetSpecifications> = [
    {
      key: "dimensions",
      title: "Cabinet Dimensions",
      children: [
        {
          dataIndex: "dimensions",
          title: "Height",
          render: (dimensions: CabinetSpecifications["dimensions"]) =>
            dimensions.height,
        },
        {
          key: "depth",
          dataIndex: "dimensions",
          title: "Depth",
          render: (dimensions: CabinetSpecifications["dimensions"]) =>
            dimensions.depth,
        },
        {
          key: "elevation",
          dataIndex: "dimensions",
          title: "Elevation",
          render: (dimensions: CabinetSpecifications["dimensions"]) =>
            dimensions.elevation,
        },
        {
          key: "toeKickHeight",
          dataIndex: "dimensions",
          title: "Toe Kick Height",
          render: (dimensions: CabinetSpecifications["dimensions"]) =>
            dimensions.toeKickHeight,
        },
      ],
    },
    {
      title: "Required Parts",
      children: [
        {
          key: "doorCount",
          dataIndex: "partCounts",
          title: "Door Count",
          render: (partCounts: CabinetSpecifications["partCounts"]) =>
            partCounts.doors,
        },
        {
          key: "drawerCount",
          dataIndex: "partCounts",
          title: "Drawers",
          render: (partCounts: CabinetSpecifications["partCounts"]) =>
            partCounts.drawers,
        },
        {
          key: "drawerFrontCount",
          dataIndex: "partCounts",
          title: "Drawer Fronts",
          render: (partCounts: CabinetSpecifications["partCounts"]) =>
            partCounts.drawerFronts,
        },
        {
          key: "trayCount",
          dataIndex: "partCounts",
          title: "Tray Count",
          render: (partCounts: CabinetSpecifications["partCounts"]) =>
            partCounts.trays,
        },
      ],
    },
    {
      key: "sideCount",
      dataIndex: "partCounts",
      title: "Side Count",
      render: (partCounts: CabinetSpecifications["partCounts"]) =>
        partCounts.sides,
    },
  ];

  return [columns, specificationsColumns] as const;
};
