import { PageSkeleton } from "@jigbid/ui";
import { Divider, TableProps } from "antd";
import { Filler } from "type-defs";

import { SetupTable, useSetsColumns } from "features/setup";
import { useSetsQuery } from "hooks/queries";
import { useSearch } from "hooks/router";
import { useToggles } from "lib/store";

import "./sets.scss";

export const SetsPage = () => {
  const search = useSearch();

  const toggles = useToggles();

  const { materialSet, hardwareSet, isLoading } = useSetsQuery(
    {
      ...search,
    },
    {
      keepPreviousData: true,
    }
  );

  const { materialSetColumns, hardwareSetColumns } = useSetsColumns();

  if (isLoading) {
    return <PageSkeleton />;
  }

  const setExpanded: TableProps<Filler>["expandable"] = {};

  const materialSetTable = (
    <SetupTable
      rowClassName="sets-table-row"
      columns={materialSetColumns}
      expandableProps={setExpanded}
      displayData={materialSet || { data: [] }}
      isLoading={isLoading}
    />
  );
  const hardwareSetTable = (
    <SetupTable
      rowClassName="sets-table-row"
      columns={hardwareSetColumns}
      expandableProps={setExpanded}
      displayData={hardwareSet || { data: [] }}
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
      <Divider orientation="left">Material Sets</Divider>
      {materialSetTable}
      <Divider orientation="left">Hardware Sets</Divider>
      {hardwareSetTable}
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

export default SetsPage;
