import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Space, TableProps, Tag, Typography } from "antd";
import { capitalize } from "lodash-es";
import { Profile, ProfileType, Vendor } from "type-defs";

import { useProfileDeletion } from "lib/hooks/queries";
import { profilesIndexRoute } from "pages/routes";

const { Text } = Typography;

export const useProfileColumns = () => {
  const search = useSearch({ from: profilesIndexRoute.id });

  const queryClient = useQueryClient();

  const { mutateAsync: deleteProfile } = useProfileDeletion();

  const columns: TableProps<Profile>["columns"] = [
    {
      key: "name",
      dataIndex: "name",
      width: "20%",
      title: "Name",
      render(profileName: string, row) {
        return (
          <Link to="/setup/profiles/$id" params={{ id: row.id }}>
            {profileName}
          </Link>
        );
      },
    },
    {
      key: "type",
      dataIndex: "type",
      width: "10%",
      title: "Category",
      render: (type: ProfileType) => (
        <Tag className="type-tag">{capitalize(type)}</Tag>
      ),
    },
    {
      key: "vendor",
      dataIndex: "vendor",
      width: "20%",
      title: "Vendor name",
      render: (vendor: Vendor) => <Text>{vendor.name}</Text>,
    },
    {
      key: "actions",
      width: "10%",
      title: "Actions",
      render: (_, row) => (
        <Space size="middle">
          <DeleteOutlined
            className="actions-icon"
            onClick={async () => {
              await deleteProfile(row.id);
              await queryClient.invalidateQueries(["profiles", search]);
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
