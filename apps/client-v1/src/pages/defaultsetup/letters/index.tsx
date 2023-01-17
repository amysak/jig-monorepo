import { Form, Input, Row, Select, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { api } from "api/Api";
import {
  getDefaultLetters,
  TGetDefaultLettersData,
} from "../../../api/letters";
import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
import UILayout from "../../../components/templates/uilayout";
import useFilter from "../../../hooks/useFilter";
import { ACTIVE_INACTIVE_STATUSES_OPTIONS } from "../../../utilities/constants";
import { getQueryString, shortId } from "../../../utilities/utils";
import { defaultPagination } from "../../cabinetsetup/utils";
import { PageHeader } from "./components";

function LetterFilterRow() {
  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="name">
        <Input style={{ minWidth: "300px" }} placeholder="Name" />
      </Form.Item>
    </Row>
  );
}

export default function LetterList() {
  const [form] = Form.useForm();
  const [letters, setLetters] = useState<TGetDefaultLettersData>([[], 0]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useFilter("letters", {
    pageSize: 20,
    current: 1,
  });

  const getLettersData = async (queryFilters = filters) => {
    try {
      setLoading(true);

      const query = getQueryString(queryFilters);
      const letters = await getDefaultLetters(query);

      setFilters(queryFilters);
      setLetters(letters);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onValuesChange = () => {
    getLettersData({
      ...defaultPagination,
      ...form.getFieldsValue(),
    });
  };

  const onPaginate = (config: { pageSize: number; current: number }) => {
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    getLettersData(queryFilters);
  };

  React.useEffect(() => {
    getLettersData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 400,

      render(name, row: { id: any }) {
        return <Link to={`/default-setup/letters/${row.id}`}>{name}</Link>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,

      render(currentStatus) {
        return (
          // @ts-expect-error TS(2322): Type '"end"' is not assignable to type '"top" | "m... Remove this comment to see the full error message
          <Row align="end">
            <Select value={currentStatus} style={{ width: "200px" }}>
              {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
                <Select.Option key={shortId()} value={status.value}>
                  {status.label}
                </Select.Option>
              ))}
            </Select>
          </Row>
        );
      },
    },
  ];

  return (
    <UILayout ToolbarContent={<PageHeader />}>
      <Form
        initialValues={filters}
        form={form}
        onValuesChange={onValuesChange}
        layout="inline"
        className="cabinets-filter-row"
      >
        <LetterFilterRow />
      </Form>

      <Table
        columns={columns}
        dataSource={letters[0]}
        rowKey="id"
        className="pagewrapper__maincontent nomargin"
        size="small"
        title={() => (
          <PaginateTableMetaData data={letters} count={100} filters={filters} />
        )}
        onChange={onPaginate}
        loading={loading}
        pagination={{
          total: letters[1],
          pageSize: 20,
          size: "small",
          showSizeChanger: false,
          current: filters.current,
        }}
      />
    </UILayout>
  );
}
