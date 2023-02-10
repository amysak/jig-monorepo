import { useQuery } from "@tanstack/react-query";
import { Outlet, useSearch } from "@tanstack/react-router";
import { TableProps } from "antd";
import { Material } from "type-defs";

import { SetupTable, useMaterialsColumns } from "features/setup";
import { api } from "lib/api";
import { useToggles } from "lib/store";
import { materialsIndexRoute } from "./routes";

import "./materials.scss";

export function MaterialsPage() {
  const search = useSearch({ from: materialsIndexRoute.id });

  const toggles = useToggles();

  const { data: materials, isLoading } = useQuery({
    queryKey: ["materials", search],
    queryFn: () => api.materials.getAll(search),
    keepPreviousData: true,
  });

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
}

export default MaterialsPage;
