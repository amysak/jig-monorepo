import { useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { Divider, Space, TableProps } from "antd";
import { ApiGetResult, Filler, Panel, ToePlatform } from "type-defs";

import { SetupTable, useExtensionsColumns } from "features/setup";
import { api } from "lib/api";
import { extensionsIndexRoute } from "./routes";

import "./extensions.scss";

export default function ExtensionsPage() {
  const search = useSearch({ from: extensionsIndexRoute.id });
  const params = useParams({ from: extensionsIndexRoute.id });

  const panelsQuery = useQuery<ApiGetResult<Panel>>({
    queryKey: ["panels", search],
    queryFn: () => api.panels.getAll(search),
    enabled: false,
    keepPreviousData: true,
  });
  const fillersQuery = useQuery<ApiGetResult<Filler>>({
    queryKey: ["fillers", search],
    queryFn: () => api.fillers.getAll(search),
    enabled: false,
    keepPreviousData: true,
  });
  const toesQuery = useQuery<ApiGetResult<ToePlatform>>({
    queryKey: ["toes", search],
    queryFn: () => api.toes.getAll(search),
    enabled: false,
    keepPreviousData: true,
  });

  const { fillerColumns, panelColumns, toeColumns } = useExtensionsColumns();

  const fillerExpanded: TableProps<Filler>["expandable"] = {};

  const panelsTable = (
    <SetupTable
      rowClassName="extensions-table-row"
      columns={panelColumns}
      expandableProps={fillerExpanded}
      displayData={panelsQuery.data || { data: [] }}
      isLoading={panelsQuery.isLoading}
    />
  );
  const fillersTable = (
    <SetupTable
      rowClassName="extensions-table-row"
      columns={fillerColumns}
      expandableProps={fillerExpanded}
      displayData={fillersQuery.data || { data: [] }}
      isLoading={fillersQuery.isLoading}
    />
  );
  const toeTable = (
    <SetupTable
      rowClassName="extensions-table-row"
      columns={toeColumns}
      expandableProps={fillerExpanded}
      displayData={toesQuery.data || { data: [] }}
      isLoading={toesQuery.isLoading}
    />
  );

  if (params.extensionCategory === "panels") {
    return panelsTable;
  } else if (params.extensionCategory === "fillers") {
    return fillersTable;
  } else if (params.extensionCategory === "toes") {
    return toeTable;
  }

  return (
    <>
      <Space>
        {panelsTable}
        {fillersTable}
      </Space>
      <Divider />
      {toeTable}
    </>
  );
}
