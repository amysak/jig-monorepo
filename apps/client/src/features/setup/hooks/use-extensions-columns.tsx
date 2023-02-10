import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Space, TableProps } from "antd";
import { Filler, Panel, ToePlatform } from "type-defs";

import { extensionsIndexRoute } from "pages/setup";

export const useExtensionsColumns = () => {
  const search = useSearch({ from: extensionsIndexRoute.id });

  const queryClient = useQueryClient();

  // const { mutateAsync: deleteProfile } = useEquipmentDeletion();

  const baseColumns: TableProps<Filler | Panel | ToePlatform>["columns"] = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render(equipmentName: string) {
        return <Link>{equipmentName}</Link>;
      },
    },
    {
      key: "depth",
      dataIndex: "depth",
      title: "Depth",
    },
    {
      key: "height",
      dataIndex: "height",
      title: "Height",
    },
    {
      key: "actions",
      title: "Actions",
      render: () => (
        <Space size="middle">
          <DeleteOutlined
            className="actions-icon"
            onClick={async () => {
              // await deleteProfile(row.id);
              await queryClient.invalidateQueries(["equipment", search]);
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

  const fillerColumns = [...baseColumns];
  const panelColumns = [...baseColumns];
  const toeColumns = [...baseColumns];

  return { fillerColumns, panelColumns, toeColumns };
};
