import { Table, TableProps } from "antd";
import { FC } from "react";

import { useSetSearch } from "hooks";
import { useSearch } from "hooks/router";
import { useToggles } from "lib/store";

// Antd is untypeable i swear
type SetupDataViewProps = {
  columns: TableProps<any>["columns"];
  expandableProps?: TableProps<any>["expandable"];
  displayData: { data: any[]; count?: number };
  isLoading: boolean;
  rowClassName?: string;
  scroll?: TableProps<any>["scroll"];
};

export const SetupTable: FC<SetupDataViewProps> = ({
  expandableProps,
  displayData,
  isLoading,
  columns,
  rowClassName,
  scroll,
}) => {
  const { data, count } = displayData;

  const search = useSearch();
  const [setSearch] = useSetSearch();

  const toggles = useToggles();

  return (
    <>
      <Table
        rowClassName={rowClassName}
        style={{ marginBottom: 20 }}
        columns={columns}
        loading={isLoading}
        dataSource={data}
        className="setup-table"
        rowKey={(record) => record.id}
        scroll={scroll || { y: 500 }}
        onChange={(pagination, filters) =>
          setSearch(
            {
              pagination: {
                page: pagination.current,
              },
              filters,
            },
            { assign: true }
          )
        }
        expandable={expandableProps}
        pagination={
          count
            ? {
                // onChange: (page) => setSearch({ page }),
                total: count,
                pageSize: toggles.setup.recordLimit,
                size: "small",
                showSizeChanger: false,
                current: search.pagination?.page,
              }
            : false
        }
      />
    </>
  );
};
