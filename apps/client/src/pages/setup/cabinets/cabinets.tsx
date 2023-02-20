import { PageSkeleton } from "@jigbid/ui";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useSearch } from "@tanstack/react-router";
import { Table, TableProps } from "antd";
import { isEmpty } from "lodash-es";

import { SetupTable, useCabinetColumns } from "features/setup";
import { api } from "lib/api";
import { useToggles } from "lib/store";
import { Cabinet } from "type-defs";
import { cabinetsIndexRoute } from "./routes";

import "./cabinets.scss";

export default function CabinetsPage() {
  const search = useSearch({ from: cabinetsIndexRoute.id });

  const toggles = useToggles();

  const { data: cabinets, isLoading } = useQuery({
    queryKey: ["cabinets", search],
    queryFn: () =>
      api.cabinets.getAll({ ...search, limit: toggles.setup.recordLimit }),
    keepPreviousData: true,
  });

  const [columns] = useCabinetColumns();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!cabinets) {
    return null;
  }

  const cabinetExpanded: TableProps<Cabinet>["expandable"] = {
    expandedRowRender: (cabinet) => (
      <Table
        columns={[]}
        style={{ marginBlock: 0, marginInline: 0 }}
        className="details-table"
        dataSource={[cabinet]}
        rowKey={(record) => record.id}
        pagination={false}
      />
    ),
    rowExpandable: (cabinet) => !isEmpty(cabinet.exterior),
  };

  return (
    <>
      {/* Modal rendering */}
      <Outlet />
      {toggles.setup.view === "table" ? (
        <SetupTable
          rowClassName="cabinets-table-row"
          columns={columns}
          expandableProps={cabinetExpanded}
          displayData={cabinets}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
}
