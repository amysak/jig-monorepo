import { useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { Divider, TableProps } from "antd";
import { ApiGetResult, Panel, ToePlatform } from "type-defs";

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
  const toesQuery = useQuery<ApiGetResult<ToePlatform>>({
    queryKey: ["toes", search],
    queryFn: () => api.toes.getAll(search),
    enabled: false,
    keepPreviousData: true,
  });

  const { panelColumns, toeColumns } = useExtensionsColumns();

  const panelExpanded: TableProps<Panel>["expandable"] = {};

  const panelsTable = (
    <SetupTable
      rowClassName="extensions-table-row"
      columns={panelColumns}
      expandableProps={panelExpanded}
      displayData={panelsQuery.data || { data: [] }}
      isLoading={panelsQuery.isLoading}
    />
  );
  const toeTable = (
    <SetupTable
      rowClassName="extensions-table-row"
      columns={toeColumns}
      expandableProps={panelExpanded}
      displayData={toesQuery.data || { data: [] }}
      isLoading={toesQuery.isLoading}
    />
  );

  if (params.extensionCategory === "panels") {
    return panelsTable;
  } else if (params.extensionCategory === "toes") {
    return toeTable;
  }

  return (
    <>
      <Divider orientation="left">Panels</Divider>
      {panelsTable}
      <Divider orientation="left">Toe platforms</Divider>
      {toeTable}
    </>
  );
}
