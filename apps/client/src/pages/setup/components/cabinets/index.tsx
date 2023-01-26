import { Outlet, useNavigate, useSearch } from "@tanstack/react-location";
import { Modal, Table } from "antd";
import { isEmpty } from "lodash-es";
import { useState } from "react";

import { PageSkeleton } from "@jigbid/ui";
import { useSetSearch } from "hooks";
import { useCabinetsPaginated } from "hooks/queries";
import { LocationGenerics } from "router";
import { useToggles } from "store";

import { tableProps } from "../../utils";
import { useCabinetColumns } from "./core";

import "./cabinet.scss";

// TODO: Allow user to choose quantity
const CABINETS_LIMIT = 30;

export const CabinetsPage = () => {
  const search = useSearch<LocationGenerics>();
  const [setSearch] = useSetSearch();

  const { data: cabinets, isLoading } = useCabinetsPaginated(
    { ...search, pagination: { ...search.pagination, limit: CABINETS_LIMIT } },
    {
      keepPreviousData: true,
    }
  );

  const [columns, specifications] = useCabinetColumns();

  const toggles = useToggles();

  // TODO: can be omitted like in jobs, prefetch with react-location
  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!cabinets) {
    return null;
  }

  if (toggles.view === "table") {
    return (
      <>
        {/* Modal rendering */}
        <Outlet />

        <Table
          columns={columns}
          loading={isLoading}
          dataSource={cabinets.data}
          className="cabinets-table"
          {...tableProps}
          scroll={{ y: 500 }}
          onChange={(pagination) => {
            setSearch({
              pagination: {
                page: pagination.current,
              },
            });
          }}
          expandable={{
            expandedRowRender: (cabinet) => (
              <Table
                columns={specifications}
                style={{ marginBlock: 0, marginInline: 0 }}
                className="specifications-table"
                dataSource={[
                  cabinets.data.find((cab) => cab.id === cabinet.id)!
                    .specifications,
                ]}
                pagination={false}
              />
            ),
            rowExpandable: (cabinet) => !isEmpty(cabinet.specifications),
          }}
          pagination={{
            // onChange: (page) => setSearch({ page }),
            total: cabinets.count,
            pageSize: CABINETS_LIMIT,
            size: "small",
            showSizeChanger: false,
            current: search.pagination?.page,
          }}
        />
      </>
    );
  }

  return null;
};

export default CabinetsPage;
