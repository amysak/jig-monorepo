import { PageSkeleton } from "@jigbid/ui";
import { Outlet, useSearch } from "@tanstack/react-router";
import { TableProps, Typography } from "antd";
import { CabinetOpening } from "type-defs";

import { SetupTable, useOpeningColumns } from "features/setup";
import { api } from "lib/api";
import { useToggles } from "lib/store";
import { openingsIndexRoute } from "./routes";

import { useQuery } from "@tanstack/react-query";
import "./openings.scss";

const { Paragraph } = Typography;

function OpeningsPage() {
  const search = useSearch({ from: openingsIndexRoute.id });

  const toggles = useToggles();

  const { data: openings, isLoading } = useQuery({
    queryKey: ["openings", search],
    queryFn: () => api.openings.getAll(search),
    keepPreviousData: true,
  });

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
          displayData={openings}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
}

export default OpeningsPage;
