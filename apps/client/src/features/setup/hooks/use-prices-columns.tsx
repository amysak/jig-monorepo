import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { Space, TableProps } from "antd";
import { Markup, Terms, Upcharge } from "type-defs";

import { useSearch } from "hooks/router";

export const usePricesColumns = () => {
  const search = useSearch();

  const queryClient = useQueryClient();

  // const { mutateAsync: deleteProfile } = useEquipmentDeletion();

  const baseColumns: TableProps<Markup | Terms | Upcharge>["columns"] = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render(equipmentName: string) {
        return <Link>{equipmentName}</Link>;
      },
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
              await queryClient.invalidateQueries(["prices", search]);
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

  const markupColumns = [...baseColumns];
  const termsColumns = [...baseColumns];
  const upchargeColumns = [...baseColumns];

  return { markupColumns, termsColumns, upchargeColumns };
};
