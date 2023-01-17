import { Form, Input, message, Row, Select, Table } from "antd";
import React, { useState } from "react";

import { api } from "api/Api";
import { Link } from "react-router-dom";
import {
  getFinishes,
  TGetSetupFinishesData,
  updateFinish,
} from "../../../api/finishes";
import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
import { tableSelectStyle } from "../../../components/molecules/roomtabs/utils";
import UILayout from "../../../components/templates/uilayout";
import useFilter from "../../../hooks/useFilter";
import {
  ACTIVE_INACTIVE_STATUSES_OPTIONS,
  FINISH_CATEGORIES_OPTIONS,
  FINISH_CLASSIFICATIONS_OPTIONS,
} from "../../../utilities/constants";
import { capitalize, getQueryString, shortId } from "../../../utilities/utils";
import { defaultPagination, tableProps } from "../utils";
import { PageHeader } from "./components";

function FinishFilterRow() {
  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="category">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Category">
          {FINISH_CATEGORIES_OPTIONS.map((option) => (
            <Select.Option value={option.value} key={shortId()}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="classification">
        <Select
          style={{ minWidth: "200px" }}
          placeholder="Classification"
          allowClear
        >
          {FINISH_CLASSIFICATIONS_OPTIONS.map((option) => (
            <Select.Option value={option.value} key={shortId()}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="name">
        <Input style={{ minWidth: "300px" }} placeholder="Name" />
      </Form.Item>

      <Form.Item name="status">
        <Select style={{ minWidth: "200px" }} allowClear placeholder="Status">
          {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((option) => (
            <Select.Option key={shortId()} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Row>
  );
}

export default function FinishesList() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [finishes, setFinishes] = useState<TGetSetupFinishesData>([[], 0]);
  const [filters, setFilters] = useFilter("finishes", {
    pageSize: 20,
    current: 1,
  });

  const getFinishesData = async (queryFilters = filters) => {
    try {
      setLoading(true);

      const query = getQueryString(queryFilters);
      const finishes = await getFinishes(query);

      setFilters(queryFilters);
      setFinishes(finishes);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const onStatusChange = async (status: string, row: { id: any }) => {
    try {
      setLoading(true);
      const payload = { status };

      await updateFinish(row.id, payload);

      message.success("Status updated!");

      const updatedFinishes = finishes[0].map((finish: { id: any }) => {
        if (finish.id === row.id) {
          return { ...finish, ...payload };
        }

        return finish;
      });

      setFinishes([updatedFinishes, finishes[1]] as TGetSetupFinishesData);
    } catch (error) {
      message.error("Failed to update status!");
    } finally {
      setLoading(false);
    }
  };

  const onPaginate = (config: { pageSize: number; current: number }) => {
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    getFinishesData(queryFilters);
  };

  const onValuesChange = () => {
    getFinishesData({
      ...defaultPagination,
      ...form.getFieldsValue(),
    });
  };

  React.useEffect(() => {
    getFinishesData();
  }, []);

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",

      render(name: string, row: { id: any }) {
        return (
          <Link to={`/cabinet-setup/finishes/${row.id}`}>
            {name?.trim() || "Unnamed"}
          </Link>
        );
      },
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",

      render(category: string) {
        return capitalize(category);
      },
    },
    {
      title: "Classification",
      key: "classification",
      dataIndex: "classification",

      render(classification: string) {
        return capitalize(classification);
      },
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",

      render(currentStatus: string, row) {
        return (
          <Select
            onChange={(value) => onStatusChange(value, row)}
            value={currentStatus?.toLowerCase()}
            style={tableSelectStyle}
          >
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
    <UILayout ToolbarContent={<PageHeader label="Finishes" />}>
      <Form
        form={form}
        initialValues={filters}
        onValuesChange={onValuesChange}
        layout="inline"
      >
        <FinishFilterRow />
      </Form>
      {/* @ts-ignore */}
      <Table
        columns={columns}
        dataSource={finishes[0]}
        loading={loading}
        {...tableProps}
        title={() => (
          <PaginateTableMetaData
            data={finishes}
            count={100}
            filters={filters}
          />
        )}
        onChange={onPaginate}
        pagination={{
          total: finishes[1],
          pageSize: filters.pageSize,
          size: "small",
          showSizeChanger: false,
          current: filters.current,
        }}
        className="pagewrapper__maincontent nomargin"
      />
    </UILayout>
  );
}
