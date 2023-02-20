import { PageSkeleton } from "@jigbid/ui";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useSearch } from "@tanstack/react-router";
import { TableProps, Typography } from "antd";
import { Equipment } from "type-defs";

import { SetupTable, useEquipmentColumns } from "features/setup";
import { api } from "lib/api";
import { useToggles } from "lib/store";
import { equipmentIndexRoute } from "./routes";

import "./equipment.scss";

const { Paragraph } = Typography;

function EquipmentPage() {
  const search = useSearch({ from: equipmentIndexRoute.id });

  const toggles = useToggles();

  const { data: equipment, isLoading } = useQuery({
    queryKey: ["equipment", search],
    queryFn: () => api.equipment.getAll(search),
    keepPreviousData: true,
  });

  const [columns] = useEquipmentColumns();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!equipment) {
    return null;
  }

  const equipmentExpanded: TableProps<Equipment>["expandable"] = {
    expandedRowRender: (equipment) => (
      <Paragraph>{equipment.description}</Paragraph>
    ),
    rowExpandable: (equipment) => !!equipment.description,
  };

  return (
    <>
      {/* Modal rendering */}
      <Outlet />
      {toggles.setup.view === "table" ? (
        <SetupTable
          rowClassName="equipment-table-row"
          columns={columns}
          expandableProps={equipmentExpanded}
          displayData={equipment}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
}

export default EquipmentPage;
