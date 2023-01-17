import { Form, Input, Row, Select, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { api } from "api/Api";
import {
  getDefaultMarkups,
  TGetDefaultMarkupsData,
} from "../../../api/markups";
import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
import { tableSelectStyle } from "../../../components/molecules/roomtabs/utils";
import UILayout from "../../../components/templates/uilayout";
import useFilter from "../../../hooks/useFilter";
import { ACTIVE_INACTIVE_STATUSES_OPTIONS } from "../../../utilities/constants";
import {
  defaultPagination,
  getQueryString,
  shortId,
  toFixed,
} from "../../../utilities/utils";
import { PageHeader } from "./components";

function MarkupFilterRow() {
  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="name">
        <Input style={{ minWidth: "300px" }} placeholder="Name" />
      </Form.Item>
    </Row>
  );
}

export default function MarkupList() {
  const [form] = Form.useForm();
  const [markups, setMarkups] = useState<TGetDefaultMarkupsData>([[], 0]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useFilter("markups", {
    pageSize: 20,
    current: 1,
  });

  const getMarkupsData = async (queryFilters = filters) => {
    try {
      setLoading(true);

      const query = getQueryString(queryFilters);
      const markups = await getDefaultMarkups(query);

      setFilters(queryFilters);
      setMarkups(markups);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onValuesChange = () => {
    getMarkupsData({
      ...defaultPagination,
      ...form.getFieldsValue(),
    });
  };

  const onPaginate = (config: { pageSize: number; current: number }) => {
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    getMarkupsData(queryFilters);
  };

  React.useEffect(() => {
    getMarkupsData();
  }, []);

  const percentRender = (value: number) =>
    value ? `${toFixed(value)}%` : null;

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",

      render(name, row: { id: any }) {
        return <Link to={`/default-setup/markups/${row.id}`}>{name}</Link>;
      },
    },
    {
      title: "Sales Commission",
      key: "sales_commission",
      dataIndex: "sales_commission",
      render: percentRender,
    },
    {
      title: "Design Engineer Fee",
      key: "design_engineer_fee",
      dataIndex: "design_engineer_fee",
      render: percentRender,
    },
    {
      title: "Overhead Markup",
      key: "overhead_markup",
      dataIndex: "overhead_markup",
      render: percentRender,
    },
    {
      title: "Profit Markup",
      key: "profit_markup",
      dataIndex: "profit_markup",
      render: percentRender,
    },
    {
      title: "Additional Markup",
      key: "additional",
      dataIndex: "additional",
      render: percentRender,
    },
    {
      title: "Sales Tax Rate",
      key: "sales_tax_rate",
      dataIndex: "sales_tax_rate",
      render: percentRender,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",

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
    <UILayout ToolbarContent={<PageHeader label="Markups" />}>
      <Form
        initialValues={filters}
        form={form}
        onValuesChange={onValuesChange}
        layout="inline"
        className="cabinets-filter-row"
      >
        <MarkupFilterRow />
      </Form>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={markups[0]}
        onChange={onPaginate}
        loading={loading}
        title={() => (
          <PaginateTableMetaData data={markups} count={100} filters={filters} />
        )}
        className="pagewrapper__maincontent nomargin"
        size="small"
        pagination={{
          total: markups[1],
          pageSize: 20,
          size: "small",
          showSizeChanger: false,
          current: filters.current,
        }}
      />
    </UILayout>
  );
}
