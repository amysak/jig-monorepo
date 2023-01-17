import { Form, Input, Row, Select, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { api } from "api/Api";
import {
  getDefaultHardwares,
  TGetDefaultHardwaresData,
} from "../../../api/hardwares";
import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
import { tableSelectStyle } from "../../../components/molecules/roomtabs/utils";
import UILayout from "../../../components/templates/uilayout";
import useFilter from "../../../hooks/useFilter";
import { ACTIVE_INACTIVE_STATUSES_OPTIONS } from "../../../utilities/constants";
import { getQueryString, shortId } from "../../../utilities/utils";
import { defaultPagination } from "../../cabinetsetup/utils";
import { PageHeader } from "./components";

function HardwareFilterRow() {
  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="name">
        <Input style={{ minWidth: "300px" }} placeholder="Name" />
      </Form.Item>
    </Row>
  );
}

export default function HardwareList() {
  const [form] = Form.useForm();
  const [hardwares, setHardwares] = useState<TGetDefaultHardwaresData>([[], 0]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useFilter("hardwares", {
    pageSize: 20,
    current: 1,
  });

  const getHardwaresData = async (queryFilters = filters) => {
    try {
      setLoading(true);

      const query = getQueryString(queryFilters);
      const hardwares = await getDefaultHardwares(query);

      setFilters(queryFilters);
      setHardwares(hardwares);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onValuesChange = () => {
    getHardwaresData({
      ...defaultPagination,
      ...form.getFieldsValue(),
    });
  };

  const onPaginate = (config: { pageSize: number; current: number }) => {
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    getHardwaresData(queryFilters);
  };

  React.useEffect(() => {
    getHardwaresData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "hardware_name",
      key: "hardware_name",

      render(hardware_name: { name: any }, row: { id: any }) {
        return (
          <Link to={`/default-setup/hardwares/${row.id}`}>
            {hardware_name?.name || "Mising name"}
          </Link>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

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
    <UILayout ToolbarContent={<PageHeader />}>
      <Form
        initialValues={filters}
        form={form}
        onValuesChange={onValuesChange}
        layout="inline"
        className="cabinets-filter-row"
      >
        <HardwareFilterRow />
      </Form>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={hardwares[0]}
        className="pagewrapper__maincontent nomargin"
        size="small"
        title={() => (
          <PaginateTableMetaData
            data={hardwares}
            count={100}
            filters={filters}
          />
        )}
        onChange={onPaginate}
        loading={loading}
        pagination={{
          total: hardwares[1],
          pageSize: 20,
          size: "small",
          showSizeChanger: false,
          current: filters.current,
        }}
      />
    </UILayout>
  );
}
