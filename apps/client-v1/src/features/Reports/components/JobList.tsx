import { useCallback, useEffect, useState } from "react";

import { api } from "api/Api";
import { getJobs, TGetJobsData } from "api/jobs";
import { Form, Table, useForm } from "@jigbid/ui";
import { Job } from "entities";
import { tableProps } from "pages/cabinetsetup/utils";
import { getQueryString } from "utilities/utils";

import { columns } from "../utils";
import { JobsFilterRow } from "./JobsFilterRow";

import "./JobList.styles.scss";

interface JobListProps {
  onSelect: (data: Job) => void;
  onOpenChange: (bool: boolean) => void;
}

export function JobList({ onSelect, onOpenChange }: JobListProps) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<TGetJobsData>({ jobs: [], count: 0 });
  const [filters, setFilters] = useState({ limit: 10, current: 1 });

  const getJobsData = useCallback(
    async (queryFilters = filters) => {
      try {
        setLoading(true);

        const query = getQueryString(queryFilters);

        const rooms = await getJobs(query.substring(1));

        setFilters(queryFilters);
        setJobs(rooms);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const onPaginate = useCallback(
    (config) => {
      const queryFilters = { ...filters, ...api.paginateObj(config) };

      getJobsData(queryFilters);
    },
    [filters, getJobsData]
  );

  const onValuesChange = useCallback(() => {
    const _filters = { ...filters, current: 1, skip: 0 };
    setFilters((s) => ({ ...s, ..._filters }));
    getJobsData({
      ..._filters,
      ...form.getFieldsValue(),
    });
  }, [filters, form, getJobsData]);

  useEffect(() => {
    getJobsData();
  }, []);

  return (
    <div className="job-list">
      <Form form={form} onValuesChange={onValuesChange} layout="inline">
        <JobsFilterRow />
      </Form>

      <Table
        {...tableProps}
        loading={loading}
        columns={columns}
        dataSource={jobs[0]}
        onChange={onPaginate}
        pagination={{
          total: jobs[1],
          pageSize: filters.limit,
          size: "small",
          showSizeChanger: false,
          current: filters.current,
        }}
        rowKey="id"
        className="clickablerows pagewrapper__maincontent nomargin"
        onRow={(record, _index) => ({
          onClick: (_e) => {
            onSelect(record as Job);
            onOpenChange(false);
          },
        })}
      />
    </div>
  );
}
