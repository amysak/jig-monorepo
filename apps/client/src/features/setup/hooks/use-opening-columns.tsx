import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { Space, TableProps, Tag, Typography } from "antd";
import { capitalize } from "lodash-es";

import { useOpeningDeletion } from "hooks/queries";
import { useSearch } from "hooks/router";
import { CabinetOpening, CabinetOpeningType, Vendor } from "type-defs";

const { Text } = Typography;

export const useOpeningColumns = () => {
  const search = useSearch();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteOpening } = useOpeningDeletion();

  const columns: TableProps<CabinetOpening>["columns"] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "20%",
      render(openingName: string, row) {
        return (
          <Link to={`/setup/openings/${row.id}`}>
            {openingName || row.model}
          </Link>
        );
      },
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      render: (type: CabinetOpeningType) => (
        <Tag className="type-tag">
          {capitalize(type.replaceAll("_", " ").toLowerCase())}
        </Tag>
      ),
    },
    {
      key: "materialType",
      dataIndex: "materialType",
      title: "Material type",
      render: (materialType: string) => <Text>{materialType}</Text>,
    },
    {
      key: "vendor",
      dataIndex: "vendor",
      title: "Vendor name",
      render: (vendor: Vendor) => <Text>{vendor.name}</Text>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => (
        <Space size="middle">
          <DeleteOutlined
            className="actions-icon"
            onClick={async () => {
              await deleteOpening(row.id);
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

  return [columns] as const;
};
