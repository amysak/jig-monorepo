import { PageSkeleton } from "@jigbid/ui";
import { Outlet } from "@tanstack/react-location";
import { TableProps, Typography } from "antd";
import { CabinetOpening } from "type-defs";

import { SetupTable, useOpeningColumns } from "features/setup";
import { useOpeningsPaginated } from "hooks/queries";
import { useSearch } from "hooks/router";
import { useToggles } from "lib/store";

import "./openings.scss";

const { Paragraph } = Typography;

export const OpeningsPage = () => {
  const search = useSearch();

  const toggles = useToggles();

  const { data: openings, isLoading } = useOpeningsPaginated(
    {
      ...search,
      pagination: { ...search.pagination, limit: toggles.setup.recordLimit },
    },
    {
      keepPreviousData: true,
    }
  );

  const [columns] = useOpeningColumns();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!openings) {
    return null;
  }

  const openingExpanded: TableProps<CabinetOpening>["expandable"] = {
    expandedRowRender: (opening) => (
      <Paragraph>{opening.description}</Paragraph>
    ),
    rowExpandable: (opening) => !!opening.description,
  };

  return (
    <>
      {/* Modal rendering */}
      <Outlet />
      {toggles.setup.view === "table" ? (
        <SetupTable
          rowClassName="openings-table-row"
          columns={columns}
          expandableProps={openingExpanded}
          dataWithCount={openings}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
};

export default OpeningsPage;
