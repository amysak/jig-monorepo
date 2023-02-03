import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { Space, TableProps, Typography } from "antd";
import { capitalize } from "lodash-es";

import { useEquipmentDeletion } from "hooks/queries";
import { useSearch } from "hooks/router";
import { CabinetEquipment, CabinetEquipmentCategory } from "type-defs";

const { Text } = Typography;

export const useEquipmentColumns = () => {
  const search = useSearch();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteProfile } = useEquipmentDeletion();

  const columns: TableProps<CabinetEquipment>["columns"] = [
    {
      key: "name",
      dataIndex: "name",
      width: "30%",
      title: "Name",
      render(equipmentName: string, row) {
        return <Link to={`/setup/profiles/${row.id}`}>{equipmentName}</Link>;
      },
    },
    {
      key: "type",
      dataIndex: "category",
      width: "15%",
      title: "Category",
      render: (category: CabinetEquipmentCategory) => (
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
