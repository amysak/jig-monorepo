import { Outlet, useSearch } from "@tanstack/react-router";
import { TableProps } from "antd";
import { FinishProcess } from "type-defs";

import { SetupTable, useFinishesColumns } from "features/setup";
import { useFinishesGrouppedQuery } from "lib/hooks/queries";
import { useToggles } from "lib/store";
import { finishesIndexRoute } from "./routes";

import "./finishes.scss";

export const FinishesPage = () => {
  const search = useSearch({ from: finishesIndexRoute.id });

  const toggles = useToggles();

  const { data: finishes, isLoading } = useFinishesGrouppedQuery(
    {
      ...search,
    },
    {
      keepPreviousData: true,
    }
  );

  const finishProcessExpanded: TableProps<FinishProcess>["expandable"] = {
    expandedRowRender: (finish) => finish.description,
    rowExpandable: (finish) => !!finish.description,
  };

  const [columns] = useFinishesColumns();

  return (
    <>
      {/* Modal rendering */}
      <Outlet />
      {toggles.setup.view === "table" ? (
        <>
          <SetupTable
            scroll={{ y: 200 }}
            rowClassName="finishes-table-row"
            columns={columns}
            expandableProps={finishProcessExpanded}
            displayData={finishes ? { data: finishes.paints } : { data: [] }}
            isLoading={isLoading}
          />

          <SetupTable
            scroll={{ y: 200 }}
            rowClassName="finishes-table-row"
            columns={columns}
            expandableProps={finishProcessExpanded}
            displayData={finishes ? { data: finishes.processes } : { data: [] }}
            isLoading={isLoading}
          />
        </>
      ) : null}
    </>
  );
};

export default FinishesPage;
