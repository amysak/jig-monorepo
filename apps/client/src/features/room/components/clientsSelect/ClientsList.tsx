import { Table } from "@jigbid/ui";
import { useSearch } from "@tanstack/react-location";

import { useClientsPaginated } from "hooks/queries";
import { LocationGenerics } from "router";
import { Client, DEFAULT_PAGE_SIZE } from "type-defs";

import { ClientsFilterRow } from "./ClientsFilterRow";
import { columns } from "./ClientsList.utils";

import "./ClientsList.styles.scss";

interface ClientsListProps {
  onSelect: (data: Client) => void;
  onOpenChange: (bool: boolean) => void;
}

export function ClientsList({ onSelect, onOpenChange }: ClientsListProps) {
  const search = useSearch<LocationGenerics>();

  const { data, isLoading } = useClientsPaginated(search);

  return (
    <div>
      <ClientsFilterRow />

      <Table
        // {...tableProps}
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        // onChange={onPaginate}
        pagination={{
          total: data?.count,
          pageSize: DEFAULT_PAGE_SIZE,
          size: "small",
          showSizeChanger: false,
          current: search.pagination?.page,
        }}
        rowKey="id"
        className="clickablerows pagewrapper__maincontent nomargin"
        onRow={(record, _index) => {
          console.log({ record });
          return {
            onClick: (_e) => {
              // onSelect(record);
              onOpenChange(false);
            },
          };
        }}
      />
    </div>
  );
}
