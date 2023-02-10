import { useSearch } from "@tanstack/react-router";
import { Table } from "antd";
import { isEmpty } from "lodash-es";
import { DEFAULT_PAGE_SIZE } from "type-defs";

import { useJobsColumns } from "features/job";
import { UILayout } from "layouts/ui";
import { useJobsPaginated } from "lib/hooks/queries";
import { jobsIndexRoute } from "./routes";

export default function JobsPage() {
  const search = useSearch({ from: jobsIndexRoute.id });

  const { data, isLoading } = useJobsPaginated(search);

  const [jobsColumns, roomColumns] = useJobsColumns();

  return (
    <UILayout borderless>
      <Table
        loading={isLoading}
        columns={jobsColumns}
        dataSource={data?.data}
        rowKey="id"
        expandable={{
          expandedRowRender: (job) => (
            <Table
              rowKey="id"
              dataSource={job.rooms}
              columns={roomColumns}
              pagination={false}
            />
          ),
          rowExpandable: (job) => !isEmpty(job.rooms),
        }}
        pagination={{
          total: data?.count,
          pageSize: DEFAULT_PAGE_SIZE,
          size: "small",
          showSizeChanger: false,
          current: search.pagination?.page,
        }}
      />
    </UILayout>
  );
}
