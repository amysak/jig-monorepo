import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Space, TableProps, Typography } from "antd";

import { finishesIndexRoute } from "pages/setup";
import { FinishProcess } from "type-defs";

const { Text } = Typography;

export const useFinishesColumns = () => {
  const search = useSearch({ from: finishesIndexRoute.id });

  const queryClient = useQueryClient();

  // const { mutateAsync: deleteProfile } = useEquipmentDeletion();

  const finishesColumns: TableProps<FinishProcess>["columns"] = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render(materialName: string) {
        return <Link>{materialName}</Link>;
      },
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
    },
    {
      key: "source",
      dataIndex: "source",
      title: "Source",
      render(source: string) {
        return <Text>{source === "In" ? "In-house" : "Outsourced"}</Text>;
      },
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Price",
      // render(source: string) {
      //   return <Text>{source === "In" ? "In-house" : "Outsourced"}</Text>;
      // },
    },
    {
      key: "discount",
      dataIndex: "discount",
      title: "Discount",
      // render(source: string) {
      //   return <Text>{source === "In" ? "In-house" : "Outsourced"}</Text>;
      // },
    },
    {
      key: "actions",
      title: "Actions",
      render: (_) => (
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

  return [finishesColumns];
};
