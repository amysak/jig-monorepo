import { Form, Input, Row, Select, Table } from "antd";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { api } from "api/Api";
import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
import { tableSelectStyle } from "../../../components/molecules/roomtabs/utils";
import UILayout from "../../../components/templates/uilayout";
import {
  ACTIVE_INACTIVE_STATUSES_OPTIONS,
  TERM_TYPES_OPTIONS,
} from "../../../utilities/constants";
import { getQueryString, shortId } from "../../../utilities/utils";
import { PageHeader } from "./components";
import { getDefaultTerms } from "api/terms";

function TermsFilterRow() {
  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="name">
        <Input style={{ minWidth: "300px" }} placeholder="Name" />
      </Form.Item>

      <Form.Item name="type">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Type">
          {TERM_TYPES_OPTIONS.map((option) => (
            <Select.Option key={shortId()} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Row>
  );
}
export default function TermsList() {
  // pls can we move LITERALLY THE SAME into a single component / hook :)
  const [form] = Form.useForm();

  const [filters, setFilters] = useState({ limit: 20, skip: 1 });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["terms", filters],
    () => getDefaultTerms(getQueryString(filters)),
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

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",

      render(name, row: { id: any }) {
        return <Link to={`/default-setup/terms/${row.id}`}>{name}</Link>;
      },
      width: 300,
    },
    {
      title: "Term Type",
      key: "term_type",
      dataIndex: "term_type",
      width: 150,
    },
    {
      title: "Purpose",
      key: "purpose_terms_and_conditions",
      dataIndex: "purpose_terms_and_conditions",
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 200,

      render(currentStatus) {
        return (
          <Select value={currentStatus} style={tableSelectStyle}>
            {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
              <Select.Option key={shortId()} value={status.value}>
                {status.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  return (
    <UILayout ToolbarContent={<PageHeader label="Terms" />}>
      <Form
        initialValues={filters}
        form={form}
        onValuesChange={onValuesChange}
        layout="inline"
        className="cabinets-filter-row"
      >
        <TermsFilterRow />

        <Table
          rowKey="id"
          loading={isLoading}
          columns={columns}
          dataSource={data?.terms}
          className="pagewrapper__maincontent nomargin"
          size="small"
          title={() => (
            <PaginateTableMetaData
              data={data?.terms}
              count={data?.count}
              filters={filters}
            />
          )}
          onChange={onPaginate}
          pagination={{
            total: data?.count,
            pageSize: filters.limit,
            size: "small",
            showSizeChanger: false,
            current: filters.skip,
          }}
        />
      </Form>
    </UILayout>
  );
}
