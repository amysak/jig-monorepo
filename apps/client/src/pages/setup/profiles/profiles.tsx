import { PageSkeleton } from "@jigbid/ui";
import { Outlet, useSearch } from "@tanstack/react-router";
import { TableProps } from "antd";
import { Profile } from "type-defs";

import { SetupTable, useProfileColumns } from "features/setup";
import { api } from "lib/api";
import { useToggles } from "lib/store";
import { profilesIndexRoute } from "./routes";

import { useQuery } from "@tanstack/react-query";
import "./profiles.scss";

function ProfilesPage() {
  const search = useSearch({ from: profilesIndexRoute.id });

  const toggles = useToggles();

  const { data: openings, isLoading } = useQuery({
    queryKey: ["profiles", search],
    queryFn: () => api.profiles.getAll(search),
    keepPreviousData: true,
  });

  const [columns] = useProfileColumns();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!openings) {
    return null;
  }

  const openingExpanded: TableProps<Profile>["expandable"] = {
    rowExpandable: () => false,
  };

  return (
    <>
      {/* Modal rendering */}
      <Outlet />
      {toggles.setup.view === "table" ? (
        <SetupTable
          rowClassName="profiles-table-row"
          columns={columns}
          expandableProps={openingExpanded}
          displayData={openings}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
}

export default ProfilesPage;
