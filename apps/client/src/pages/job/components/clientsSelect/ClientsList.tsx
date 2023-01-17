import { Client } from "type-defs";
import { Table } from "@jigbid/ui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useState } from "react";

import { api } from "api";
// import { tableProps } from "pages/cabinet-setup/utils";
import { getQueryString } from "utilities/utils";

import { ClientsFilterRow } from "./ClientsFilterRow";
import { columns } from "./ClientsList.utils";

import "./ClientsList.styles.scss";

interface ClientsListProps {
  onSelect: (data: Client) => void;
  onOpenChange: (bool: boolean) => void;
}

export function ClientsList({ onSelect, onOpenChange }: ClientsListProps) {
  const [form] = Form.useForm();

  // Make it a convention (limit, skip)
  const [filters, setFilters] = useState({ limit: 20, skip: 1 });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["clients", filters],
    () => api.clients.getAll(getQueryString(filters)),
    {
      onError: (error) => console.error(error),
    }
  );

  const onValuesChange = () => {
    queryClient.invalidateQueries(["clients", filters]);
  };

  return (
    <div>
      <Form form={form} onValuesChange={onValuesChange} layout="inline">
        <ClientsFilterRow />
      </Form>

      <Table
        // {...tableProps}
        loading={isLoading}
        columns={columns}
        dataSource={data?.clients}
        // onChange={onPaginate}
        pagination={{
          total: data?.count,
          pageSize: filters.limit,
          size: "small",
          showSizeChanger: false,
          current: filters.skip,
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
