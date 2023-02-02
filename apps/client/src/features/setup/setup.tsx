import { Table, TableProps } from "antd";
import { FC } from "react";
import { WithCountDto } from "type-defs";

import { useSetSearch } from "hooks";
import { useSearch } from "hooks/router";
import { useToggles } from "lib/store";

// Antd is untypeable i swear
type SetupDataViewProps = {
  columns: TableProps<any>["columns"];
  expandableProps: TableProps<any>["expandable"];
  dataWithCount: WithCountDto<any>;
  isLoading: boolean;
  rowClassName?: string;
};

export const SetupTable: FC<SetupDataViewProps> = ({
  expandableProps,
  dataWithCount,
  isLoading,
  columns,
  rowClassName,
}) => {
  const { data, count } = dataWithCount;

  const search = useSearch();
  const [setSearch] = useSetSearch();

  const toggles = useToggles();

  return (
    <>
      <Table
        rowClassName={rowClassName}
        columns={columns}
        loading={isLoading}
        dataSource={data}
        className="setup-table"
        rowKey={(record) => record.id}
        scroll={{ y: 500 }}
        onChange={(pagination) =>
          setSearch({
            pagination: {
              page: pagination.current,
            },
          })
        }
        expandable={expandableProps}
        pagination={{
          // onChange: (page) => setSearch({ page }),
          total: count,
          pageSize: toggles.setup.recordLimit,
          size: "small",
          showSizeChanger: false,
          current: search.pagination?.page,
        }}
      />
    </>
  );
};
