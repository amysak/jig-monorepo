import React, { useState } from "react";

import { api } from "api/Api";
import { getClients } from "api/clients";
import { Form, Table, useForm } from "components/atoms";
import { Client } from "entities";
import { tableProps } from "pages/cabinetsetup/utils";
import { getQueryString } from "utilities/utils";

import UILayout from "../../templates/uilayout";
import { PageHeader } from "../../layout/pageheader";
import NewClientFormPopover from "./NewClientForm";
import { TableActions } from "./TableActions";
import { ClientsFilterRow, columns, initialPath } from "./utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function ClientList() {
  const [form] = useForm();
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

  const handleClientUpdate = (clientId: string, payload: Partial<Client>) => {
    // ??
    const updatedClients = data.clients?.map((client) => {
      if (client.id === clientId) {
        return {
          ...client,
          ...payload,
        };
      } else return client;
    });

    queryClient.setQueryData(["clients", filters], updatedClients);
  };

  const _columns = () => [
    ...columns,
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,

      render(clientStatus, _row: Client) {
        return (
          <TableActions
            clientId={_row.id}
            status={clientStatus}
            key={_row.id}
            onClientUpdate={handleClientUpdate}
          />
        );
      },
    },
  ];

  return (
    <UILayout
      ToolbarContent={
        <PageHeader
          initial={initialPath}
          component={<NewClientFormPopover />}
        />
      }
    >
      <Form form={form} onValuesChange={onValuesChange} layout="inline">
        <ClientsFilterRow />
      </Form>

      <Table
        {...tableProps}
        loading={isLoading}
        columns={_columns()}
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
      />
    </UILayout>
  );
}

export default ClientList;
