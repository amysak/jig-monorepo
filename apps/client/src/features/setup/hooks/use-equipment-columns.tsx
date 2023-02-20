import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Space, TableProps, Typography } from "antd";
import { capitalize } from "lodash-es";
import { Equipment, EquipmentCategory } from "type-defs";

import { useEquipmentDeletion } from "lib/hooks/queries";
import { equipmentIndexRoute } from "pages/setup";

const { Text } = Typography;

export const useEquipmentColumns = () => {
  const search = useSearch({ from: equipmentIndexRoute.id });

  const queryClient = useQueryClient();

  const { mutateAsync: deleteProfile } = useEquipmentDeletion();

  const columns: TableProps<Equipment>["columns"] = [
    {
      key: "name",
      dataIndex: "name",
      width: "30%",
      title: "Name",
      render(equipmentName: string, row) {
        return (
          <Link to="/setup/equipment/$id" params={{ id: row.id }}>
            {equipmentName}
          </Link>
        );
      },
    },
    {
      key: "type",
      dataIndex: "category",
      width: "15%",
      title: "Category",
      render: (category: EquipmentCategory) => (
        <Text strong>{capitalize(category)}</Text>
      ),
    },
    {
      key: "classification",
      width: "20%",
      dataIndex: "classification",
      title: "Classification",
    },
    {
      key: "price",
      width: "10%",
      dataIndex: "price",
      title: "Price (disc.)",
      render: (price: number) => <Text>{`$${price}`}</Text>,
    },
    {
      key: "measurement",
      width: "10%",
      dataIndex: "measurement",
      title: "Measure",
    },
    {
      key: "actions",
      width: "15%",
      title: "Actions",
      render: (_, row) => (
        <Space size="middle">
          <DeleteOutlined
            className="actions-icon"
            onClick={async () => {
              await deleteProfile(row.id);
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

  return [columns] as const;
};
