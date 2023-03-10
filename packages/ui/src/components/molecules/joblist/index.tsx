import { Form, Input, Row, Select, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { api } from "api/Api";
import { getJobs } from "api/jobs";

// wtf?
import { tableProps } from "../../../pages/cabinetsetup/utils";

import { NewJobPopover } from "components/popover-form";
import { JOB_STATUSES_OPTIONS } from "../../../utilities/constants";
import { getQueryString, shortId } from "../../../utilities/utils";
import UILayout from "../../templates/uilayout";
import { PageHeader } from "../../layout/pageheader";

function JobsFilterRow() {
  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="name">
        <Input style={{ minWidth: "300px" }} placeholder="Name" />
      </Form.Item>

      <Form.Item name="status">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Status">
          {JOB_STATUSES_OPTIONS.map((option) => (
            <Select.Option key={shortId()} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Row>
  );
}

const columns = [
  {
    title: "Jobs",
    dataIndex: "name",
    key: "name",
    width: 200,

    render(name, job: { id: any }) {
      return <Link to={`/jobs/${job.id}`}>{name}</Link>;
    },
  },
  {
    title: "Client Name",
    dataIndex: "client",
    key: "client",
    width: 400,

    render(client?: { name: string }) {
      return client?.name;
    },
  },
  {
    title: "Estimate Date",
    dataIndex: "estimateDate",
    key: "estimateDate",
    width: 200,

    render(date) {
      return <>{dayjs(date).format("MM-DD-YYYY")}</>;
    },
  },
  {
    title: "Proposal Date",
    dataIndex: "proposalDate",
    key: "proposalDate",
    width: 200,

    render(date) {
      return <>{dayjs(date).format("MM-DD-YYYY")}</>;
    },
  },
  {
    title: "Subdivision",
    dataIndex: "subdivision",
    key: "subdivision",
  },
  {
    title: "Lot #",
    dataIndex: "lot_number",
    key: "lot_number",
    width: 100,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 200,

    render(jobStatus) {
      return (
        <Select value={jobStatus} style={{ width: "100%" }}>
          {JOB_STATUSES_OPTIONS.map((status, key) => (
            <Select.Option key={key} value={status.value}>
              {status.label}
            </Select.Option>
          ))}
        </Select>
      );
    },
  },
];

export function JobList() {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({ limit: 20, skip: 1 });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["jobs", filters],
    () => getJobs(getQueryString(filters)),
    {
      onError: (error) => console.error(error),
    }
  );

  const onPaginate = (config) => {
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    setFilters(queryFilters);
  };

  const onValuesChange = () => {
    queryClient.invalidateQueries(["jobs", filters]);
  };

  const initialPath = {
    title: "Jobs",
    path: "/jobs",
  };

  return (
    <UILayout
      ToolbarContent={
        <PageHeader initial={initialPath} component={<NewJobPopover />} />
      }
    >
      <Form form={form} onValuesChange={onValuesChange} layout="inline">
        <JobsFilterRow />
      </Form>

      <Table
        {...tableProps}
        loading={isLoading}
        columns={columns}
        dataSource={data?.jobs}
        onChange={onPaginate}
        pagination={{
          total: data?.count,
          pageSize: filters.limit,
          size: "small",
          showSizeChanger: false,
          current: filters.skip,
        }}
        rowKey="id"
        className="clickablerows pagewrapper__maincontent nomargin"
      />
    </UILayout>
  );
}

JobList.defaultProps = {};

export default JobList;
