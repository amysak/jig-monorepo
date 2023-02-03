import { Outlet } from "@tanstack/react-location";
import { TableProps } from "antd";
import { Material } from "type-defs";

import { SetupTable, useMaterialsColumns } from "features/setup";
import { useMaterialsQuery } from "hooks/queries";
import { useSearch } from "hooks/router";
import { useToggles } from "lib/store";

import "./materials.scss";

export const MaterialsPage = () => {
  const search = useSearch();

  const toggles = useToggles();

  const { data: materials, isLoading } = useMaterialsQuery(
    {
      ...search,
      pagination: { ...search.pagination, limit: toggles.setup.recordLimit },
    },
    {
      keepPreviousData: true,
    }
  );

  const materialExpanded: TableProps<Material>["expandable"] = {
    expandedRowRender: (material) => material.description,
    rowExpandable: (material) => !!material.description,
  };

  const [columns] = useMaterialsColumns();

  return (
    <>
      {/* Modal rendering */}
      <Outlet />
      {toggles.setup.view === "table" ? (
        <SetupTable
          rowClassName="materials-table-row"
          columns={columns}
          expandableProps={materialExpanded}
          displayData={materials || { data: [] }}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
};

export default MaterialsPage;
