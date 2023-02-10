import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Space, TableProps } from "antd";
import { HardwareSet, MaterialSet } from "type-defs";

import { setsIndexRoute } from "pages/routes";

export const useSetsColumns = () => {
  const search = useSearch({ from: setsIndexRoute.id, strict: false });

  const queryClient = useQueryClient();

  // const { mutateAsync: deleteProfile } = useEquipmentDeletion();

  const baseColumns: TableProps<MaterialSet | HardwareSet>["columns"] = [
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
              await queryClient.invalidateQueries(["sets", search]);
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

  const materialSetColumns = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render(setName: string, row: MaterialSet) {
        return (
          <Link
            to="/setup/sets/$setType/$id"
            params={{ setType: "material", id: row.id }}
          >
            {setName}
          </Link>
        );
      },
    },
    ...baseColumns,
  ];
  const hardwareSetColumns = [...baseColumns];

  return { materialSetColumns, hardwareSetColumns };
};
