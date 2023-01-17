import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "api/Api";
import { Form, Table, useForm } from "@jigbid/ui";
import { Client } from "entities";
import { tableProps } from "pages/cabinetsetup/utils";
import { getQueryString } from "utilities/utils";

import { ClientsFilterRow } from "./ClientsFilterRow";
import { columns } from "./ClientsList.utils";

import { getClients } from "api/clients";
import "./ClientsList.styles.scss";

interface ClientsListProps {
  onSelect: (data: Client) => void;
  onOpenChange: (bool: boolean) => void;
}

export function ClientsList({ onSelect, onOpenChange }: ClientsListProps) {
  const [form] = useForm();

  // Make it a convention (limit, skip)
  const [filters, setFilters] = useState({ limit: 20, skip: 1 });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["clients", filters],
    () => getClients(getQueryString(filters)),
    {
      onError: (error) => console.error(error),
    }
  );

  const onPaginate = (config) => {
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    setFilters(queryFilters);
  };

  const onValuesChange = () => {
    queryClient.invalidateQueries(["clients", filters]);
  };

  return (
    <div>
      <Form form={form} onValuesChange={onValuesChange} layout="inline">
        <ClientsFilterRow />
      </Form>

      <Table
        {...tableProps}
        loading={isLoading}
        columns={columns}
        dataSource={data?.clients}
        onChange={onPaginate}
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
              onSelect(record);
              onOpenChange(false);
            },
          };
        }}
      />
    </div>
  );
}
