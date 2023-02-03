import { PageSkeleton } from "@jigbid/ui";
import { Outlet } from "@tanstack/react-location";
import { Table, TableProps } from "antd";
import { isEmpty } from "lodash-es";
import { Cabinet } from "type-defs";

import { SetupTable, useCabinetColumns } from "features/setup";
import { useCabinetsPaginated } from "hooks/queries";
import { useSearch } from "hooks/router";
import { useToggles } from "lib/store";

import "./cabinets.scss";

export const CabinetsPage = () => {
  const search = useSearch();

  const toggles = useToggles();

  const { data: cabinets, isLoading } = useCabinetsPaginated(
    {
      ...search,
      pagination: { ...search.pagination, limit: toggles.setup.recordLimit },
    },
    {
      keepPreviousData: true,
    }
  );

  const [columns, specificationsColumns] = useCabinetColumns();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!cabinets) {
    return null;
  }

  const cabinetExpanded: TableProps<Cabinet>["expandable"] = {
    expandedRowRender: (cabinet) => (
      <Table
        columns={specificationsColumns}
        style={{ marginBlock: 0, marginInline: 0 }}
        className="specifications-table"
        dataSource={[
          // We can be sure that the cabinet exists because it is fetched for the parent table
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          cabinets.data.find((cab) => cab.id === cabinet.id)!.specifications,
        ]}
        rowKey={(record) => record.id}
        pagination={false}
      />
    ),
    rowExpandable: (cabinet) => !isEmpty(cabinet.specifications),
  };

  return (
    <>
      {/* Modal rendering */}
      <Outlet />
      {toggles.setup.view === "table" ? (
        <SetupTable
          rowClassName="cabinets-table-row"
          columns={columns}
          expandableProps={cabinetExpanded}
          displayData={cabinets}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
};

export default CabinetsPage;
