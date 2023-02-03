import { PageSkeleton } from "@jigbid/ui";
import { Outlet } from "@tanstack/react-location";
import { TableProps, Typography } from "antd";
import { CabinetEquipment, Profile } from "type-defs";

import { SetupTable, useEquipmentColumns } from "features/setup";
import { useEquipmentPaginated } from "hooks/queries";
import { useSearch } from "hooks/router";
import { useToggles } from "lib/store";

import "./equipment.scss";

const { Paragraph } = Typography;

export const EquipmentPage = () => {
  const search = useSearch();

  const toggles = useToggles();

  const { data: equipment, isLoading } = useEquipmentPaginated(
    {
      ...search,
      pagination: { ...search.pagination, limit: toggles.setup.recordLimit },
    },
    {
      keepPreviousData: true,
    }
  );

  const [columns] = useEquipmentColumns();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!equipment) {
    return null;
  }

  const equipmentExpanded: TableProps<CabinetEquipment>["expandable"] = {
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
};

export default EquipmentPage;
