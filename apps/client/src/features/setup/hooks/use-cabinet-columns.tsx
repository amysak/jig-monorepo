import {
  CopyOutlined,
  DeleteOutlined,
  StarOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Space, TableProps, Tag } from "antd";
import { capitalize, isEmpty } from "lodash-es";

import { useCabinetDeletion, useCabinetMutation } from "lib/hooks/queries";
import { cabinetsIndexRoute } from "pages/routes";
import { Cabinet, CabinetType } from "type-defs";

export const useCabinetColumns = () => {
  const search = useSearch({ from: cabinetsIndexRoute.id });

  const queryClient = useQueryClient();

  const { mutateAsync: mutateCabinetAsync } = useCabinetMutation();
  const { mutateAsync: deleteCabinetAsync } = useCabinetDeletion();

  const columns: TableProps<Cabinet>["columns"] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "25%",
      render(cabinetName: string, row: { id: number }) {
        return (
          <Link to="/setup/cabinets/$id" params={{ id: row.id }}>
            {cabinetName}
          </Link>
        );
      },
    },
    {
      key: "isFavourite",
      dataIndex: "isFavourite",
      title: <StarTwoTone />,
      width: "5%",
      render(isFavourite: boolean, row) {
        const handleClick = async () => {
          await mutateCabinetAsync({
            id: row.id,
            values: {
              isFavourite: !isFavourite,
            },
          });
          await queryClient.invalidateQueries(["cabinets", search]);
        };

        if (isFavourite) {
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
      // filteredValue: search.filters?.type,
      render: (type: CabinetType) => <Tag className="type-tag">{type}</Tag>,
    },
    {
      key: "style",
      dataIndex: "exterior",
      title: "Style",
      render: (exterior: Cabinet["exterior"]) =>
        !isEmpty(exterior.faceFrame) ? "Face Frame" : "Full Access",
    },
    {
      key: "baseType",
      dataIndex: "baseType",
      title: "Base Type",
      render: (baseType: Cabinet["baseType"]) => capitalize(baseType),
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

  return [columns] as const;
};
