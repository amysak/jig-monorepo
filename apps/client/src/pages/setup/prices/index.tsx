import { PageSkeleton } from "@jigbid/ui";
import { Divider, Space, TableProps } from "antd";
import { Filler } from "type-defs";

import { SetupTable, usePricesColumns } from "features/setup";
import { usePricesQuery } from "lib/hooks/queries";
import { useSearch } from "@tanstack/react-router";
import { useToggles } from "lib/store";

import "./prices.scss";

export const PricesPage = () => {
  const search = useSearch();

  const toggles = useToggles();

  const { markups, terms, upcharges, isLoading } = usePricesQuery(
    {
      ...search,
    },
    {
      keepPreviousData: true,
    }
  );

  const { markupColumns, termsColumns, upchargeColumns } = usePricesColumns();

  if (isLoading) {
    return <PageSkeleton />;
  }

  const fillerExpanded: TableProps<Filler>["expandable"] = {};

  const markupTable = (
    <SetupTable
      scroll={{ y: 200 }}
      rowClassName="extensions-table-row"
      columns={markupColumns}
      expandableProps={fillerExpanded}
      displayData={markups || { data: [] }}
      isLoading={isLoading}
    />
  );
  const termsTable = (
    <SetupTable
      scroll={{ y: 200 }}
      rowClassName="extensions-table-row"
      columns={termsColumns}
      expandableProps={fillerExpanded}
      displayData={terms || { data: [] }}
      isLoading={isLoading}
    />
  );
  const upchargeTable = (
    <SetupTable
      rowClassName="extensions-table-row"
      columns={upchargeColumns}
      expandableProps={fillerExpanded}
      displayData={upcharges || { data: [] }}
      isLoading={isLoading}
    />
  );

  // if (params.extensionCategory === "panels") {
  //   return markupTable;
  // } else if (params.extensionCategory === "fillers") {
  //   return termsTable;
  // } else if (params.extensionCategory === "toe-kicks") {
  //   return upchargeTable;
  // } else if (router.state.matches.length === 2) {
  //   // If no extensionCategory matched at all

  return (
    <>
      <Space>
        {markupTable}
        {termsTable}
      </Space>
      {upchargeTable}
    </>
  );
  // }

  // return <Navigate to="/setup/extensions" replace />;

  // return (
  //   <>
  //     {/* Modal rendering */}
  //     <Outlet />
  //     {toggles.setup.view === "table" ? (
  //       <SetupTable
  //         rowClassName="equipment-table-row"
  //         columns={columns}
  //         expandableProps={equipmentExpanded}
  //         dataWithCount={equipment}
  //         isLoading={isLoading}
  //       />
  //     ) : null}
  //   </>
  // );
};

export default PricesPage;
