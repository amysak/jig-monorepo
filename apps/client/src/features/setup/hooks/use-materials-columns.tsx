import {
  CopyOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { AutoComplete, Space, TableProps, Tag, Typography } from "antd";
import { capitalize } from "lodash-es";
import { useState } from "react";
import { Material, MaterialPurpose, MATERIAL_PURPOSE } from "type-defs";

import { useMaterialTypesQuery } from "lib/hooks/queries";
import { materialsIndexRoute } from "pages/setup";

const { Text } = Typography;

export const useMaterialsColumns = () => {
  const search = useSearch({ from: materialsIndexRoute.id });

  const queryClient = useQueryClient();

  const [options, setOptions] = useState<{ value: string }[]>([]);
  // const { mutateAsync: deleteProfile } = useEquipmentDeletion();

  const { data: materialTypes } = useMaterialTypesQuery();

  const materialsColumns: TableProps<Material>["columns"] = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render(materialName: string) {
        return <Link>{materialName}</Link>;
      },
    },
    {
      key: "purpose",
      dataIndex: "purpose",
      title: "Purpose",
      filters: Object.values(MATERIAL_PURPOSE).map((purpose) => ({
        text: capitalize(purpose.replaceAll("_", " ")),
        value: purpose,
      })),
      // defaultFilteredValue: search.filters?.purpose,
      render(purpose: MaterialPurpose) {
        return <Tag>{capitalize(purpose.replaceAll("_", " "))}</Tag>;
      },
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      filterDropdown: () => {
        const onSearch = (searchText: string) => {
          if (!materialTypes) return;
          setOptions(
            !searchText
              ? []
              : materialTypes
                  .filter((type) =>
                    type.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((type) => ({ value: type }))
          );
        };

        return (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Text>Filter by type</Text>
            <AutoComplete
              placeholder={`Search type`}
              options={options}
              onSearch={onSearch}
            />
          </div>
        );
        // return (
        //   <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        //     <Input
        //       ref={searchInput}
        //       placeholder={`Search ${dataIndex}`}
        //       value={selectedKeys[0]}
        //       onChange={(e) =>
        //         setSelectedKeys(e.target.value ? [e.target.value] : [])
        //       }
        //       onPressEnter={() =>
        //         handleSearch(selectedKeys as string[], confirm, dataIndex)
        //       }
        //       style={{ marginBottom: 8, display: "block" }}
        //     />
        //     <Space>
        //       <Button
        //         type="primary"
        //         onClick={() =>
        //           handleSearch(selectedKeys as string[], confirm, dataIndex)
        //         }
        //         icon={<SearchOutlined />}
        //         size="small"
        //         style={{ width: 90 }}
        //       >
        //         Search
        //       </Button>
        //       <Button
        //         onClick={() => clearFilters && handleReset(clearFilters)}
        //         size="small"
        //         style={{ width: 90 }}
        //       >
        //         Reset
        //       </Button>
        //       <Button
        //         type="link"
        //         size="small"
        //         onClick={() => {
        //           confirm({ closeDropdown: false });
        //           setSearchText((selectedKeys as string[])[0]);
        //           setSearchedColumn(dataIndex);
        //         }}
        //       >
        //         Filter
        //       </Button>
        //       <Button
        //         type="link"
        //         size="small"
        //         onClick={() => {
        //           close();
        //         }}
        //       >
        //         close
        //       </Button>
        //     </Space>
        //   </div>
        // );
      },
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      // onFilter: (value, record) =>
      //   record[dataIndex]
      //     .toString()
      //     .toLowerCase()
      //     .includes((value as string).toLowerCase()),
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

  return [materialsColumns];
};
