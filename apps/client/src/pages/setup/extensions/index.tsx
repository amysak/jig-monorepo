import { PageSkeleton } from "@jigbid/ui";
import { Navigate } from "@tanstack/react-location";
import { Divider, Space, TableProps } from "antd";
import { Filler } from "type-defs";

import { SetupTable, useExtensionsColumns } from "features/setup";
import { useExtensionsCombinedQuery } from "hooks/queries";
import { useRouter, useSearch } from "hooks/router";
import { useToggles } from "lib/store";

import "./extensions.scss";

export const ExtensionsPage = () => {
  const search = useSearch();

  const router = useRouter();
  const params = router.state.matches.at(-1)?.params || {
    extensionCategory: null,
  };

  const toggles = useToggles();

  const { fillers, panels, toes, isLoading } = useExtensionsCombinedQuery(
    {
      ...search,
      pagination: { ...search.pagination, limit: toggles.setup.recordLimit },
    },
    {
      keepPreviousData: true,
    }
  );

  const { fillerColumns, panelColumns, toeColumns } = useExtensionsColumns();

  if (isLoading) {
    return <PageSkeleton />;
  }

  const fillerExpanded: TableProps<Filler>["expandable"] = {};

  const panelsTable = (
    <SetupTable
      rowClassName="extensions-table-row"
      columns={panelColumns}
      expandableProps={fillerExpanded}
      displayData={panels || { data: [] }}
      isLoading={isLoading}
    />
  );
  const fillersTable = (
    <SetupTable
      rowClassName="extensions-table-row"
      columns={fillerColumns}
      expandableProps={fillerExpanded}
      displayData={fillers || { data: [] }}
      isLoading={isLoading}
    />
  );
  const toeTable = (
    <SetupTable
      rowClassName="extensions-table-row"
      columns={toeColumns}
      expandableProps={fillerExpanded}
      displayData={toes || { data: [] }}
      isLoading={isLoading}
    />
  );

  if (params.extensionCategory === "panels") {
    return panelsTable;
  } else if (params.extensionCategory === "fillers") {
    return fillersTable;
  } else if (params.extensionCategory === "toe-kicks") {
    return toeTable;
  } else if (router.state.matches.length === 2) {
    // If no extensionCategory matched at all

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

  return <Navigate to="/setup/extensions" replace />;

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

export default ExtensionsPage;
