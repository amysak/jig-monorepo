import { Form, Input, Row, Select, Table } from "antd";
import debounce from "lodash/debounce";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { api } from "api/Api";
import {
  getDefaultMaterials,
  TGetDefaultMaterialsData,
  updateMaterial,
} from "../../../api/materials";
import PaginateTableMetaData from "../../../components/molecules/paginate-table-header";
import { tableSelectStyle } from "../../../components/molecules/roomtabs/utils";
import UILayout from "../../../components/templates/uilayout";
import useFilter from "../../../hooks/useFilter";
import { ACTIVE_INACTIVE_STATUSES_OPTIONS } from "../../../utilities/constants";
import { getQueryString, shortId } from "../../../utilities/utils";
import { defaultPagination } from "../../cabinetsetup/utils";
import { PageHeader } from "./components";

function MaterialFilterRow() {
  return (
    <Row className="cabinets-filter-row">
      <Form.Item name="name">
        <Input style={{ minWidth: "300px" }} placeholder="Name" />
      </Form.Item>
    </Row>
  );
}

export default function MaterialList() {
  const [form] = Form.useForm();
  const [materials, setMaterials] = useState<TGetDefaultMaterialsData>([[], 0]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useFilter("materials-defailt", {
    pageSize: 20,
    current: 1,
  });

  const getMaterialsData = async (queryFilters = filters) => {
    try {
      setLoading(true);

      const query = getQueryString(queryFilters);
      const materials = await getDefaultMaterials(query);

      setFilters(queryFilters);
      setMaterials(materials);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onValuesChange = () => {
    getMaterialsData({
      ...defaultPagination,
      ...form.getFieldsValue(),
    });
  };

  const onPaginate = (config: { pageSize: number; current: number }) => {
    const queryFilters = { ...filters, ...api.paginateObj(config) };

    getMaterialsData(queryFilters);
  };

  const onTableValuesChange = debounce(async (value) => {
    try {
      const [id, payload] = Object.entries(value)[0];

      await updateMaterial(id, payload);
    } catch (error) {
      // @ts-expect-error TS(2552): Cannot find name 'message'. Did you mean 'onmessag... Remove this comment to see the full error message
      // eslint-disable-next-line no-undef
      message.error("Failed to update!");
    }
  }, 1000);

  React.useEffect(() => {
    getMaterialsData();
  }, []);

  const cols = [
    {
      title: "Name",
      dataIndex: "material_name",
      key: "material_name",

      render(name: { name: any }, row: { id: any }) {
        return (
          <Link to={`/default-setup/materials/${row.id}`}>
            {name?.name || "Missing name"}
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

      render(value: string, row: { id: string | number }) {
        return (
          <Form.Item
            initialValue={value?.toLowerCase()}
            name={[row.id, "status"]}
          >
            <Select style={tableSelectStyle}>
              {ACTIVE_INACTIVE_STATUSES_OPTIONS.map((status) => (
                <Select.Option key={shortId()} value={status.value}>
                  {status.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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
        <MaterialFilterRow />
      </Form>

      <Form onValuesChange={onTableValuesChange}>
        <Table
          dataSource={materials[0]}
          columns={cols}
          rowKey="id"
          onChange={onPaginate}
          loading={loading}
          title={() => (
            <PaginateTableMetaData
              data={materials}
              count={100}
              filters={filters}
            />
          )}
          className="pagewrapper__maincontent nomargin"
          size="small"
          pagination={{
            total: materials[1],
            pageSize: 20,
            size: "small",
            showSizeChanger: false,
            current: filters.current,
          }}
        />
      </Form>
    </UILayout>
  );
}
