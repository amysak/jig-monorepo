import { PageSkeleton } from "@jigbid/ui";
import { Outlet } from "@tanstack/react-location";
import { TableProps } from "antd";
import { Profile } from "type-defs";

import { SetupTable } from "features/setup";
import { useSearch } from "hooks/router";
import { useToggles } from "lib/store";

import { useProfileColumns } from "features/setup";
import { useProfilesPaginated } from "hooks/queries";

import "./profiles.scss";

export const ProfilesPage = () => {
  const search = useSearch();

  const toggles = useToggles();

  const { data: openings, isLoading } = useProfilesPaginated(
    {
      ...search,
      pagination: { ...search.pagination, limit: toggles.setup.recordLimit },
    },
    {
      keepPreviousData: true,
    }
  );

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
          dataWithCount={openings}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
};

export default ProfilesPage;
